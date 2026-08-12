// src/blockchain/MerchantBlockchain.ts

import type { Address, WalletClient } from "viem";

import { KernelService, type KernelContext } from "@/services/KernelService";

import {
  MerchantContract,
  type RegisterMerchantResult,
} from "@/contracts/MerchantContract";

import { BillingOperatorService } from "@/services/BillingOperatorService";

export interface RegisterMerchantBlockchainRequest {
  walletClient: WalletClient;

  ownerWallet: Address;

  payoutWallet: Address;

  billingOperator: Address;

  name: string;

  metadataURI?: string;
}

export interface RegisterMerchantBlockchainResult {
  merchantId: bigint;

  smartAccount: Address;

  ownerWallet: Address;

  payoutWallet: Address;

  billingOperator: Address;

  transactionHash: `0x${string}`;

  receipt:
    | Awaited<
        ReturnType<KernelContext["client"]["waitForUserOperationReceipt"]>
      >
    | RegisterMerchantResult["receipt"];

  approvalReceipt: Awaited<
    ReturnType<BillingOperatorService["approveBillingOperator"]>
  >;

  kernel: KernelContext;
}

export class MerchantBlockchain {
  constructor(
    private readonly kernelService: KernelService,

    private readonly merchantContract: MerchantContract,

    private readonly billingOperatorService: BillingOperatorService,
  ) {}

  ////////////////////////////////////////////////////////////
  // Register Merchant
  ////////////////////////////////////////////////////////////

  async registerMerchant(
    request: RegisterMerchantBlockchainRequest,
  ): Promise<RegisterMerchantBlockchainResult> {
    /*
        --------------------------------------------------------
        Step 1
        Create Merchant Smart Account
        --------------------------------------------------------
        */

    const kernel = await this.kernelService.createMerchantKernel(
      request.walletClient,
    );

    /*
        --------------------------------------------------------
        Step 2
        Register Merchant On-chain
        --------------------------------------------------------
        */

    const registration = await this.merchantContract.register({
      walletClient: request.walletClient,

      ownerWallet: request.ownerWallet,

      merchantSmartAccount: kernel.address,

      payoutWallet: request.payoutWallet,

      name: request.name,

      metadataURI: request.metadataURI,
    });

    /*
        --------------------------------------------------------
        Step 3
        Approve Billing Operator
        --------------------------------------------------------
        */

    const approval = await this.billingOperatorService.approveBillingOperator({
      kernel: kernel.account,

      kernelClient: kernel.client,

      merchantId: registration.merchantId,

      operator: request.billingOperator,
    });

    /*
        --------------------------------------------------------
        Step 4
        Return Blockchain Result
        --------------------------------------------------------
        */

    return {
      merchantId: registration.merchantId,

      smartAccount: kernel.address,

      ownerWallet: request.ownerWallet,

      payoutWallet: request.payoutWallet,

      billingOperator: request.billingOperator,

      transactionHash: registration.transactionHash,

      receipt: registration.receipt,

      approvalReceipt: approval,

      kernel,
    };
  }

  ////////////////////////////////////////////////////////////
  // Merchant Exists
  ////////////////////////////////////////////////////////////

  async merchantExists(smartAccount: Address) {
    return this.merchantContract.exists(smartAccount);
  }

  ////////////////////////////////////////////////////////////
  // Merchant Id
  ////////////////////////////////////////////////////////////

  async merchantId(smartAccount: Address) {
    return this.merchantContract.merchantId(smartAccount);
  }

  ////////////////////////////////////////////////////////////
  // Read Merchant
  ////////////////////////////////////////////////////////////

  async getMerchant(merchantId: bigint) {
    return this.merchantContract.getMerchant(merchantId);
  }
}
