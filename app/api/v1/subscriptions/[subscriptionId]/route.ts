// app/api/v1/subscriptions/[subscriptionId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        subscriptionId: string;
    }>;
}

interface UpdateSubscriptionRequest {

    permissionId?: string;

    status?:
        | "ACTIVE"
        | "PAUSED"
        | "CANCELLED";

}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { subscriptionId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate caller.
    // Lookup Subscription.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            subscription: {
                subscriptionId,

                customerId: "cus_mock",

                merchantId: "mch_mock",

                planId: "plan_mock",

                smartAccount:
                    "0x0000000000000000000000000000000000000000",

                permissionId: "perm_mock",

                status: "ACTIVE",

                nextBillingTime:
                    new Date().toISOString(),

                lastChargedAt: null,

                cancelledAt: null,

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

    const { subscriptionId } = await params;

    const body =
        (await request.json()) as UpdateSubscriptionRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate caller.
    // Update Subscription.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            subscription: {
                subscriptionId,

                permissionId:
                    body.permissionId ?? "perm_mock",

                status:
                    body.status ?? "ACTIVE",

                updatedAt:
                    new Date().toISOString(),
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

    const { subscriptionId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Cancel Subscription.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            subscription: {
                subscriptionId,

                status: "CANCELLED",

                cancelledAt:
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