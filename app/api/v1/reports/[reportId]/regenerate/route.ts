// app/api/v1/reports/[reportId]/regenerate/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {

    params: Promise<{
        reportId: string;
    }>;

}

export async function POST(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { reportId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Queue regeneration.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            report: {

                reportId,

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