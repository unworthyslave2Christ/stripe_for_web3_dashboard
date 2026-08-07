// app/api/v1/events/resource/[resourceType]/[resourceId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        resourceType: string;
        resourceId: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const {
        resourceType,
        resourceId,
    } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Return resource timeline.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            resourceType,

            resourceId,

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