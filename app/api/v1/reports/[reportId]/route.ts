// app/api/v1/reports/[reportId]/route.ts

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
    // Lookup Report.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            report: {

                reportId,

                type: "REVENUE",

                format: "CSV",

                status: "READY",

                downloadUrl:
                    "https://storage.example.com/report.csv",

                createdAt:
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

    const { reportId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Delete Report.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            report: {

                reportId,

                deletedAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}