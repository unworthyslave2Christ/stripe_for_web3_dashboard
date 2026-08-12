import {
  getContract,
  type Address,
  type WalletClient,
  type PublicClient,
} from "viem";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

export interface MerchantContractConfig {
  contractAddress: Address;

  publicClient: PublicClient;
}

export interface RegisterMerchantRequest {
  walletClient: WalletClient;

  ownerWallet: Address;

  merchantSmartAccount: Address;

  payoutWallet: Address;

  name: string;

  metadataURI?: string;
}

export interface RegisterMerchantResult {
  merchantId: bigint;

  transactionHash: `0x${string}`;

  receipt: Awaited<ReturnType<PublicClient["waitForTransactionReceipt"]>>;
}

export class MerchantContract {
  constructor(private readonly config: MerchantContractConfig) {}

  ////////////////////////////////////////////////////////////
  // Register Merchant
  ////////////////////////////////////////////////////////////

  async register(
    request: RegisterMerchantRequest,
  ): Promise<RegisterMerchantResult> {
    const gas = await this.config.publicClient.estimateContractGas({
      account: request.ownerWallet,

      address: this.config.contractAddress,

      abi: protocolAbi,

      functionName: "registerMerchant",

      args: [
        request.merchantSmartAccount,

        request.payoutWallet,

        request.name,

        request.metadataURI ?? "",
      ],
    });

    const transactionHash = await request.walletClient.writeContract({
      account: request.ownerWallet,

      chain: request.walletClient.chain,

      address: this.config.contractAddress,

      abi: protocolAbi,

      functionName: "registerMerchant",

      args: [
        request.merchantSmartAccount,

        request.payoutWallet,

        request.name,

        request.metadataURI ?? "",
      ],

      gas,
    });

    const receipt = await this.config.publicClient.waitForTransactionReceipt({
      hash: transactionHash,
    });

    if (receipt.status !== "success") {
      throw new Error("Merchant registration failed.");
    }

    const events = await this.config.publicClient.getContractEvents({
      address: this.config.contractAddress,

      abi: protocolAbi,

      eventName: "MerchantCreated",

      fromBlock: receipt.blockNumber,

      toBlock: receipt.blockNumber,
    });

    if (events.length !== 1) {
      throw new Error("MerchantCreated event not emitted.");
    }

    const merchantId = (events[0] as any).args.merchantId as bigint;

    return {
      merchantId,

      transactionHash,

      receipt,
    };
  }

  ////////////////////////////////////////////////////////////
  // Exists
  ////////////////////////////////////////////////////////////

  async exists(smartAccount: Address): Promise<boolean> {
    return this.config.publicClient.readContract({
      address: this.config.contractAddress,

      abi: protocolAbi,

      functionName: "merchantExists",

      args: [smartAccount],
    }) as Promise<boolean>;
  }

  ////////////////////////////////////////////////////////////
  // Merchant Id
  ////////////////////////////////////////////////////////////

  async merchantId(smartAccount: Address): Promise<bigint> {
    return this.config.publicClient.readContract({
      address: this.config.contractAddress,

      abi: protocolAbi,

      functionName: "merchantBySmartAccount",

      args: [smartAccount],
    }) as Promise<bigint>;
  }

  ////////////////////////////////////////////////////////////
  // Read Merchant
  ////////////////////////////////////////////////////////////

  async getMerchant(merchantId: bigint) {
    const contract = getContract({
      address: this.config.contractAddress,

      abi: protocolAbi,

      client: {
        public: this.config.publicClient,
      },
    });

    return contract.read.getMerchant([merchantId]);
  }
}
