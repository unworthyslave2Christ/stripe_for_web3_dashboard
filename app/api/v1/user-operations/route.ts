// app/api/v1/user-operations/route.ts

import { NextRequest, NextResponse } from "next/server";

interface CreateUserOperationRequest {

    operation:
        | "CREATE_MERCHANT"
        | "CREATE_PLAN"
        | "UPDATE_PLAN"
        | "PAUSE_PLAN"
        | "RESUME_PLAN"
        | "ARCHIVE_PLAN"
        | "CREATE_PERMISSION"
        | "UPDATE_PERMISSION"
        | "REVOKE_PERMISSION"
        | "CREATE_SUBSCRIPTION"
        | "PAUSE_SUBSCRIPTION"
        | "RESUME_SUBSCRIPTION"
        | "CANCEL_SUBSCRIPTION"
        | "BILLING";

    payload: Record<string, unknown>;

}

export async function POST(request: NextRequest) {

    const body =
        (await request.json()) as CreateUserOperationRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate caller.
    // Validate payload.
    // Queue UserOperation.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            userOperation: {
                id: "uop_mock",

                operation: body.operation,

                status: "QUEUED",

                createdAt: new Date().toISOString(),
            },
        },
        {
            status: 202,
        },
    );

}

export async function GET() {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Return UserOperations.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            userOperations: [],

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