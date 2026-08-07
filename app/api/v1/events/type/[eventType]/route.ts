// app/api/v1/events/type/[eventType]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        eventType: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { eventType } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Return Events by type.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            eventType,

            events: [],

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