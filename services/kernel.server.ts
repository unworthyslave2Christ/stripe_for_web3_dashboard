import {
    decryptPrivateKey,
    type EncryptedSession,
} from "../utils/crypto";

import { arbitrumSepolia } from "viem/chains";

import {
    getEntryPoint,
    KERNEL_V3_3,
} from "@zerodev/sdk/constants";
import { createKernelAccountClient, CreateKernelAccountReturnType, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { deserializePermissionAccount, serializePermissionAccount, toPermissionValidator } from "@zerodev/permissions";
import { createPublicClient, http, type Address, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { toECDSASigner } from "@zerodev/permissions/signers";
import { toSudoPolicy } from "@zerodev/permissions/policies";


const chain = arbitrumSepolia;

const entryPoint = getEntryPoint("0.7");

const kernelVersion = KERNEL_V3_3;

export type KernelAccount =
    CreateKernelAccountReturnType<"0.7">;

export type KernelClient =
    Awaited<
        ReturnType<typeof createKernelAccountClient>
    >;

const publicClient = createPublicClient({
    chain,
    transport: http(process.env.RPC_URL!),
});

const paymasterClient = createZeroDevPaymasterClient({
    chain,
    transport: http(process.env.PAYMASTER_RPC!),
});

const bundlerTransport = http(process.env.BUNDLER_RPC!);



export interface RecoveredKernel {

    account: KernelAccount;

    client: KernelClient;

}


export interface SerializedPermissionKernel {

    account: KernelAccount;

    client: KernelClient;

    serializedPermissionAccount: string;

    sessionPublicKey: Address;

}


/* -------------------------------------------------------------------------- */
/* Recover Serialized Permission Account                                       */
/* -------------------------------------------------------------------------- */

export async function recoverPermissionKernel(params: {

    serializedPermissionAccount: string;

    encryptedSession: EncryptedSession;

}): Promise<RecoveredKernel> {

    const sessionSigner =
        await recoverSessionSigner(params.encryptedSession);

    /*
     * Recover serialized permission account
     */

    const account =
        await deserializePermissionAccount(

            publicClient,

            entryPoint,

            kernelVersion,

            params.serializedPermissionAccount,

            sessionSigner,

        );

    return {

        account,

        client:
            createClient(account),

    };

}


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
/* Recover Session Signer                                                      */
/* -------------------------------------------------------------------------- */

export async function recoverSessionSigner(
    encryptedSession: EncryptedSession,
) {

    const sessionPrivateKey =
        decryptPrivateKey(
            encryptedSession,
        );

    const sessionAccount =
        privateKeyToAccount(
            sessionPrivateKey,
        );

    return toECDSASigner({

        signer:
            sessionAccount,

    });

}


/* -------------------------------------------------------------------------- */
/* Build Permission Validator                                                  */
/* -------------------------------------------------------------------------- */

export async function createPermissionValidator(
    encryptedSession: EncryptedSession,
) {

    const signer =
        await recoverSessionSigner(
            encryptedSession,
        );

    return toPermissionValidator(

        publicClient,

        {

            signer,

            entryPoint,

            kernelVersion,

            policies: [

                toSudoPolicy({}),

            ],

        },

    );

}



/* -------------------------------------------------------------------------- */
/* Serialize Existing Permission Account                                       */
/* -------------------------------------------------------------------------- */

export async function serializePermissionKernel(
    account: KernelAccount,
    permissionValidator: Parameters<
        typeof serializePermissionAccount
    >[4],
): Promise<string> {

    return serializePermissionAccount(

        account,

        undefined,

        undefined,

        undefined,

        permissionValidator,

    );

}