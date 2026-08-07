// app/api/v1/analytics/plans/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Aggregate Plan performance.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            plans: [],

            generatedAt:
                new Date().toISOString(),
        },
        {
            status: 200,
        },
    );

}