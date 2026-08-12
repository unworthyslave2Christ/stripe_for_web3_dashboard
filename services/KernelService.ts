import {
    createKernelAccount,
    createKernelAccountClient,
    createZeroDevPaymasterClient,
    type CreateKernelAccountReturnType,
} from "@zerodev/sdk";

import {
    signerToEcdsaValidator,
} from "@zerodev/ecdsa-validator";

import {
    getEntryPoint,
    KERNEL_V3_3,
} from "@zerodev/sdk/constants";

import {
    createPublicClient,
    http,
    type PublicClient,
    type WalletClient,
} from "viem";

import {
    arbitrumSepolia,
} from "viem/chains";

import {
    walletClientToSmartAccountSigner,
} from "permissionless";

export type KernelAccount =
    CreateKernelAccountReturnType<"0.7">;

export type KernelClient =
    Awaited<
        ReturnType<typeof createKernelAccountClient>
    >;

export interface KernelContext {

    account: KernelAccount;

    client: KernelClient;

    address: `0x${string}`;

}

export interface KernelServiceConfig {

    rpcUrl: string;

    bundlerRpc: string;

    paymasterRpc: string;

}

export class KernelService {

    readonly chain = arbitrumSepolia;

    readonly entryPoint =
        getEntryPoint("0.7");

    readonly kernelVersion =
        KERNEL_V3_3;

    readonly publicClient: PublicClient;

    readonly paymasterClient;

    constructor(
        private readonly config: KernelServiceConfig,
    ) {

        this.publicClient =
            createPublicClient({

                chain:
                    this.chain,

                transport:
                    http(
                        this.config.rpcUrl,
                    ),

            });

        this.paymasterClient =
            createZeroDevPaymasterClient({

                chain:
                    this.chain,

                transport:
                    http(
                        this.config.paymasterRpc,
                    ),

            });

    }

    ////////////////////////////////////////////////////////////
    // Public Client
    ////////////////////////////////////////////////////////////

    getPublicClient() {

        return this.publicClient;

    }

    ////////////////////////////////////////////////////////////
    // Create Merchant Kernel
    ////////////////////////////////////////////////////////////

    async createMerchantKernel(
        ownerWalletClient: WalletClient,
    ): Promise<KernelContext> {

        const ownerSigner =
            walletClientToSmartAccountSigner(
                ownerWalletClient as any,
            );

        const ownerValidator =
            await signerToEcdsaValidator(

                this.publicClient,

                {

                    signer:
                        ownerSigner as any,

                    entryPoint:
                        this.entryPoint,

                    kernelVersion:
                        this.kernelVersion,

                },

            );

        const account =
            await createKernelAccount(

                this.publicClient,

                {

                    entryPoint:
                        this.entryPoint,

                    kernelVersion:
                        this.kernelVersion,

                    plugins: {

                        sudo:
                            ownerValidator,

                    },

                },

            );

        const client =
            createKernelAccountClient({

                account,

                chain:
                    this.chain,

                bundlerTransport:
                    http(
                        this.config.bundlerRpc,
                    ),

                paymaster: {

                    getPaymasterData:
                        (userOperation) =>
                            this.paymasterClient
                                .sponsorUserOperation({

                                    userOperation,

                                }),

                },

            });

        return {

            account,

            client,

            address:
                account.address,

        };

    }

    ////////////////////////////////////////////////////////////
    // Create Customer Kernel
    ////////////////////////////////////////////////////////////

    async createCustomerKernel(
        ownerWalletClient: WalletClient,
    ): Promise<KernelContext> {

        return this.createMerchantKernel(
            ownerWalletClient,
        );

    }

    ////////////////////////////////////////////////////////////
    // Create Client
    ////////////////////////////////////////////////////////////

    createKernelClient(
        account: KernelAccount,
    ): KernelClient {

        return createKernelAccountClient({

            account,

            chain:
                this.chain,

            bundlerTransport:
                http(
                    this.config.bundlerRpc,
                ),

            paymaster: {

                getPaymasterData:
                    (userOperation) =>
                        this.paymasterClient
                            .sponsorUserOperation({

                                userOperation,

                            }),

            },

        });

    }

}