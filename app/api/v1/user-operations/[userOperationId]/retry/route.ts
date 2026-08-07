// app/api/v1/user-operations/[userOperationId]/retry/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        userOperationId: string;
    }>;
}

export async function POST(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { userOperationId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Retry failed UserOperation.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            userOperation: {
                id: userOperationId,

                status: "QUEUED",

                retriedAt: new Date().toISOString(),
            },
        },
        {
            status: 202,
        },
    );

}