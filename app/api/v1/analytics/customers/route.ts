// app/api/v1/analytics/customers/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Aggregate Customer metrics.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            customers: {

                total: 0,

                active: 0,

                inactive: 0,

                newThisMonth: 0,
            },

            timeline: [],
        },
        {
            status: 200,
        },
    );

}