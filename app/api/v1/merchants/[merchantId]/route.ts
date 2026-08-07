// app/api/v1/merchants/[merchantId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        merchantId: string;
    }>;
}

interface UpdateMerchantRequest {

    name?: string;

    metadataURI?: string;

}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { merchantId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate session.
    // Lookup Merchant.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            merchant: {
                merchantId,

                ownerWallet:
                    "0x0000000000000000000000000000000000000000",

                name: "Mock Merchant",

                metadataURI: "",

                status: "ACTIVE",

                createdAt: new Date().toISOString(),

                updatedAt: new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}

export async function PATCH(
    request: NextRequest,
    { params }: RouteContext,
) {

    const { merchantId } = await params;

    const body = (await request.json()) as UpdateMerchantRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Merchant.
    // Update Merchant.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            merchant: {
                merchantId,

                name: body.name ?? "Mock Merchant",

                metadataURI: body.metadataURI ?? "",

                updatedAt: new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}

export async function DELETE(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { merchantId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Archive Merchant.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            merchant: {
                merchantId,

                status: "ARCHIVED",

                archivedAt: new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}