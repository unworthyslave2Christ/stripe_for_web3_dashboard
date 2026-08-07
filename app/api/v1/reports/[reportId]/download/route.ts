// app/api/v1/reports/[reportId]/download/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {

    params: Promise<{
        reportId: string;
    }>;

}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { reportId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Verify report ownership.
    // Stream report.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            reportId,

            downloadUrl:
                "https://storage.example.com/report.csv",
        },
        {
            status: 200,
        },
    );

}