// app/api/v1/notifications/[notificationId]/cancel/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {

    params: Promise<{
        notificationId: string;
    }>;

}

export async function POST(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { notificationId } =
        await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Cancel queued notification.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            notification: {

                notificationId,

                status: "CANCELLED",

                cancelledAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}