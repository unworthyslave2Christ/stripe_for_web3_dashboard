// app/api/v1/notifications/route.ts

import { NextRequest, NextResponse } from "next/server";

interface CreateNotificationRequest {

    recipientType:
        | "MERCHANT"
        | "CUSTOMER";

    recipientId: string;

    channel:
        | "EMAIL"
        | "WEBHOOK"
        | "IN_APP"
        | "SMS";

    eventType: string;

    title: string;

    message: string;

    metadata?: Record<string, unknown>;

}

export async function POST(
    request: NextRequest,
) {

    const body =
        (await request.json()) as CreateNotificationRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Billing Platform.
    // Queue Notification.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            notification: {

                notificationId: "notif_mock",

                recipientType:
                    body.recipientType,

                recipientId:
                    body.recipientId,

                channel:
                    body.channel,

                eventType:
                    body.eventType,

                status: "QUEUED",

                createdAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 202,
        },
    );

}

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate caller.
    // Return notifications.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

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