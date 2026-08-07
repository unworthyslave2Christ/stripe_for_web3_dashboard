// app/api/v1/admin/workers/[workerId]/restart/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {

    params: Promise<{
        workerId: string;
    }>;

}

export async function POST(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { workerId } =
        await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Restart Worker.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            worker: {

                workerId,

                status: "RESTARTING",

                restartedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 202,
        },
    );

}