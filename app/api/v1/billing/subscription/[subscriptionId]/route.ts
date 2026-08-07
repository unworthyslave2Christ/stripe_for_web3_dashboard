// app/api/v1/billing/subscription/[subscriptionId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        subscriptionId: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { subscriptionId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Return billing history
    // for a subscription.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            subscriptionId,

            billingLogs: [],

            pagination: {
                nextCursor: null,

                hasMore: false,
            },
        },
        {
            status: 200,
        },
    );

}