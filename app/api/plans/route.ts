// app/api/plans/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/* -------------------------------------------------------------------------- */
/* GET                                                                         */
/* -------------------------------------------------------------------------- */

export async function GET(request: NextRequest) {
  const merchantId = request.nextUrl.searchParams.get("merchantId");

  const planId = request.nextUrl.searchParams.get("planId");

  let query = supabase.from("billing_plans").select("*");

  if (planId) {
    query = query.eq("plan_id", Number(planId));
  } else if (merchantId) {
    query = query.eq("merchant_id", Number(merchantId));
  } else {
    return NextResponse.json(
      {
        error: "Provide merchantId or planId.",
      },

      {
        status: 400,
      },
    );
  }

  if (planId) {
    const {
      data,

      error,
    } = await query.single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },

        {
          status: 500,
        },
      );
    }

    return NextResponse.json(data);
  }

  const {
    data,

    error,
  } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },

      {
        status: 500,
      },
    );
  }

  return NextResponse.json(data);
}

/* -------------------------------------------------------------------------- */
/* POST                                                                        */
/* -------------------------------------------------------------------------- */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const now = new Date().toISOString();

    const { error } = await supabase

      .from("billing_plans")

      .upsert({
        plan_id: body.planId,

        merchant_id: body.merchantId,

        payment_token: body.paymentToken,

        amount: body.amount,

        billing_interval_seconds: body.billingIntervalSeconds,

        name: body.name,

        status: "ACTIVE",

        trial_period: body.trialPeriod ?? 0,

        max_subscribers: body.maxSubscribers,

        allow_renewal: true,

        created_at: now,

        updated_at: now,
      });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },

        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },

      {
        status: 500,
      },
    );
  }
}
