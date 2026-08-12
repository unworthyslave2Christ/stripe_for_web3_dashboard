// src/blockchain/BillingOperatorService.ts

import {
    encodeFunctionData,
    type Address,
} from "viem";

import type {
    KernelAccountClient,
    CreateKernelAccountReturnType,
} from "@zerodev/sdk";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

export type KernelAccount =
    CreateKernelAccountReturnType<"0.7">;

export interface BillingOperatorServiceConfig {

    contractAddress: Address;

}

export interface ApproveBillingOperatorRequest {

    kernel: KernelAccount;

    kernelClient: KernelAccountClient;

    merchantId: bigint;

    operator: Address;

}

export interface ApproveBillingOperatorResult {

    userOperationHash: `0x${string}`;

    receipt: Awaited<
        ReturnType<
            KernelAccountClient["waitForUserOperationReceipt"]
        >
    >;

}

export class BillingOperatorService {

    constructor(
        private readonly config: BillingOperatorServiceConfig,
    ) {}

    ////////////////////////////////////////////////////////////
    // Approve Billing Operator
    ////////////////////////////////////////////////////////////

    async approveBillingOperator(
        request: ApproveBillingOperatorRequest,
    ): Promise<ApproveBillingOperatorResult> {

        const data =
            encodeFunctionData({

                abi: protocolAbi,

                functionName:
                    "approveBillingOperator",

                args: [
                    request.merchantId,
                    request.operator,
                ],

            });

        const callData =
            await request.kernel.encodeCalls([
                {
                    to:
                        this.config.contractAddress,

                    value:
                        0n,

                    data,
                },
            ]);

        const userOperationHash =
            await request.kernelClient.sendUserOperation({
                callData,
            });

        const receipt =
            await request.kernelClient.waitForUserOperationReceipt({
                hash:
                    userOperationHash,
            });

        return {

            userOperationHash,

            receipt,

        };

    }

}