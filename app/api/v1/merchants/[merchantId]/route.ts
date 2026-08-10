// app/api/v1/merchants/[merchantId]/route.ts

import { NextRequest, NextResponse } from "next/server";

import { supabase } from "../../shared";


////////////////////////////////////////////////////////////
// ROUTE CONTEXT
////////////////////////////////////////////////////////////

interface RouteContext {
    params: Promise<{
        merchantId: string;
    }>;
}


////////////////////////////////////////////////////////////
// UPDATE REQUEST
////////////////////////////////////////////////////////////

interface UpdateMerchantRequest {

    name?: string;

    metadataURI?: string;
}

////////////////////////////////////////////////////////////
// GET MERCHANT
////////////////////////////////////////////////////////////

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const {
        merchantId:
            merchantIdParam,
    } = await params;


    ////////////////////////////////////////////////////////////
    // PARSE MERCHANT ID
    ////////////////////////////////////////////////////////////

    const merchantId =
        Number(
            merchantIdParam,
        );


    ////////////////////////////////////////////////////////////
    // VALIDATE MERCHANT ID
    ////////////////////////////////////////////////////////////

    if (
        !Number.isInteger(
            merchantId,
        ) ||
        merchantId <= 0
    ) {

        return NextResponse.json(
            {
                error:
                    "Invalid merchantId.",
            },
            {
                status: 400,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // QUERY MERCHANT
    ////////////////////////////////////////////////////////////

    const {
        data: merchant,
        error,
    } =
        await supabase
            .from("merchants")
            .select("*")
            .eq(
                "merchant_id",
                merchantId,
            )
            .maybeSingle();


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
    // MERCHANT NOT FOUND
    ////////////////////////////////////////////////////////////

    if (!merchant) {

        return NextResponse.json(
            {
                error:
                    "Merchant not found.",
            },
            {
                status: 404,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // NORMALIZE DATABASE ROW
    //
    // Supabase:
    //
    //     merchant_id
    //     owner_wallet
    //     smart_account
    //     payout_wallet
    //     metadata_uri
    //     billing_operator
    //     created_at
    //     updated_at
    //
    // API / MerchantRecord:
    //
    //     merchantId
    //     ownerWallet
    //     smartAccount
    //     payoutWallet
    //     metadataURI
    //     billingOperator
    //     createdAt
    //     updatedAt
    ////////////////////////////////////////////////////////////

    const normalizedMerchant = {

        merchantId:
            Number(
                merchant.merchant_id,
            ),

        ownerWallet:
            merchant.owner_wallet,

        smartAccount:
            merchant.smart_account,

        payoutWallet:
            merchant.payout_wallet,

        name:
            merchant.name,

        metadataURI:
            merchant.metadata_uri
            ??
            "",

        billingOperator:
            merchant.billing_operator
            ??
            undefined,

        status:
            merchant.status
            ??
            "ACTIVE",

        createdAt:
            merchant.created_at
            ? new Date(
                merchant.created_at,
            )
            : new Date(),

        updatedAt:
            merchant.updated_at
            ? new Date(
                merchant.updated_at,
            )
            : new Date(),
    };


    ////////////////////////////////////////////////////////////
    // RESULT
    ////////////////////////////////////////////////////////////

    console.log(
        "merchant GRACIOUSLY normalized from database:",
        normalizedMerchant,
    );


    return NextResponse.json(
        {
            merchant: normalizedMerchant,
        },
        {
            status: 200,
        },
    );
}
////////////////////////////////////////////////////////////
// PATCH MERCHANT
////////////////////////////////////////////////////////////

export async function PATCH(
    request: NextRequest,
    { params }: RouteContext,
) {

    const {
        merchantId:
            merchantIdParam,
    } = await params;


    ////////////////////////////////////////////////////////////
    // PARSE MERCHANT ID
    ////////////////////////////////////////////////////////////

    const merchantId =
        Number(
            merchantIdParam,
        );


    ////////////////////////////////////////////////////////////
    // VALIDATE MERCHANT ID
    ////////////////////////////////////////////////////////////

    if (
        !Number.isInteger(
            merchantId,
        ) ||
        merchantId <= 0
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "INVALID_MERCHANT_ID",

                    message:
                        "Invalid merchantId.",
                },
            },
            {
                status: 400,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // REQUEST BODY
    ////////////////////////////////////////////////////////////

    const body =
        await request.json() as
        UpdateMerchantRequest;


    ////////////////////////////////////////////////////////////
    // VALIDATE BODY
    ////////////////////////////////////////////////////////////

    if (
        body.name === undefined &&
        body.metadataURI === undefined
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "INVALID_REQUEST",

                    message:
                        "No merchant fields were provided for update.",
                },
            },
            {
                status: 400,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // GET EXISTING MERCHANT
    ////////////////////////////////////////////////////////////

    const {
        data: existingMerchant,
        error: existingMerchantError,
    } =
        await supabase
            .from("merchants")
            .select("*")
            .eq(
                "merchant_id",
                merchantId,
            )
            .maybeSingle();


    ////////////////////////////////////////////////////////////
    // DATABASE ERROR
    ////////////////////////////////////////////////////////////

    if (
        existingMerchantError
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        existingMerchantError.message,
                },
            },
            {
                status: 500,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // MERCHANT NOT FOUND
    ////////////////////////////////////////////////////////////

    if (!existingMerchant) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "MERCHANT_NOT_FOUND",

                    message:
                        "Merchant not found.",
                },
            },
            {
                status: 404,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // UPDATE MIRROR
    //
    // Blockchain remains the source of truth.
    //
    // This route only updates fields that are supplied
    // by the caller.
    ////////////////////////////////////////////////////////////

    const updateData: Record<
        string,
        unknown
    > = {};


    if (
        body.name !== undefined
    ) {

        updateData.name =
            body.name;

    }


    if (
        body.metadataURI !== undefined
    ) {

        updateData.metadata_uri =
            body.metadataURI;

    }


    updateData.updated_at =
        new Date().toISOString();


    ////////////////////////////////////////////////////////////
    // UPDATE DATABASE
    ////////////////////////////////////////////////////////////

    const {
        data: merchant,
        error,
    } =
        await supabase
            .from("merchants")
            .update(
                updateData,
            )
            .eq(
                "merchant_id",
                merchantId,
            )
            .select("*")
            .single();


    ////////////////////////////////////////////////////////////
    // DATABASE ERROR
    ////////////////////////////////////////////////////////////

    if (error) {

        console.error(
            "merchant update error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        error.message,
                },
            },
            {
                status: 500,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // RESULT
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            merchant,
        },
        {
            status: 200,
        },
    );
}


////////////////////////////////////////////////////////////
// DELETE / ARCHIVE MERCHANT
////////////////////////////////////////////////////////////

export async function DELETE(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const {
        merchantId:
            merchantIdParam,
    } = await params;


    ////////////////////////////////////////////////////////////
    // PARSE MERCHANT ID
    ////////////////////////////////////////////////////////////

    const merchantId =
        Number(
            merchantIdParam,
        );


    ////////////////////////////////////////////////////////////
    // VALIDATE MERCHANT ID
    ////////////////////////////////////////////////////////////

    if (
        !Number.isInteger(
            merchantId,
        ) ||
        merchantId <= 0
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "INVALID_MERCHANT_ID",

                    message:
                        "Invalid merchantId.",
                },
            },
            {
                status: 400,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // GET EXISTING MERCHANT
    ////////////////////////////////////////////////////////////

    const {
        data: existingMerchant,
        error: existingMerchantError,
    } =
        await supabase
            .from("merchants")
            .select("*")
            .eq(
                "merchant_id",
                merchantId,
            )
            .maybeSingle();


    ////////////////////////////////////////////////////////////
    // DATABASE ERROR
    ////////////////////////////////////////////////////////////

    if (
        existingMerchantError
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        existingMerchantError.message,
                },
            },
            {
                status: 500,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // MERCHANT NOT FOUND
    ////////////////////////////////////////////////////////////

    if (!existingMerchant) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "MERCHANT_NOT_FOUND",

                    message:
                        "Merchant not found.",
                },
            },
            {
                status: 404,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // ARCHIVE MERCHANT
    ////////////////////////////////////////////////////////////

    const now =
        new Date().toISOString();


    const {
        data: merchant,
        error,
    } =
        await supabase
            .from("merchants")
            .update({

                status:
                    "ARCHIVED",

                updated_at:
                    now,

            })
            .eq(
                "merchant_id",
                merchantId,
            )
            .select("*")
            .single();


    ////////////////////////////////////////////////////////////
    // DATABASE ERROR
    ////////////////////////////////////////////////////////////

    if (error) {

        console.error(
            "merchant archive error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        error.message,
                },
            },
            {
                status: 500,
            },
        );

    }


    ////////////////////////////////////////////////////////////
    // RESULT
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            merchant,
        },
        {
            status: 200,
        },
    );
}