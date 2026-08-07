// app/api/v1/customers/wallet/[wallet]/route.ts

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
    // Lookup Customer by wallet.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            customer: {
                customerId: "cus_mock",

                wallet,

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