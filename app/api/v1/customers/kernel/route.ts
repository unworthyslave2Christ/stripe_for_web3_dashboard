// app/api/v1/customers/kernel/route.ts

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import {
    deserializePermissionAccount,
} from "@zerodev/permissions";

import {
    toECDSASigner,
} from "@zerodev/permissions/signers";

import {
    privateKeyToAccount,
} from "viem/accounts";

import {
    createPublicClient,
    http,
} from "viem";

import {
    arbitrumSepolia,
} from "viem/chains";

import {
    entryPoint,
    kernelVersion,
} from "@/services/kernel.client";

import {
    decryptPrivateKey,
} from "@/utils/crypto";


////////////////////////////////////////////////////////////
// SUPABASE
////////////////////////////////////////////////////////////

const supabase =
    createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );


////////////////////////////////////////////////////////////
// PUBLIC CLIENT
////////////////////////////////////////////////////////////

const publicClient =
    createPublicClient({

        chain:
            arbitrumSepolia,

        transport:
            http(
                process.env.RPC_URL!,
            ),

    });


////////////////////////////////////////////////////////////
// REQUEST
////////////////////////////////////////////////////////////

interface GetCustomerKernelRequest {

    wallet:
        `0x${string}`;

}


////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////
//
// Recovers the customer's existing Kernel from the
// encrypted permission/session material stored by the
// backend.
//
// The customer's connected wallet is used only as the
// lookup identity.
//
// The actual Kernel is reconstructed from:
//
//   customers
//       ↓
//   billing_permissions
//       ↓
//   encrypted_session
//       ↓
//   session private key
//       ↓
//   session signer
//       ↓
//   serialized permission account
//       ↓
//   Kernel
//
////////////////////////////////////////////////////////////

