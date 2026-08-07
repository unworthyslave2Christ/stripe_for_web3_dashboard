// app/api/v1/webhooks/route.ts

import { NextRequest, NextResponse } from "next/server";

interface CreateWebhookRequest {

    url: string;

    events: string[];

    secret?: string;

    enabled?: boolean;

}

export async function POST(request: NextRequest) {

    const body =
        (await request.json()) as CreateWebhookRequest;

    ////////////////////////////////////////////////////////////
    // Validation
    ////////////////////////////////////////////////////////////

    if (
        !body.url ||
        !body.events?.length
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code: "INVALID_REQUEST",

                    message:
                        "url and events are required.",
                },
            },
            {
                status: 400,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Merchant.
    // Persist webhook.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            webhook: {
                webhookId: "wh_mock",

                url: body.url,

                events: body.events,

                secret:
                    body.secret ?? "whsec_mock",

                enabled:
                    body.enabled ?? true,

                createdAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 201,
        },
    );

}

export async function GET() {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Return Merchant webhooks.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            webhooks: [],

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