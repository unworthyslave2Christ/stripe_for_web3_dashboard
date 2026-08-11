// app/api/v1/customers/route.ts

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import {
    encryptPrivateKey,
} from "@/utils/crypto";

import {
    privateKeyToAccount,
} from "viem/accounts";


////////////////////////////////////////////////////////////
// SUPABASE
////////////////////////////////////////////////////////////

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);


////////////////////////////////////////////////////////////
// POST REQUEST
////////////////////////////////////////////////////////////

interface CreateCustomerRequest {

    wallet:
        `0x${string}`;

    smartAccount:
        `0x${string}`;

    displayName:
        string;

    email:
        string;

    sessionPrivateKey:
        `0x${string}`;

    serializedPermissionAccount:
        string;
}


////////////////////////////////////////////////////////////
// GET
////////////////////////////////////////////////////////////
//
// Retrieves customers.
//
// Supported filters:
//
// ?customerId=1
// ?wallet=0x...
// ?smartAccount=0x...
//
// With no filter, all customers are returned.
//
////////////////////////////////////////////////////////////

export async function GET(
    request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // PARAMETERS
    ////////////////////////////////////////////////////////////

    const customerId =
        request.nextUrl.searchParams.get(
            "customerId",
        );

    const wallet =
        request.nextUrl.searchParams.get(
            "wallet",
        );

    const smartAccount =
        request.nextUrl.searchParams.get(
            "smartAccount",
        );


    ////////////////////////////////////////////////////////////
    // QUERY
    ////////////////////////////////////////////////////////////

    let query =
        supabase
            .from("customers")
            .select("*");


    ////////////////////////////////////////////////////////////
    // FILTER
    ////////////////////////////////////////////////////////////

    if (customerId) {

        const parsedCustomerId =
            Number(customerId);

        if (
            !Number.isInteger(
                parsedCustomerId,
            ) ||
            parsedCustomerId <= 0
        ) {

            return NextResponse.json(
                {
                    error:
                        "Invalid customerId.",
                },
                {
                    status: 400,
                },
            );

        }

        query =
            query.eq(
                "customer_id",
                parsedCustomerId,
            );

    } else if (wallet) {

        query =
            query.eq(
                "wallet_address",
                wallet,
            );

    } else if (smartAccount) {

        query =
            query.eq(
                "smart_account",
                smartAccount,
            );

    } else {

        ////////////////////////////////////////////////////////
        // RETURN ALL CUSTOMERS
        ////////////////////////////////////////////////////////

        const {
            data,
            error,
        } =
            await query.order(
                "created_at",
                {
                    ascending: false,
                },
            );


        if (error) {

            return NextResponse.json(
                {
                    error:
                        error.message,
                },
                {
                    status: 500,
                },
            );

        }


        return NextResponse.json(
            data ?? [],
            {
                status: 200,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // EXECUTE SINGLE CUSTOMER QUERY
    ////////////////////////////////////////////////////////////

    const {
        data,
        error,
    } =
        await query.maybeSingle();


    ////////////////////////////////////////////////////////////
    // DATABASE ERROR
    ////////////////////////////////////////////////////////////

    if (error) {

        return NextResponse.json(
            {
                error:
                    error.message,
            },
            {
                status: 500,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // CUSTOMER NOT FOUND
    ////////////////////////////////////////////////////////////

    if (!data) {

        return NextResponse.json(
            {
                error:
                    "Customer not found.",
            },
            {
                status: 404,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // RESULT
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        data,
        {
            status: 200,
        },
    );

}


////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////
//
// Creates:
//
// 1. Customer
// 2. Billing permission
//
// The customer itself does NOT store the session private key.
//
// The session private key is encrypted and persisted in
// billing_permissions.
//
////////////////////////////////////////////////////////////

export async function POST(
    request: NextRequest,
) {
    
    try {

        ////////////////////////////////////////////////////////
        // REQUEST BODY
        ////////////////////////////////////////////////////////

        const body =
            await request.json() as CreateCustomerRequest;


        ////////////////////////////////////////////////////////
        // VALIDATION
        ////////////////////////////////////////////////////////

        if (
            !body.wallet ||
            !body.smartAccount ||
            !body.displayName ||
            !body.email ||
            !body.sessionPrivateKey ||
            !body.serializedPermissionAccount
        ) {

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "INVALID_REQUEST",

                        message:
                            "Missing required customer fields.",
                    },
                },
                {
                    status: 400,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // NORMALIZE ADDRESSES
        ////////////////////////////////////////////////////////

        const wallet =
            body.wallet;

        const smartAccount =
            body.smartAccount;

        ////////////////////////////////////////////////////////
        // TIMESTAMP
        ////////////////////////////////////////////////////////

        const now =
            new Date().toISOString();


        ////////////////////////////////////////////////////////
        // CHECK EXISTING CUSTOMER
        ////////////////////////////////////////////////////////

        const {
            data: existingCustomer,
            error: existingCustomerError,
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
        // DATABASE ERROR
        ////////////////////////////////////////////////////////

        if (existingCustomerError) {

            console.log("returned customer lookup error: ",existingCustomerError);

            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "DATABASE_ERROR",

                        message:
                            existingCustomerError.message,
                    },
                },
                {
                    status: 500,
                },
            );

        }

        console.log("Customer record create request GRACIOUSLY received...")

        ////////////////////////////////////////////////////////
        // ALREADY REGISTERED
        ////////////////////////////////////////////////////////

        if (existingCustomer) {

            return NextResponse.json(
                {
                    success: true,

                    alreadyRegistered:
                        true,

                    customer:
                        existingCustomer,
                },
                {
                    status: 200,
                },
            );

        }


        ////////////////////////////////////////////////////////
        // ENCRYPT SESSION PRIVATE KEY
        ////////////////////////////////////////////////////////

        const encryptedSession =
            encryptPrivateKey(
                body.sessionPrivateKey,
            );


        ////////////////////////////////////////////////////////
        // DERIVE SESSION PUBLIC KEY
        ////////////////////////////////////////////////////////

        const sessionAccount =
            privateKeyToAccount(
                body.sessionPrivateKey,
            );

        const sessionPublicKey =
            sessionAccount.address;


        ////////////////////////////////////////////////////////
        // CREATE CUSTOMER
        ////////////////////////////////////////////////////////

        const {
            data: customer,
            error: customerError,
        } =
            await supabase
                .from("customers")
                .insert({

                    owner_wallet:
                        wallet,

                    smart_account:
                        smartAccount,

                    display_name:
                        body.displayName,

                    email:
                        body.email,

                    status:
                        "ACTIVE",

                    created_at:
                        now,

                    updated_at:
                        now,

                })
                .select()
                .single();


        ////////////////////////////////////////////////////////
        // CUSTOMER DATABASE ERROR
        ////////////////////////////////////////////////////////

        if (customerError) {

            console.error(
                "Customer creation error:",
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
        // PERMISSION EXPIRY
        ////////////////////////////////////////////////////////

        const expiry =
            new Date(
                Date.now() +
                365 *
                24 *
                60 *
                60 *
                1000,
            ).toISOString();


        ////////////////////////////////////////////////////////
        // CREATE BILLING PERMISSION
        ////////////////////////////////////////////////////////

        const {
            data: permission,
            error: permissionError,
        } =
            await supabase
                .from("billing_permissions")
                .insert({

                    customer_id:
                        customer.customer_id,

                    session_public_key:
                        sessionPublicKey,

                    serialized_permission_account:
                        body.serializedPermissionAccount,

                    encrypted_session:
                        encryptedSession,

                    permission_expiry:
                        expiry,

                    revoked:
                        false,

                    created_at:
                        now,

                    updated_at:
                        now,

                })
                .select()
                .single();


        ////////////////////////////////////////////////////////
        // PERMISSION DATABASE ERROR
        ////////////////////////////////////////////////////////

        if (permissionError) {

            console.error(
                "Billing permission creation error:",
                permissionError,
            );


            //////////////////////////////////////////////////////
            // ROLLBACK CUSTOMER
            //
            // Because customer creation succeeded but permission
            // creation failed, remove the orphaned customer.
            //////////////////////////////////////////////////////

            await supabase
                .from("customers")
                .delete()
                .eq(
                    "customer_id",
                    customer.customer_id,
                );


            return NextResponse.json(
                {
                    success: false,

                    error: {
                        code:
                            "PERMISSION_CREATION_FAILED",

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
        // SUCCESS
        ////////////////////////////////////////////////////////

        return NextResponse.json(
            {
                success: true,

                alreadyRegistered:
                    false,

                customer,

                permission,
            },
            {
                status: 201,
            },
        );


    } catch (error) {


        ////////////////////////////////////////////////////////
        // UNEXPECTED ERROR
        ////////////////////////////////////////////////////////

        console.error(
            "Customer POST error:",
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
                            : "Unable to create customer.",
                },
            },
            {
                status: 500,
            },
        );

    }

}