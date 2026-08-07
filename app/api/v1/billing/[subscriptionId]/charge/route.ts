// app/api/v1/billing/[subscriptionId]/charge/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        subscriptionId: string;
    }>;
}

export async function POST(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { subscriptionId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Worker.
    // Execute billing.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            billing: {
                billingId: "bill_mock",

                subscriptionId,

                status: "PROCESSING",

                queuedAt:
                    new Date().toISOString(),
            },

            userOperation: {
                id: "uop_mock",

                status: "QUEUED",
            },
        },
        {
            status: 202,
        },
    );

}