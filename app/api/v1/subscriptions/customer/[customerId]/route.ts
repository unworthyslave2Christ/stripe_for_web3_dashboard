// app/api/v1/subscriptions/customer/[customerId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        customerId: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { customerId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate caller.
    // Verify access to Customer.
    // Return Customer's subscriptions.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            customerId,

            subscriptions: [],

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