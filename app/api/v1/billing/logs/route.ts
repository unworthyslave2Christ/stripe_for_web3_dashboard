// app/api/v1/billing/logs/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Return billing logs.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            billingLogs: [],

            pagination: {
                nextCursor: null,

                hasMore: false,
            },
        },
        {
            status: 200,
        },
    );

}