// app/api/v1/admin/queues/[queueName]/flush/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {

    params: Promise<{
        queueName: string;
    }>;

}

export async function POST(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { queueName } =
        await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Flush queue.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            queue: {

                queueName,

                flushedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 202,
        },
    );

}