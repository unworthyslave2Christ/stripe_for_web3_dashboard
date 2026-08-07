// app/api/v1/permissions/[permissionId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        permissionId: string;
    }>;
}

interface UpdatePermissionRequest {

    amount?: string;

    periodSeconds?: number;

    validAfter?: number;

    validUntil?: number;

    status?:
        | "ACTIVE"
        | "REVOKED"
        | "EXPIRED";

}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { permissionId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate caller.
    // Lookup Permission.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            permission: {
                permissionId,

                customerId: "cus_mock",

                smartAccount:
                    "0x0000000000000000000000000000000000000000",

                spender:
                    "0x0000000000000000000000000000000000000000",

                paymentToken:
                    "0x0000000000000000000000000000000000000000",

                amount: "1000000",

                periodSeconds: 2592000,

                validAfter: 0,

                validUntil: 0,

                status: "ACTIVE",

                createdAt:
                    new Date().toISOString(),
            },
        },
        {
            status: 200,
        },
    );

}

export async function PATCH(
    request: NextRequest,
    { params }: RouteContext,
) {

    const { permissionId } = await params;

    const body =
        (await request.json()) as UpdatePermissionRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Customer.
    // Submit UpdatePermission UserOperation.
    // Mirror canonical database.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            permission: {
                permissionId,

                ...body,

                updatedAt:
                    new Date().toISOString(),
            },

            userOperation: {
                id: "uop_mock",

                status: "PENDING",
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

    const { permissionId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Customer.
    // Submit RevokePermission UserOperation.
    // Mirror canonical database.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            permission: {
                permissionId,

                status: "REVOKED",

                revokedAt:
                    new Date().toISOString(),
            },

            userOperation: {
                id: "uop_mock",

                status: "PENDING",
            },
        },
        {
            status: 200,
        },
    );

}