// app/api/v1/notifications/recipient/[recipientType]/[recipientId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {

    params: Promise<{

        recipientType: string;

        recipientId: string;

    }>;

}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const {
        recipientType,
        recipientId,
    } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Return recipient notifications.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            recipientType,

            recipientId,

            notifications: [],

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