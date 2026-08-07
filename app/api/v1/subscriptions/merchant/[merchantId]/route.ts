// app/api/v1/subscriptions/merchant/[merchantId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        merchantId: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { merchantId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Merchant.
    // Verify ownership.
    // Return Merchant subscriptions.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            merchantId,

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