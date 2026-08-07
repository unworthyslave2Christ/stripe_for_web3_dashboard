// app/api/v1/plans/[planId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        planId: string;
    }>;
}

interface UpdatePlanRequest {

    paymentToken?: `0x${string}`;

    amount?: string;

    billingIntervalSeconds?: number;

    trialPeriod?: number;

    maxSubscribers?: number;

    allowRenewal?: boolean;

    metadataURI?: string;

    name?: string;

}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { planId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate caller.
    // Lookup Plan.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            plan: {
                planId,

                merchantId: "mch_mock",

                paymentToken:
                    "0x0000000000000000000000000000000000000000",

                amount: "1000000",

                billingIntervalSeconds: 2592000,

                trialPeriod: 0,

                maxSubscribers: 0,

                allowRenewal: true,

                metadataURI: "",

                name: "Mock Plan",

                status: "ACTIVE",

                createdAt: new Date().toISOString(),

                updatedAt: new Date().toISOString(),
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

    const { planId } = await params;

    const body = (await request.json()) as UpdatePlanRequest;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Authenticate Merchant.
    // Submit UpdatePlan UserOperation.
    // Mirror update.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            plan: {
                planId,

                ...body,

                updatedAt: new Date().toISOString(),
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

    const { planId } = await params;

    ////////////////////////////////////////////////////////////
    // TODO
    //
    // Archive Plan.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            plan: {
                planId,

                status: "ARCHIVED",

                archivedAt: new Date().toISOString(),
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