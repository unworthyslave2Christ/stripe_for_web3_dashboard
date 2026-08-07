// app/api/v1/plans/route.ts

import { NextRequest, NextResponse } from "next/server";

interface CreatePlanRequest {

    merchantId: string;

    name: string;

    paymentToken: `0x${string}`;

    amount: string;

    billingIntervalSeconds: number;

    trialPeriod?: number;

    maxSubscribers?: number;

    allowRenewal?: boolean;

    metadataURI?: string;

}

export async function POST(request: NextRequest) {

    const body = (await request.json()) as CreatePlanRequest;

    ////////////////////////////////////////////////////////////
    // Validation
    ////////////////////////////////////////////////////////////

    if (
        !body.merchantId ||
        !body.name ||
        !body.paymentToken ||
        !body.amount ||
        !body.billingIntervalSeconds
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code: "INVALID_REQUEST",

                    message: "Missing required plan fields.",
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
    // Authenticate Merchant.
    // Verify Merchant owns this operation.
    // Validate payment token.
    // Submit plan creation UserOperation.
    // Mirror Plan into canonical database.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            plan: {
                planId: "plan_mock",

                merchantId: body.merchantId,

                paymentToken: body.paymentToken,

                amount: body.amount,

                billingIntervalSeconds:
                    body.billingIntervalSeconds,

                trialPeriod:
                    body.trialPeriod ?? 0,

                maxSubscribers:
                    body.maxSubscribers ?? 0,

                allowRenewal:
                    body.allowRenewal ?? true,

                metadataURI:
                    body.metadataURI ?? "",

                name: body.name,

                status: "ACTIVE",

                createdAt:
                    new Date().toISOString(),

                updatedAt:
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
    // Determine Merchant scope.
    // Return Plans accessible to caller.
    // Apply pagination.
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

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