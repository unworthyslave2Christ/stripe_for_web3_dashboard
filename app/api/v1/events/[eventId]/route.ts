// app/api/v1/events/[eventId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        eventId: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { eventId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Lookup Event.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            event: {
                eventId,

                type: "subscription.created",

                merchantId: "mch_mock",

                customerId: "cus_mock",

                resourceType: "subscription",

                resourceId: "sub_mock",

                payload: {},

                createdAt: new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}