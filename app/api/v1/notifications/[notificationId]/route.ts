// app/api/v1/notifications/[notificationId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {

    params: Promise<{
        notificationId: string;
    }>;

}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { notificationId } =
        await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Lookup notification.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            notification: {

                notificationId,

                recipientType: "MERCHANT",

                recipientId: "mch_mock",

                channel: "EMAIL",

                eventType:
                    "billing.completed",

                title:
                    "Billing Successful",

                message:
                    "A billing cycle completed successfully.",

                status: "DELIVERED",

                deliveredAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}