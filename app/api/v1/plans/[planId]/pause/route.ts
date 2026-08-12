import {
    NextRequest,
    NextResponse,
} from "next/server";

import {
    supabase,
} from "../../../shared";

import { PlanMirrorResponse, PlanRecord, PlanApiRecord, PlanApiResponse } from "../../../types";



interface RouteContext {
    params: Promise<{
        planId: string;
    }>;
}


export async function POST(
    _request: NextRequest,
    { params }: RouteContext,
) {
    const {
        planId: planIdParam,
    } = await params;

    const planId =
        Number(planIdParam);

    ////////////////////////////////////////////////////////////
    // VALIDATE PLAN ID
    ////////////////////////////////////////////////////////////

    if (!Number.isInteger(planId)) {
        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "INVALID_PLAN_ID",

                    message:
                        "Invalid planId.",
                },
            },
            {
                status: 400,
            },
        );
    }

    ////////////////////////////////////////////////////////////
    // GET EXISTING PLAN
    ////////////////////////////////////////////////////////////

    const {
        data: existingPlan,
        error: existingPlanError,
    } =
        await supabase
            .from("billing_plans")
            .select("*")
            .eq(
                "plan_id",
                planId,
            )
            .maybeSingle();

    if (existingPlanError) {
        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        existingPlanError.message,
                },
            },
            {
                status: 500,
            },
        );
    }

    if (!existingPlan) {
        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "PLAN_NOT_FOUND",

                    message:
                        "Plan not found.",
                },
            },
            {
                status: 404,
            },
        );
    }

    ////////////////////////////////////////////////////////////
    // UPDATE MIRROR STATUS
    ////////////////////////////////////////////////////////////

    const {
        data: updatedPlan,
        error: updateError,
    } =
        await supabase
            .from("billing_plans")
            .update({
                status: "PAUSED",

                updated_at:
                    new Date().toISOString(),
            })
            .eq(
                "plan_id",
                planId,
            )
            .select("*")
            .single();

    if (updateError) {
        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        updateError.message,
                },
            },
            {
                status: 500,
            },
        );
    }

    ////////////////////////////////////////////////////////////
    // NORMALIZE DATABASE RECORD
    ////////////////////////////////////////////////////////////

    const plan: PlanApiRecord = {
        planId:
            Number(
                updatedPlan.plan_id,
            ),

        merchantId:
            Number(
                updatedPlan.merchant_id,
            ),

        paymentToken:
            updatedPlan.payment_token,

        amount: 
            updatedPlan.amount.toString(),
            

        billingIntervalSeconds:
            Number(
                updatedPlan.billing_interval_seconds,
            ),

        billingPeriodNamed:
            updatedPlan.billing_period_named
                ?? undefined,

        trialPeriod:
            Number(
                updatedPlan.trial_period,
            ),

        trialPeriodNamed:
            updatedPlan.trial_period_named,

        name:
            updatedPlan.name,

        status:
            updatedPlan.status,

        maxSubscribers:
            Number(
                updatedPlan.max_subscribers,
            ),

        allowRenewal:
            Boolean(
                updatedPlan.allow_renewal,
            ),

        metadataURI:
            updatedPlan.metadata_uri
                ?? "",

        createdAt:
            new Date(
                updatedPlan.created_at,
            ),

        updatedAt:
            new Date(
                updatedPlan.updated_at,
            ),
    };

    ////////////////////////////////////////////////////////////
    // API RESPONSE
    ////////////////////////////////////////////////////////////

    const response: PlanApiResponse = {
        success: true,

        plan,
    };

    return NextResponse.json(
        response,
        {
            status: 200,
        },
    );
}