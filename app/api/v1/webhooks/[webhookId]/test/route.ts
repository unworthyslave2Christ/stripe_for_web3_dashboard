// app/api/v1/webhooks/[webhookId]/test/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        webhookId: string;
    }>;
}

export async function POST(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { webhookId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Dispatch test webhook.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            webhook: {
                webhookId,
            },

            delivery: {
                deliveryId: "delivery_mock",

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