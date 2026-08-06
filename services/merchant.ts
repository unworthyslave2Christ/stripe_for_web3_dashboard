import {
  getContract,
  type Address,
  type WalletClient,
  type PublicClient,
  http,
} from "viem";

import protocolAbi from "@/abi/Web3BillingProtocol.json";
import { createKernelAccount, createKernelAccountClient } from "@zerodev/sdk";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { createMerchantKernel, paymasterClient } from "./kernel.client";
import { arbitrumSepolia } from "viem/chains";
import { getEntryPoint, KERNEL_V3_3 } from "@zerodev/sdk/constants";
import { approveBillingOperator } from "./billingProtocol";

/* -------------------------------------------------------------------------- */
/* Interfaces                                                                   */
/* -------------------------------------------------------------------------- */

interface RegisterMerchantParams {
  walletClient: WalletClient;

  publicClient: PublicClient;

  contractAddress: Address;

  ownerWallet: Address;

  merchantSmartAccount: Address;

  payoutWallet: Address;

  name: string;

  metadataURI?: string;

  billingOperator?: Address;
}

/* -------------------------------------------------------------------------- */
/* Register Merchant                                                           */
/* -------------------------------------------------------------------------- */

export async function registerMerchant({
  walletClient,

  publicClient,

  contractAddress,

  ownerWallet,

  merchantSmartAccount,

  payoutWallet,

  name,

  metadataURI = "",

  billingOperator,
}: RegisterMerchantParams) {
  /*
    --------------------------------------------------------------------------
    Wallet Account
    --------------------------------------------------------------------------
    */

  const [account] = await walletClient.getAddresses();

  /*
    --------------------------------------------------------------------------
    Estimate Gas
    --------------------------------------------------------------------------
    */

  const gas = await publicClient.estimateContractGas({
    account,

    address: contractAddress,

    abi: protocolAbi,

    functionName: "registerMerchant",

    args: [merchantSmartAccount, payoutWallet, name, metadataURI],
  });

  /*
    --------------------------------------------------------------------------
    Submit Transaction
    --------------------------------------------------------------------------
    */

  const hash = await walletClient.writeContract({
    account,

    chain: walletClient.chain,

    address: contractAddress,

    abi: protocolAbi,

    functionName: "registerMerchant",

    args: [merchantSmartAccount, payoutWallet, name, metadataURI],

    gas,
  });

  /*
    --------------------------------------------------------------------------
    Wait For Confirmation
    --------------------------------------------------------------------------
    */

  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });

  if (receipt.status !== "success") {
    throw new Error("Merchant registration transaction failed.");
  }

  /*
    --------------------------------------------------------------------------
    Retrieve MerchantCreated Event
    --------------------------------------------------------------------------
    */

  const events = await publicClient.getContractEvents({
    address: contractAddress,

    abi: protocolAbi,

    eventName: "MerchantCreated",

    fromBlock: receipt.blockNumber,

    toBlock: receipt.blockNumber,
  });

  if (events.length !== 1) {
    throw new Error("MerchantCreated event not found.");
  }

  const merchantId = (events[0] as any).args.merchantId as bigint;

  const response = await fetch("/api/merchant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      merchantId: Number(merchantId),
      smartAccount: merchantSmartAccount,
      ownerWallet: ownerWallet,
      payoutWallet,
      name,
      metadataURI,
      billingOperator: billingOperator,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? "Unable to mirror merchant.");
  }

  /*
    --------------------------------------------------------------------------
    Return
    --------------------------------------------------------------------------
    */

  return {
    merchantId,

    hash,

    receipt,
  };
}

/* -------------------------------------------------------------------------- */
/* Merchant Exists                                                             */
/* -------------------------------------------------------------------------- */

interface ExistsParams {
  publicClient: PublicClient;

  contractAddress: Address;

  smartAccount: Address;
}

export async function merchantExists({
  publicClient,

  contractAddress,

  smartAccount,
}: ExistsParams): Promise<boolean> {
  return (await publicClient.readContract({
    address: contractAddress,

    abi: protocolAbi,

    functionName: "merchantExists",

    args: [smartAccount],
  })) as boolean;
}

/* -------------------------------------------------------------------------- */
/* Merchant ID By Smart Account                                                */
/* -------------------------------------------------------------------------- */

interface MerchantLookupParams {
  publicClient: PublicClient;

  contractAddress: Address;

  smartAccount: Address;
}

export async function getMerchantIdBySmartAccount({
  publicClient,

  contractAddress,

  smartAccount,
}: MerchantLookupParams): Promise<bigint> {
  return (await publicClient.readContract({
    address: contractAddress,

    abi: protocolAbi,

    functionName: "merchantBySmartAccount",

    args: [smartAccount],
  })) as bigint;
}

/* -------------------------------------------------------------------------- */
/* Get Merchant                                                                */
/* -------------------------------------------------------------------------- */

interface GetMerchantParams {
  publicClient: PublicClient;

  contractAddress: Address;

  merchantId: bigint;
}

export async function getMerchant({
  publicClient,

  contractAddress,

  merchantId,
}: GetMerchantParams) {
  const protocol = getContract({
    address: contractAddress,

    abi: protocolAbi,

    client: {
      public: publicClient,
    },
  });

  return await protocol.read.getMerchant([merchantId]);
}

export async function getMerchantById(merchantId: bigint) {
  const response = await fetch(
    `/api/merchant?merchantId=${Number(merchantId)}`,
    {
      cache: "no-store",
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error ?? "Unable to load merchant.");
  }

  return json;
}

export async function getMerchantByOwnerWallet(ownerWallet: Address) {
  const response = await fetch(
    `/api/merchant?ownerWallet=${ownerWallet}`,

    {
      cache: "no-store",
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error ?? "Unable to load merchant.");
  }

  return json;
}

// TODO: Persist merchant across merchant registration and bill planning and also for customers
// TODO: Graceful route-level error handling with error.tsx, file-leve error handling component level error  handling
// TODO: Route restriction to unauthorized and unauthenticated accounts, Rate limiting, the 5-check fullstack security audit list
// TODO: Inpecting and removal of sensitive information from client bundle
// TODO: Graciously enabling rainbow kit across all instances of localhost(app) on all profiles
// Graciously incorporating the best practices in next js fundamentals vercel course

export async function getMerchantKernel(
  walletClient: WalletClient,
  publicClient: PublicClient,
) {
  const [ownerWallet] = await walletClient.getAddresses();

  const merchant = await getMerchantByOwnerWallet(ownerWallet);

  const kernel = await createMerchantKernel({
    ownerWalletClient: walletClient,
    publicClient,
  });

  if (kernel.address.toLowerCase() !== merchant.smart_account.toLowerCase()) {
    throw new Error("Connected wallet does not own this merchant.");
  }

  return {
    merchant,
    kernel,
  };
}
