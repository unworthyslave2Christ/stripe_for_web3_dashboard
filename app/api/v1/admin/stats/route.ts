// app/api/v1/admin/stats/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Aggregate platform statistics.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            statistics: {

                merchants: 0,

                customers: 0,

                plans: 0,

                subscriptions: 0,

                permissions: 0,

                billings: 0,

                revenue: "0",

                failedBillings: 0,
            },
        },
        {
            status: 200,
        },
    );

}