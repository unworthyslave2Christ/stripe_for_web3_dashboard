// services/plans.ts

import {
  encodeFunctionData,
  type Address,
  type PublicClient,
  type WalletClient,
} from "viem";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

import { getMerchantKernel } from "@/services/merchant";
import { createKernelAccountClient } from "@zerodev/sdk";

import { arbitrumSepolia } from "viem/chains";

export interface CreatePlanParams {
  walletClient: WalletClient;

  publicClient: PublicClient;

  contractAddress: Address;

  name: string;

  paymentToken: Address;

  amount: bigint;

  billingInterval: bigint;

  trialPeriod?: bigint;

  maxSubscribers?: number | null;

  metadataURI?: string;

  billingPeriodNamed?: string;

  trialPeriodNamed?: string;
}

export async function createPlan({
  walletClient,

  publicClient,

  contractAddress,

  name,

  paymentToken,

  amount,

  billingInterval,

  trialPeriod = 0n,

  maxSubscribers = null,

  metadataURI = "",

  billingPeriodNamed,

  trialPeriodNamed
}: CreatePlanParams) {

   
   
   /*
   --------------------------------------------------------------------------
   Rebuild Merchant Kernel
   --------------------------------------------------------------------------
   */
  
  const {merchant, kernel} = await getMerchantKernel( walletClient, publicClient);

  console.log("Kernel client:", kernel.client);
console.log("Bundler RPC:", process.env.NEXT_BUNDLER_RPC);
console.log("Public RPC:", process.env.RPC_URL);

//   const [ownerWallet] = await walletClient.getAddresses();

  /*
    --------------------------------------------------------------------------
    Safety Check
    --------------------------------------------------------------------------
    */

  if (kernel.address.toLowerCase() !== merchant.smart_account.toLowerCase()) {
    throw new Error("Connected wallet is not the merchant owner.");
  }

  /*
    --------------------------------------------------------------------------
    Encode Contract Call
    --------------------------------------------------------------------------
    */

    console.log({
        contractAddress,
        paymentToken,
        merchant,
        kernel,
        account: kernel.account,
    });


  const callData = await kernel.account.encodeCalls([
    {
      to: contractAddress,

      value: 0n,

      data: encodeFunctionData({
        abi: protocolAbi,

        functionName: "createPlan",

        args: [
          BigInt(merchant.merchant_id),

          name,

          paymentToken,

          amount,

          billingInterval,
        ],
      }),
    },
  ]);


  /*
    --------------------------------------------------------------------------
    Submit UserOperation
    --------------------------------------------------------------------------
    */

  const userOpHash = await kernel.client!.sendUserOperation({
    callData,
  });

  /*
    --------------------------------------------------------------------------
    Wait For Receipt
    --------------------------------------------------------------------------
    */

  const userOpReceipt = await kernel.client!.waitForUserOperationReceipt({
    hash: userOpHash,
  });

  const receipt = userOpReceipt.receipt;

  /*
    --------------------------------------------------------------------------
    Retrieve PlanCreated Event
    --------------------------------------------------------------------------
    */

  const events = await publicClient.getContractEvents({
    address: contractAddress,

    abi: protocolAbi,

    eventName: "PlanCreated",

    fromBlock: receipt.blockNumber,

    toBlock: receipt.blockNumber,
  });

  if (events.length !== 1) {
    throw new Error("PlanCreated event not found.");
  }

  const planId = (events[0] as any).args.planId as bigint;

  /*
    --------------------------------------------------------------------------
    Mirror Into Supabase
    --------------------------------------------------------------------------
    */

  const response = await fetch(
    "/api/plans",

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        planId: Number(planId),

        merchantId: merchant.merchant_id,

        paymentToken,

        amount: amount.toString(),

        billingIntervalSeconds: Number(billingInterval),

        trialPeriod: Number(trialPeriod),

        maxSubscribers,

        metadataURI,

        name,

        billingPeriodNamed,

        trialPeriodNamed
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.error ?? "Unable to mirror billing plan.");
  }

  /*
    --------------------------------------------------------------------------
    Return
    --------------------------------------------------------------------------
    */

  return {
    merchant,

    kernel,

    planId,

    userOpHash,

    receipt,
  };
}
