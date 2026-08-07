// app/api/v1/billing/run/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RunBillingRequest {

    subscriptionIds?: string[];

    dryRun?: boolean;

}

export async function POST(request: NextRequest) {

    const body =
        (await request.json()) as RunBillingRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Worker.
    // Locate due subscriptions.
    // Queue billing jobs.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            billingRun: {
                id: "billrun_mock",

                queuedSubscriptions:
                    body.subscriptionIds?.length ?? 0,

                dryRun:
                    body.dryRun ?? false,

                status: "QUEUED",

                queuedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 202,
        },
    );

}