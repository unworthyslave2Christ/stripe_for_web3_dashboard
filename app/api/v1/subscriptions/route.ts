// app/api/v1/subscriptions/route.ts

import { NextRequest, NextResponse } from "next/server";

import { supabase } from "../shared";

////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////

interface MirrorSubscriptionRequest {
  subscriptionId: number;

  customerId: string;

  merchantId: number;

  planId: number;

  planBillingIntervalSeconds: number;

  smartAccount: `0x${string}`;

  transactionHash: `0x${string}`;

  permissionId: string;
}

////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////

export async function POST(request: NextRequest) {
  try {
    ////////////////////////////////////////////////////////////
    // BODY
    ////////////////////////////////////////////////////////////

    const body: MirrorSubscriptionRequest = await request.json();

    ////////////////////////////////////////////////////////////
    // VALIDATION
    ////////////////////////////////////////////////////////////

    if (
      body.subscriptionId === undefined ||
      !Number.isInteger(Number(body.subscriptionId))
    ) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "INVALID_SUBSCRIPTION_ID",

            message: "Invalid subscriptionId.",
          },
        },
        {
          status: 400,
        },
      );
    }

    if (!body.customerId) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "INVALID_CUSTOMER_ID",

            message: "customerId is required.",
          },
        },
        {
          status: 400,
        },
      );
    }

    if (
      body.merchantId === undefined ||
      !Number.isInteger(Number(body.merchantId))
    ) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "INVALID_MERCHANT_ID",

            message: "Invalid merchantId.",
          },
        },
        {
          status: 400,
        },
      );
    }

    if (body.planId === undefined || !Number.isInteger(Number(body.planId))) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "INVALID_PLAN_ID",

            message: "Invalid planId.",
          },
        },
        {
          status: 400,
        },
      );
    }

    if (!body.smartAccount) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "INVALID_SMART_ACCOUNT",

            message: "smartAccount is required.",
          },
        },
        {
          status: 400,
        },
      );
    }

    if (!body.permissionId) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "INVALID_PERMISSION_ID",

            message: "permissionId is required.",
          },
        },
        {
          status: 400,
        },
      );
    }

    if (!body.transactionHash) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "INVALID_TRANSACTION_HASH",

            message: "transactionHash is required.",
          },
        },
        {
          status: 400,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // PLAN BILLING INTERVAL
    ////////////////////////////////////////////////////////////

    const billingInterval = Number(body.planBillingIntervalSeconds);

    if (!Number.isInteger(billingInterval) || billingInterval <= 0) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "INVALID_BILLING_INTERVAL",

            message: "planBillingIntervalSeconds must be a positive integer.",
          },
        },
        {
          status: 400,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // VERIFY CUSTOMER
    ////////////////////////////////////////////////////////////

    const { data: customer, error: customerError } = await supabase

      .from("customers")

      .select("customer_id, smart_account")

      .eq("customer_id", body.customerId)

      .maybeSingle();

    if (customerError) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "DATABASE_ERROR",

            message: customerError.message,
          },
        },
        {
          status: 500,
        },
      );
    }

    if (!customer) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "CUSTOMER_NOT_FOUND",

            message: "Customer not found.",
          },
        },
        {
          status: 404,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // VERIFY SMART ACCOUNT
    ////////////////////////////////////////////////////////////

    if (
      customer.smart_account &&
      customer.smart_account.toLowerCase() !== body.smartAccount.toLowerCase()
    ) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "SMART_ACCOUNT_MISMATCH",

            message: "Smart account does not belong to customer.",
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

    const { data: merchant, error: merchantError } = await supabase

      .from("merchants")

      .select("merchant_id")

      .eq("merchant_id", body.merchantId)

      .maybeSingle();

    if (merchantError) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "DATABASE_ERROR",

            message: merchantError.message,
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
            code: "MERCHANT_NOT_FOUND",

            message: "Merchant not found.",
          },
        },
        {
          status: 404,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // VERIFY PLAN
    ////////////////////////////////////////////////////////////

    const { data: plan, error: planError } = await supabase

      .from("billing_plans")

      .select(
        `
                    plan_id,
                    merchant_id,
                    billing_interval_seconds
                    `,
      )

      .eq("plan_id", body.planId)

      .maybeSingle();

    if (planError) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "DATABASE_ERROR",

            message: planError.message,
          },
        },
        {
          status: 500,
        },
      );
    }

    if (!plan) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "PLAN_NOT_FOUND",

            message: "Plan not found.",
          },
        },
        {
          status: 404,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // VERIFY PLAN / MERCHANT
    ////////////////////////////////////////////////////////////

    if (Number(plan.merchant_id) !== Number(body.merchantId)) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "PLAN_MERCHANT_MISMATCH",

            message: "Plan does not belong to merchant.",
          },
        },
        {
          status: 403,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // VERIFY BILLING INTERVAL
    //
    // The client sends the interval from PlanRecord,
    // but the backend also has the canonical plan mirror.
    //
    // Do not blindly trust the client-provided interval.
    ////////////////////////////////////////////////////////////

    const canonicalBillingInterval = Number(plan.billing_interval_seconds);

    if (canonicalBillingInterval !== billingInterval) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "BILLING_INTERVAL_MISMATCH",

            message:
              "Provided billing interval does not match the canonical plan.",
          },
        },
        {
          status: 400,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // CHECK EXISTING SUBSCRIPTION
    ////////////////////////////////////////////////////////////

    const { data: existingSubscription, error: existingSubscriptionError } =
      await supabase

        .from("subscriptions")

        .select("*")

        .eq("subscription_id", Number(body.subscriptionId))

        .maybeSingle();

    if (existingSubscriptionError) {
      return NextResponse.json(
        {
          success: false,

          error: {
            code: "DATABASE_ERROR",

            message: existingSubscriptionError.message,
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

    if (existingSubscription) {
      return NextResponse.json(
        {
          success: true,

          subscription: existingSubscription,
        },
        {
          status: 200,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // SUBSCRIPTION TIME
    ////////////////////////////////////////////////////////////

    const now = new Date();

    ////////////////////////////////////////////////////////////
    // NEXT BILLING TIME
    //
    // The billing interval comes directly from the plan.
    //
    // Example:
    //
    // FIVE_MINUTES = 300 seconds
    //
    // nextBillingTime =
    //     now + 300 seconds
    //
    ////////////////////////////////////////////////////////////

    const nextBillingTime = new Date(
      now.getTime() + canonicalBillingInterval * 1000,
    );

    ////////////////////////////////////////////////////////////
    // INSERT SUBSCRIPTION
    ////////////////////////////////////////////////////////////

    const { data: subscription, error: subscriptionError } = await supabase

      .from("subscriptions")

      .insert({
        subscription_id: Number(body.subscriptionId),

        merchant_id: Number(body.merchantId),

        plan_id: Number(body.planId),

        customer_id: body.customerId,

        smart_account: body.smartAccount,

        permission_id: body.permissionId.toString(),

        status: "ACTIVE",

        next_billing_time: nextBillingTime.toISOString(),

        last_charged_at: null,

        cancelled_at: null,

        created_at: now.toISOString(),

        transaction_hash: body.transactionHash,
      })

      .select("*")

      .single();

    if (subscriptionError) {
      console.error("Subscription insertion error:", subscriptionError);

      return NextResponse.json(
        {
          success: false,

          error: {
            code: "DATABASE_ERROR",

            message: subscriptionError.message,
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

        subscription,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Subscription mirror error:", error);

    return NextResponse.json(
      {
        success: false,

        error: {
          code: "INTERNAL_ERROR",

          message:
            error instanceof Error
              ? error.message
              : "Unable to mirror subscription.",
        },
      },
      {
        status: 500,
      },
    );
  }
}
