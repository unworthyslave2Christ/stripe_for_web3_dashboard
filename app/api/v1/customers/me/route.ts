// app/api/v1/customers/me/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Customer session.
    // Lookup Customer.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            customer: {
                customerId: "cus_mock",

                wallet:
                    "0x0000000000000000000000000000000000000000",

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