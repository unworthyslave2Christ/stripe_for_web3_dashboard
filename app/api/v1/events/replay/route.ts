// app/api/v1/events/replay/route.ts

import { NextRequest, NextResponse } from "next/server";

interface ReplayEventsRequest {

    from: string;

    to: string;

    webhookId?: string;

    eventTypes?: string[];

}

export async function POST(
    request: NextRequest,
) {

    const body =
        (await request.json()) as ReplayEventsRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Queue replay job.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            replayJob: {
                replayJobId: "replay_mock",

                from: body.from,

                to: body.to,

                webhookId:
                    body.webhookId ?? null,

                status: "QUEUED",

                queuedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 202,
        },
    );

}