import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId } = await request.json();

    const { error } = await supabase
      .from("subscriptions")
      .update({
        status: "CANCELLED",

        cancelled_at: new Date().toISOString(),
      })
      .eq("subscription_id", subscriptionId);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to cancel subscription.",
      },

      {
        status: 500,
      },
    );
  }
}
