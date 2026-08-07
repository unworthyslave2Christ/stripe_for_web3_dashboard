// app/api/v1/subscriptions/[subscriptionId]/pause/route.ts

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
    // Authenticate Customer.
    // Verify ownership.
    // Submit PauseSubscription UserOperation.
    // Mirror canonical database.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            subscription: {
                subscriptionId,

                status: "PAUSED",

                pausedAt: new Date().toISOString(),
            },

            userOperation: {
                id: "uop_mock",

                status: "PENDING",
            },
        },
        {
            status: 200,
        },
    );

}