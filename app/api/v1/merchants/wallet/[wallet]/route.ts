// app/api/v1/merchants/wallet/[wallet]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        wallet: `0x${string}`;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { wallet } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Lookup Merchant by wallet address.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            merchant: {
                merchantId: "mch_mock",

                ownerWallet: wallet,

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