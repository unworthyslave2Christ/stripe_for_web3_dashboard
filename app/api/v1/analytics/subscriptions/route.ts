// app/api/v1/analytics/subscriptions/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Aggregate Subscription metrics.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            subscriptions: {

                active: 0,

                paused: 0,

                cancelled: 0,

                trialing: 0,

                expired: 0,
            },

            growth: [],

            churn: [],
        },
        {
            status: 200,
        },
    );

}