export async function POST(
    request: NextRequest,
) {

    try {

        ////////////////////////////////////////////////////////
        // REQUEST BODY
        ////////////////////////////////////////////////////////

        const body: GetCustomerKernelRequest =
            await request.json();


        ////////////////////////////////////////////////////////
        // VALIDATE WALLET
        ////////////////////////////////////////////////////////

        if (!body.wallet) {

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "WALLET_REQUIRED",

                        message:
                            "Wallet address required.",
                    },
                },
                {
                    status: 400,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // NORMALIZE WALLET
        ////////////////////////////////////////////////////////

        const wallet =
            body.wallet;


        ////////////////////////////////////////////////////////
        // CUSTOMER
        ////////////////////////////////////////////////////////

        const {
            data: customer,
            error: customerError,
        } =
            await supabase

                .from("customers")

                .select("*")

                .eq(
                    "owner_wallet",
                    wallet,
                )

                .maybeSingle();


        ////////////////////////////////////////////////////////
        // CUSTOMER DATABASE ERROR
        ////////////////////////////////////////////////////////

        if (customerError) {

            console.error(
                "Customer lookup error:",
                customerError,
            );

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "DATABASE_ERROR",

                        message:
                            customerError.message,
                    },
                },
                {
                    status: 500,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // CUSTOMER NOT FOUND
        ////////////////////////////////////////////////////////

        if (!customer) {

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "CUSTOMER_NOT_FOUND",

                        message:
                            "Customer not found.",
                    },
                },
                {
                    status: 404,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // BILLING PERMISSION
        ////////////////////////////////////////////////////////
        //
        // Only the currently-active permission account may
        // be used to reconstruct the customer's Kernel.
        //
        ////////////////////////////////////////////////////////

        const {
            data: permission,
            error: permissionError,
        } =
            await supabase

                .from("billing_permissions")

                .select("*")

                .eq(
                    "customer_id",
                    customer.customer_id,
                )

                .eq(
                    "revoked",
                    false,
                )

                .order(
                    "created_at",
                    {
                        ascending: false,
                    },
                )

                .limit(1)

                .maybeSingle();


        ////////////////////////////////////////////////////////
        // PERMISSION DATABASE ERROR
        ////////////////////////////////////////////////////////

        if (permissionError) {

            console.error(
                "Billing permission lookup error:",
                permissionError,
            );

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "DATABASE_ERROR",

                        message:
                            permissionError.message,
                    },
                },
                {
                    status: 500,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // PERMISSION NOT FOUND
        ////////////////////////////////////////////////////////

        if (!permission) {

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "PERMISSION_NOT_FOUND",

                        message:
                            "Active customer permission account not found.",
                    },
                },
                {
                    status: 404,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // PERMISSION EXPIRATION
        ////////////////////////////////////////////////////////

        if (
            permission.permission_expiry
        ) {

            const expiry =
                new Date(
                    permission.permission_expiry,
                );

            if (
                Number.isNaN(
                    expiry.getTime(),
                )
            ) {

                return NextResponse.json(
                    {
                        success: false,

                        error: {
                            code:
                                "INVALID_PERMISSION_EXPIRY",

                            message:
                                "Customer permission expiry is invalid.",
                        },
                    },
                    {
                        status: 500,
                    },
                );

            }


            if (
                expiry.getTime()
                <=
                Date.now()
            ) {

                return NextResponse.json(
                    {
                        success: false,

                        error: {
                            code:
                                "PERMISSION_EXPIRED",

                            message:
                                "Customer permission account has expired.",
                        },
                    },
                    {
                        status: 403,
                    },
                );

            }

        }


        ////////////////////////////////////////////////////////
        // REQUIRED PERMISSION DATA
        ////////////////////////////////////////////////////////

        if (
            !permission.encrypted_session ||
            !permission.serialized_permission_account
        ) {

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "INVALID_PERMISSION_ACCOUNT",

                        message:
                            "Customer permission account is incomplete.",
                    },
                },
                {
                    status: 500,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // DECRYPT SESSION PRIVATE KEY
        ////////////////////////////////////////////////////////

        const sessionPrivateKey =
            decryptPrivateKey(
                permission.encrypted_session,
            );


        ////////////////////////////////////////////////////////
        // DERIVE SESSION ACCOUNT
        ////////////////////////////////////////////////////////

        const sessionAccount =
            privateKeyToAccount(
                sessionPrivateKey,
            );


        ////////////////////////////////////////////////////////
        // VERIFY SESSION PUBLIC KEY
        ////////////////////////////////////////////////////////

        if (
            permission.session_public_key
                .toLowerCase()
            !==
            sessionAccount.address
                .toLowerCase()
        ) {

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "SESSION_KEY_MISMATCH",

                        message:
                            "Stored session public key does not match the recovered session key.",
                    },
                },
                {
                    status: 500,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // CREATE SESSION SIGNER
        ////////////////////////////////////////////////////////

        const sessionSigner =
            await toECDSASigner({

                signer:
                    sessionAccount,

            });


        ////////////////////////////////////////////////////////
        // DESERIALIZE CUSTOMER KERNEL
        ////////////////////////////////////////////////////////

        const kernel =
            await deserializePermissionAccount(

                publicClient,

                entryPoint,

                kernelVersion,

                permission
                    .serialized_permission_account,

                sessionSigner,

            );


        ////////////////////////////////////////////////////////
        // VERIFY KERNEL
        ////////////////////////////////////////////////////////

        if (
            kernel.address
                .toLowerCase()
            !==
            customer.smart_account
                .toLowerCase()
        ) {

            console.error(
                "Customer Kernel verification failed.",
                {
                    kernelAddress:
                        kernel.address,

                    customerSmartAccount:
                        customer.smart_account,
                },
            );

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "KERNEL_VERIFICATION_FAILED",

                        message:
                            "Recovered Kernel does not belong to the customer.",
                    },
                },
                {
                    status: 500,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // SUCCESS
        ////////////////////////////////////////////////////////

        return NextResponse.json(
            {
                success: true,

                customer,

                kernelAddress:
                    kernel.address,

                serializedPermissionAccount:
                    permission
                        .serialized_permission_account,

                //////////////////////////////////////////////////
                // IMPORTANT
                //
                // This is retained because the current SDK
                // implementation expects sessionPrivateKey
                // in its response.
                //////////////////////////////////////////////////

                sessionPrivateKey,

                permissionId:
                    permission.permission_id,

                permission: {

                    permissionId:
                        permission.permission_id,

                    sessionPublicKey:
                        permission.session_public_key,

                    permissionExpiry:
                        permission.permission_expiry,

                    revoked:
                        permission.revoked,

                },

            },
            {
                status: 200,
            },
        );


    } catch (error) {

        ////////////////////////////////////////////////////////
        // UNEXPECTED ERROR
        ////////////////////////////////////////////////////////

        console.error(
            "Customer Kernel recovery error:",
            error,
        );


        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "INTERNAL_SERVER_ERROR",

                    message:
                        error instanceof Error
                            ? error.message
                            : "Unable to recover customer Kernel.",
                },
            },
            {
                status: 500,
            },
        );

    }

}