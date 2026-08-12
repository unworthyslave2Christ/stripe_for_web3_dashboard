import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

////////////////////////////////////////////////////////////
// SUPABASE
////////////////////////////////////////////////////////////

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

////////////////////////////////////////////////////////////
// GET CUSTOMER SUBSCRIPTIONS
////////////////////////////////////////////////////////////

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      customerId: string;
    }>;
  },
) {
  try {
    ////////////////////////////////////////////////////////////
    // PARAMETER
    ////////////////////////////////////////////////////////////

    const { customerId } = await context.params;

    ////////////////////////////////////////////////////////////
    // VALIDATE CUSTOMER ID
    ////////////////////////////////////////////////////////////

    if (!customerId || typeof customerId !== "string") {
      return NextResponse.json(
        {
          error: "Invalid customer ID.",
        },
        {
          status: 400,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // VERIFY CUSTOMER EXISTS
    ////////////////////////////////////////////////////////////

    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("customer_id")
      .eq("customer_id", customerId)
      .maybeSingle();

    if (customerError) {
      return NextResponse.json(
        {
          error: customerError.message,
        },
        {
          status: 500,
        },
      );
    }

    if (!customer) {
      return NextResponse.json(
        {
          error: `Customer ${customerId} not found.`,
        },
        {
          status: 404,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // GET SUBSCRIPTIONS
    ////////////////////////////////////////////////////////////

    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", {
        ascending: false,
      });

    ////////////////////////////////////////////////////////////
    // DATABASE ERROR
    ////////////////////////////////////////////////////////////

    if (subscriptionsError) {
      return NextResponse.json(
        {
          error: subscriptionsError.message,
        },
        {
          status: 500,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // RESPONSE
    ////////////////////////////////////////////////////////////

    return NextResponse.json({
      subscriptions: (subscriptions ?? []).map((data) => ({
        subscriptionId: Number(data.subscription_id),

        customerId: data.customer_id,

        merchantId: Number(data.merchant_id),

        planId: Number(data.plan_id),

        smartAccount: data.smart_account,

        permissionId: data.permission_id,

        status: data.status,

        nextBillingTime: data.next_billing_time,

        lastChargedAt: data.last_charged_at,

        cancelledAt: data.cancelled_at,

        createdAt: data.created_at,

        transactionHash: data.transaction_hash,
      })),
    });
  } catch (error) {
    console.error("Get customer subscriptions error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error.",
      },
      {
        status: 500,
      },
    );
  }
}
