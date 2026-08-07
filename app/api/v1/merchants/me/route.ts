// app/api/v1/merchants/me/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {

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
                merchantId: "mch_mock",

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