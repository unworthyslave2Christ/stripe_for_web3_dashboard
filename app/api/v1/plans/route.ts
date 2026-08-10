// app/api/v1/plans/route.ts

import {
    NextRequest,
    NextResponse,
} from "next/server";

import {
    supabase,
} from "../shared";

////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////

interface CreatePlanRequest {

    planId: number;

    merchantId: number;

    paymentToken: `0x${string}`;

    amount: string;

    billingIntervalSeconds: number;

    billingPeriodNamed?: string;

    trialPeriod: number;

    trialPeriodNamed?: string;

    maxSubscribers: number;

    allowRenewal: boolean;

    metadataURI: string;

    name: string;

    userOperationHash:
        `0x${string}`;

    transactionHash:
        `0x${string}` | null;
}

////////////////////////////////////////////////////////////
// POST
//
// Mirrors a successfully-created on-chain plan
// into the canonical backend database.
//
// The blockchain transaction is the source of truth.
// This endpoint only persists the mirror.
////////////////////////////////////////////////////////////

export async function POST(
    request: NextRequest,
) {

    const body =
        await request.json() as CreatePlanRequest;

    ////////////////////////////////////////////////////////////
    // VALIDATION
    ////////////////////////////////////////////////////////////

    if (
        body.planId === undefined ||
        body.merchantId === undefined ||
        !body.paymentToken ||
        !body.amount ||
        !body.name ||
        body.billingIntervalSeconds === undefined ||
        !body.userOperationHash
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "INVALID_REQUEST",

                    message:
                        "Missing required plan fields.",
                },
            },
            {
                status: 400,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // VERIFY MERCHANT EXISTS
    ////////////////////////////////////////////////////////////

    const {
        data: merchant,
        error: merchantError,
    } =
        await supabase
            .from("merchants")
            .select("merchant_id")
            .eq(
                "merchant_id",
                body.merchantId,
            )
            .maybeSingle();

    if (merchantError) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        merchantError.message,
                },
            },
            {
                status: 500,
            },
        );

    }

    
    if (!merchant) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "MERCHANT_NOT_FOUND",

                    message:
                        "Merchant not found.",
                },
            },
            {
                status: 404,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // CHECK WHETHER PLAN ALREADY EXISTS
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
                body.planId,
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

    ////////////////////////////////////////////////////////////
    // IDEMPOTENT MIRROR
    ////////////////////////////////////////////////////////////

    if (existingPlan) {

        return NextResponse.json(
            {
                success: true,

                plan:
                    existingPlan,
            },
            {
                status: 200,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // INSERT PLAN
    ////////////////////////////////////////////////////////////

    const now =
        new Date().toISOString();

    const {
        data: plan,
        error,
    } =
        await supabase
            .from("billing_plans")
            .insert({
                plan_id:
                    body.planId,

                merchant_id:
                    body.merchantId,

                payment_token:
                    body.paymentToken,

                amount:
                    body.amount,

                billing_interval_seconds:
                    body.billingIntervalSeconds,

                billing_period_named:
                    body.billingPeriodNamed ??
                    null,

                trial_period:
                    body.trialPeriod ??
                    0,

                trial_period_named:
                    body.trialPeriodNamed ??
                    null,

                max_subscribers:
                    body.maxSubscribers ??
                    0,

                allow_renewal:
                    body.allowRenewal ??
                    true,
                    
                name:
                    body.name,

                user_operation_hash:
                    body.userOperationHash,

                transaction_hash:
                    body.transactionHash ??
                    null,

                status:
                    "ACTIVE",

                created_at:
                    now,

                updated_at:
                    now,
            })
            .select("*")
            .single();
        
        
    if (error) {
        console.log("plan insertion error: ", error);
        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        error.message,
                },
            },
            {
                status: 500,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // RESULT
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            plan,
        },
        {
            status: 201,
        },
    );
}

////////////////////////////////////////////////////////////
// GET
//
// GET /api/v1/plans
// GET /api/v1/plans?merchantId=1
// GET /api/v1/plans?planId=1
////////////////////////////////////////////////////////////

export async function GET(
    request: NextRequest,
) {

    const {
        searchParams,
    } =
        new URL(request.url);

    const merchantId =
        searchParams.get(
            "merchantId",
        );

    const planId =
        searchParams.get(
            "planId",
        );

    ////////////////////////////////////////////////////////////
    // QUERY
    ////////////////////////////////////////////////////////////

    let query =
        supabase
            .from("billing_plans")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false,
                },
            );

    ////////////////////////////////////////////////////////////
    // FILTER BY MERCHANT
    ////////////////////////////////////////////////////////////

    if (merchantId) {

        const parsedMerchantId =
            Number(merchantId);

        if (
            !Number.isInteger(
                parsedMerchantId,
            )
        ) {

            return NextResponse.json(
                {
                    error:
                        "Invalid merchantId.",
                },
                {
                    status: 400,
                },
            );

        }

        query =
            query.eq(
                "merchant_id",
                parsedMerchantId,
            );

    }

    ////////////////////////////////////////////////////////////
    // FILTER BY PLAN
    ////////////////////////////////////////////////////////////

    if (planId) {

        const parsedPlanId =
            Number(planId);

        if (
            !Number.isInteger(
                parsedPlanId,
            )
        ) {

            return NextResponse.json(
                {
                    error:
                        "Invalid planId.",
                },
                {
                    status: 400,
                },
            );

        }

        query =
            query.eq(
                "plan_id",
                parsedPlanId,
            );

    }

    ////////////////////////////////////////////////////////////
    // EXECUTE
    ////////////////////////////////////////////////////////////

    const {
        data: plans,
        error,
    } =
        await query;

    if (error) {

        return NextResponse.json(
            {
                error:
                    error.message,
            },
            {
                status: 500,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // RESULT
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            plans:
                plans ?? [],

            pagination: {
                nextCursor:
                    null,

                hasMore:
                    false,
            },
        },
        {
            status: 200,
        },
    );
}


