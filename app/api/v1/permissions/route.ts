// app/api/v1/permissions/route.ts

import { NextRequest, NextResponse } from "next/server";

interface CreatePermissionRequest {

    customerId: string;

    smartAccount: `0x${string}`;

    spender: `0x${string}`;

    paymentToken: `0x${string}`;

    amount: string;

    periodSeconds: number;

    validAfter: number;

    validUntil: number;

}

export async function POST(request: NextRequest) {

    const body =
        (await request.json()) as CreatePermissionRequest;

    ////////////////////////////////////////////////////////////
    // Validation
    ////////////////////////////////////////////////////////////

    if (
        !body.customerId ||
        !body.smartAccount ||
        !body.spender ||
        !body.paymentToken ||
        !body.amount ||
        !body.periodSeconds
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code: "INVALID_REQUEST",

                    message:
                        "Missing required permission fields.",
                },
            },
            {
                status: 400,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Customer.
    // Submit Permission UserOperation.
    // Mirror canonical database.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            permission: {
                permissionId: "perm_mock",

                customerId: body.customerId,

                smartAccount: body.smartAccount,

                spender: body.spender,

                paymentToken: body.paymentToken,

                amount: body.amount,

                periodSeconds: body.periodSeconds,

                validAfter: body.validAfter,

                validUntil: body.validUntil,

                status: "ACTIVE",

                createdAt:
                    new Date().toISOString(),
            },

            userOperation: {
                id: "uop_mock",

                status: "PENDING",
            },
        },
        {
            status: 201,
        },
    );

}

export async function GET(_request: NextRequest) {

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate caller.
    // Return permissions.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            permissions: [],

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