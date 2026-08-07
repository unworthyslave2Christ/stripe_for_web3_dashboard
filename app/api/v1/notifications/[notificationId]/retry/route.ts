// app/api/v1/notifications/[notificationId]/retry/route.ts

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
    // Retry notification delivery.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            notification: {

                notificationId,

                status: "QUEUED",

                retriedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 202,
        },
    );

}