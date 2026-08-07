// app/api/v1/user-operations/[userOperationId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        userOperationId: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { userOperationId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Lookup UserOperation.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            userOperation: {
                id: userOperationId,

                operation: "CREATE_PLAN",

                status: "PENDING",

                transactionHash: null,

                userOperationHash: null,

                createdAt: new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}