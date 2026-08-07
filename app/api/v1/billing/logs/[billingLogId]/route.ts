// app/api/v1/billing/logs/[billingLogId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        billingLogId: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { billingLogId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Lookup billing log.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            billingLog: {
                billingLogId,

                subscriptionId: "sub_mock",

                permissionId: "perm_mock",

                amount: "1000000",

                paymentToken:
                    "0x0000000000000000000000000000000000000000",

                status: "SUCCESS",

                transactionHash: null,

                createdAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}