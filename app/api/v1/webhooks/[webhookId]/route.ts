// app/api/v1/webhooks/[webhookId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        webhookId: string;
    }>;
}

interface UpdateWebhookRequest {

    url?: string;

    events?: string[];

    enabled?: boolean;

}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { webhookId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Lookup webhook.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            webhook: {
                webhookId,

                url:
                    "https://example.com/webhook",

                events: [
                    "subscription.created",
                    "billing.completed",
                ],

                enabled: true,

                createdAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}

export async function PATCH(
    request: NextRequest,
    { params }: RouteContext,
) {

    const { webhookId } = await params;

    const body =
        (await request.json()) as UpdateWebhookRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Update webhook.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            webhook: {
                webhookId,

                ...body,

                updatedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}

export async function DELETE(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { webhookId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Delete webhook.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            webhook: {
                webhookId,

                deletedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}