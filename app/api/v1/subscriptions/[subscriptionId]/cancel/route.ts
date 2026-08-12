// app/api/v1/subscriptions/[subscriptionId]/cancel/route.ts

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
// POST
////////////////////////////////////////////////////////////

export async function POST(
  request: NextRequest,
  context: {
    params: Promise<{
      subscriptionId: string;
    }>;
  },
) {
  try {
    ////////////////////////////////////////////////////////////
    // PARAMS
    ////////////////////////////////////////////////////////////

    const { subscriptionId: subscriptionIdParam } = await context.params;

    const subscriptionId = Number(subscriptionIdParam);

    ////////////////////////////////////////////////////////////
    // VALIDATE SUBSCRIPTION ID
    ////////////////////////////////////////////////////////////

    if (!Number.isInteger(subscriptionId) || subscriptionId <= 0) {
      return NextResponse.json(
        {
          error: "Invalid subscription ID.",
        },
        {
          status: 400,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // REQUEST BODY
    ////////////////////////////////////////////////////////////

    let body: {
      subscriptionId?: number;
      customerId?: string;
      status?: string;
    } = {};

    try {
      body = await request.json();
    } catch {
      // Body is optional.
    }

    ////////////////////////////////////////////////////////////
    // VERIFY BODY ID
    ////////////////////////////////////////////////////////////

    if (
      body.subscriptionId !== undefined &&
      Number(body.subscriptionId) !== subscriptionId
    ) {
      return NextResponse.json(
        {
          error: "Subscription ID in request body does not match the route.",
        },
        {
          status: 400,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // GET CURRENT SUBSCRIPTION
    ////////////////////////////////////////////////////////////

    const { data: subscription, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("subscription_id", subscriptionId)
      .maybeSingle();

    ////////////////////////////////////////////////////////////
    // DATABASE ERROR
    ////////////////////////////////////////////////////////////

    if (subscriptionError) {
      return NextResponse.json(
        {
          error: subscriptionError.message,
        },
        {
          status: 500,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // NOT FOUND
    ////////////////////////////////////////////////////////////

    if (!subscription) {
      return NextResponse.json(
        {
          error: `Subscription ${subscriptionId} not found.`,
        },
        {
          status: 404,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // VERIFY CUSTOMER
    ////////////////////////////////////////////////////////////

    if (
      body.customerId !== undefined &&
      body.customerId !== subscription.customer_id
    ) {
      return NextResponse.json(
        {
          error: "Subscription does not belong to the specified customer.",
        },
        {
          status: 403,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // CURRENT STATE
    ////////////////////////////////////////////////////////////

    if (subscription.status === "CANCELLED") {
      return NextResponse.json(
        {
          success: true,

          subscription,
        },
        {
          status: 200,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // UPDATE SUBSCRIPTION
    ////////////////////////////////////////////////////////////

    const { data: updatedSubscription, error: updateError } = await supabase
      .from("subscriptions")
      .update({
        status: "CANCELLED",

        cancelled_at: new Date().toISOString(),
      })
      .eq("subscription_id", subscriptionId)
      .select("*")
      .single();

    ////////////////////////////////////////////////////////////
    // UPDATE ERROR
    ////////////////////////////////////////////////////////////

    if (updateError) {
      console.error("Cancel subscription update error:", updateError);

      return NextResponse.json(
        {
          error: updateError.message,
        },
        {
          status: 500,
        },
      );
    }

    ////////////////////////////////////////////////////////////
    // SUCCESS
    ////////////////////////////////////////////////////////////

    return NextResponse.json({
      success: true,

      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error("Cancel subscription endpoint error:", error);

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
