// app/api/merchant/[merchantId]/plans/route.ts

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

/* -------------------------------------------------------------------------- */
/* Supabase                                                                    */
/* -------------------------------------------------------------------------- */

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/* -------------------------------------------------------------------------- */
/* GET Merchant Plans                                                          */
/* -------------------------------------------------------------------------- */

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      merchantId: string;
    }>;
  },
) {
  try {
    const { merchantId } = await params;

    /*
        ----------------------------------------------------------------------
        Merchant
        ----------------------------------------------------------------------
        */

    const {
      data: merchant,

      error: merchantError,
    } = await supabase

      .from("merchants")

      .select("*")

      .eq("merchant_id", Number(merchantId))

      .single();

    if (merchantError || !merchant) {
      return NextResponse.json(
        {
          error: "Merchant not found.",
        },
        {
          status: 404,
        },
      );
    }

    /*
        ----------------------------------------------------------------------
        Billing Plans
        ----------------------------------------------------------------------
        */

    const {
      data: plans,

      error: plansError,
    } = await supabase

      .from("billing_plans")

      .select("*")

      .eq("merchant_id", Number(merchantId))

      .eq("status", "ACTIVE")

      .order("amount", {
        ascending: true,
      });

    if (plansError) {
      return NextResponse.json(
        {
          error: plansError.message,
        },
        {
          status: 500,
        },
      );
    }

    /*
        ----------------------------------------------------------------------
        Success
        ----------------------------------------------------------------------
        */

    return NextResponse.json(
      (plans ?? []).map((plan) => ({
        planId: plan.plan_id,

        merchantId: plan.merchant_id,

        merchantName: merchant.name,

        merchantMetadataURI: merchant.metadata_uri,

        merchantStatus: merchant.status,

        paymentToken: plan.payment_token,

        amount: plan.amount,

        billingIntervalSeconds: plan.billing_interval_seconds,

        name: plan.name,

        status: plan.status,

        trialPeriod: plan.trial_period,

        maxSubscribers: plan.max_subscribers,

        allowRenewal: plan.allow_renewal,

        subscriberCount: plan.subscriber_count,

        createdAt: plan.created_at,

        updatedAt: plan.updated_at,
      })),
    );
  } catch (error) {
    console.error(error);

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
