// app/api/v1/user-operations/hash/[userOperationHash]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        userOperationHash: string;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { userOperationHash } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Lookup by UserOperation hash.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            userOperation: {
                id: "uop_mock",

                userOperationHash,

                status: "PENDING",
            },
        },
        {
            status: 200,
        },
    );

}