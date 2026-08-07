// app/api/v1/admin/system/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Platform Administrator.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            system: {

                version: "1.0.0",

                network: "Arbitrum Sepolia",

                contract:
                    "0x0000000000000000000000000000000000000000",

                uptimeSeconds: 0,

                startedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}