interface UpdatePlanRequest {

    merchantId: number;

    paymentToken: `0x${string}`;

    amount: string;

    billingIntervalSeconds: number;

    billingPeriodNamed?: string;

    trialPeriod: number;

    trialPeriodNamed?: string;

    maxSubscribers: number;

    allowRenewal: boolean;

    metadataURI: string;

    name: string;

    userOperationHash:
        `0x${string}`;

    transactionHash:
        `0x${string}` | null;
}

interface RouteContext {
    params: Promise<{
        planId: string;
    }>;
}

////////////////////////////////////////////////////////////
// PATCH
//
// Mirrors a successfully-updated on-chain plan
// into the canonical backend database.
//
// Blockchain remains the source of truth.
// This endpoint only updates the mirror.
////////////////////////////////////////////////////////////

export async function PATCH(
    request: NextRequest
) {

    const {
        searchParams,
    } =
        new URL(request.url);

    const planIdParam =
        searchParams.get(
            "planId",
        );


console.log("updatePlan request GRACIOUSLY arrived");

    
    const planId =
    Number(planIdParam);

    console.log("updatePlan request GRACIOUSLY arrived, planId: ", planId);

    ////////////////////////////////////////////////////////////
    // VALIDATE PLAN ID
    ////////////////////////////////////////////////////////////

    if (
        !Number.isInteger(planId)
    ) {

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
    // BODY
    ////////////////////////////////////////////////////////////

    const body: UpdatePlanRequest =
        await request.json();

    ////////////////////////////////////////////////////////////
    // VALIDATION
    ////////////////////////////////////////////////////////////

    if (
        body.merchantId === undefined ||
        !body.paymentToken ||
        !body.amount ||
        body.billingIntervalSeconds === undefined ||
        body.trialPeriod === undefined ||
        body.maxSubscribers === undefined ||
        body.allowRenewal === undefined ||
        !body.name ||
        !body.userOperationHash
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "INVALID_REQUEST",

                    message:
                        "Missing required plan fields.",
                },
            },
            {
                status: 400,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // VERIFY MERCHANT
    ////////////////////////////////////////////////////////////

    const {
        data: merchant,
        error: merchantError,
    } =
        await supabase
            .from("merchants")
            .select("merchant_id")
            .eq(
                "merchant_id",
                body.merchantId,
            )
            .maybeSingle();

    if (merchantError) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        merchantError.message,
                },
            },
            {
                status: 500,
            },
        );

    }

    if (!merchant) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "MERCHANT_NOT_FOUND",

                    message:
                        "Merchant not found.",
                },
            },
            {
                status: 404,
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
    // VERIFY PLAN BELONGS TO MERCHANT
    ////////////////////////////////////////////////////////////

    if (
        Number(existingPlan.merchant_id)
        !==
        Number(body.merchantId)
    ) {

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "PLAN_MERCHANT_MISMATCH",

                    message:
                        "Plan does not belong to the specified merchant.",
                },
            },
            {
                status: 403,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // UPDATE MIRROR
    ////////////////////////////////////////////////////////////

    const now =
        new Date().toISOString();

    const {
        data: plan,
        error,
    } =
        await supabase
            .from("billing_plans")
            .update({

                payment_token:
                    body.paymentToken,

                amount:
                    body.amount,

                billing_interval_seconds:
                    body.billingIntervalSeconds,

                billing_period_named:
                    body.billingPeriodNamed
                    ??
                    null,

                trial_period:
                    body.trialPeriod,

                trial_period_named:
                    body.trialPeriodNamed
                    ??
                    null,

                max_subscribers:
                    body.maxSubscribers,

                allow_renewal:
                    body.allowRenewal,

                name:
                    body.name,

                user_operation_hash:
                    body.userOperationHash,

                transaction_hash:
                    body.transactionHash
                    ??
                    null,

                updated_at:
                    now,

            })
            .eq(
                "plan_id",
                planId,
            )
            .select("*")
            .single();

    ////////////////////////////////////////////////////////////
    // DATABASE ERROR
    ////////////////////////////////////////////////////////////

    if (error) {

        console.log(
            "plan update error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,

                error: {
                    code:
                        "DATABASE_ERROR",

                    message:
                        error.message,
                },
            },
            {
                status: 500,
            },
        );

    }

    ////////////////////////////////////////////////////////////
    // RESULT
    ////////////////////////////////////////////////////////////

    return NextResponse.json(
        {
            success: true,

            plan,
        },
        {
            status: 200,
        },
    );
}