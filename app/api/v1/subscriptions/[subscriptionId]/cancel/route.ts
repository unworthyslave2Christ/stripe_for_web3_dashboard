// app/api/v1/subscriptions/[subscriptionId]/cancel/route.ts

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
    // Submit CancelSubscription UserOperation.
    // Mirror canonical database.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            subscription: {
                subscriptionId,

                status: "CANCELLED",

                cancelledAt: new Date().toISOString(),
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