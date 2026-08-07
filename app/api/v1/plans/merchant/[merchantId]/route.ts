// app/api/v1/plans/merchant/[merchantId]/route.ts

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
    // Authenticate caller.
    // Verify merchant access.
    // Return all Plans belonging to Merchant.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            merchantId,

            plans: [],

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