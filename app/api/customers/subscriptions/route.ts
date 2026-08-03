import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {

  const body = await request.json();

  const now = new Date().toISOString();


  const {
    subscriptionId, 

    customerId,

    merchantId,

    planId,

    smartAccount,

    permissionId,

    transactionHash,

    planBillingIntervalSeconds,
    
  } = body;

  console.log("permissionId: ", permissionId);

  const nextBillingTime = new Date(
    Date.now() + Number(planBillingIntervalSeconds) * 1000,
  );

  const {
    data,

    error,
  } = await supabase

    .from("subscriptions")

    .insert({
      subscription_id: subscriptionId,
      
      customer_id: customerId,

      merchant_id: merchantId,

      plan_id: planId,

      smart_account: smartAccount,

      permission_id: permissionId,

      transaction_hash: transactionHash,

      status: "ACTIVE",

      last_charged_at: null,

      cancelled_at: null,

      created_at: now,

      next_billing_time: nextBillingTime
    })

    .select()

    .single();

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
