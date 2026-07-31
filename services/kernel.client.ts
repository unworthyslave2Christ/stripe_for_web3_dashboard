// services/kernel.ts

import {
    createPublicClient,
    http,
    PublicClient,
    WalletClient
} from "viem";

import { arbitrumSepolia } from "viem/chains";


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


import {providerToSmartAccountSigner, walletClientToSmartAccountSigner} from "permissionless"


// import { type SmartAccountSigner } from "@zerodev/sdk"

 // ✅ Type resolved here


/* -------------------------------------------------------------------------- */
/* Configuration                                                               */
/* -------------------------------------------------------------------------- */

const chain = arbitrumSepolia;

const entryPoint = getEntryPoint("0.7");

const kernelVersion = KERNEL_V3_3;

const publicClient = createPublicClient({
    chain,
    transport: http(process.env.RPC_URL!),
});

const paymasterClient = createZeroDevPaymasterClient({
    chain,
    transport: http(process.env.PAYMASTER_RPC!),
});

const bundlerTransport = http(process.env.BUNDLER_RPC!);

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type KernelAccount =
    CreateKernelAccountReturnType<"0.7">;

export type KernelClient =
    Awaited<
        ReturnType<typeof createKernelAccountClient>
    >;


/* -------------------------------------------------------------------------- */
/* Internal Helper                                                             */
/* -------------------------------------------------------------------------- */

function createClient(
    account: KernelAccount,
): KernelClient {

    return createKernelAccountClient({

        account,

        chain,

        bundlerTransport:
            bundlerTransport,

        paymaster: {

            getPaymasterData(userOperation) {

                return paymasterClient
                    .sponsorUserOperation({
                        userOperation,
                    });

            },

        },

    });

}







/* -------------------------------------------------------------------------- */
/* Create Blank Kernel Client                                                  */
/* -------------------------------------------------------------------------- */

export function createKernelClient(
    account: KernelAccount,
): KernelClient {

    return createClient(account);

}

/* -------------------------------------------------------------------------- */
/* Shared ZeroDev Exports                                                      */
/* -------------------------------------------------------------------------- */

export {

    publicClient,

    chain,

    entryPoint,

    kernelVersion,

    paymasterClient,

};


export interface CreateMerchantKernelParams {

    ownerWalletClient: WalletClient;

    publicClient: PublicClient;

}


export async function createMerchantKernel({
    ownerWalletClient,
    publicClient,
}: CreateMerchantKernelParams) {

    const ownerSigner =  walletClientToSmartAccountSigner(ownerWalletClient as any);


    const ownerValidator =
        await signerToEcdsaValidator(
            publicClient,
            {
                signer: ownerSigner as any,
                entryPoint,
                kernelVersion,
            },
        );

    const account =
        await createKernelAccount(
            publicClient,
            {
                entryPoint,
                kernelVersion,

                plugins: {
                    sudo: ownerValidator,
                },
            },
        );

    const client =
        createKernelAccountClient({

            account,

            chain,

            bundlerTransport:
                http(process.env.BUNDLER_RPC!),

            paymaster: {

                getPaymasterData(userOperation) {

                    return paymasterClient
                        .sponsorUserOperation({
                            userOperation,
                        });

                },

            },

        });

    return {

        account,

        client,

        address:
            account.address,

    };

}