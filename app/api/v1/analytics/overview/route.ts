// app/api/v1/analytics/overview/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Merchant.
    // Aggregate Merchant Analytics.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            overview: {

                merchantId: "mch_mock",

                totalCustomers: 0,

                totalPlans: 0,

                activePlans: 0,

                archivedPlans: 0,

                totalSubscriptions: 0,

                activeSubscriptions: 0,

                pausedSubscriptions: 0,

                cancelledSubscriptions: 0,

                totalRevenue: "0",

                totalCharges: 0,

                successfulCharges: 0,

                failedCharges: 0,

                lastChargeAt: null,

                generatedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}