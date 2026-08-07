// app/api/v1/reports/route.ts

import { NextRequest, NextResponse } from "next/server";

interface GenerateReportRequest {

    type:
        | "REVENUE"
        | "SUBSCRIPTIONS"
        | "CUSTOMERS"
        | "PLANS"
        | "BILLING"
        | "PAYOUTS";

    format:
        | "CSV"
        | "JSON"
        | "PDF";

    from: string;

    to: string;

}

export async function POST(
    request: NextRequest,
) {

    const body =
        (await request.json()) as GenerateReportRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Merchant.
    // Queue report generation.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            report: {

                reportId: "report_mock",

                type: body.type,

                format: body.format,

                from: body.from,

                to: body.to,

                status: "QUEUED",

                createdAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 202,
        },
    );

}

export async function GET(
    _request: NextRequest,
) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Return generated reports.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            reports: [],

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