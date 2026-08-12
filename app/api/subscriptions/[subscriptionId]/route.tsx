import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      subscriptionId: string;
    }>;
  },
) {
    const { subscriptionId } = await params;
    console.log("subscriptionId GRACIOUSLY received: ", subscriptionId);

  const { data, error } = await supabase

    .from("subscriptions")

    .select("*")

    .eq("subscription_id", Number(subscriptionId))

    .single();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },

      {
        status: 404,
      },
    );
  }

  return NextResponse.json(data);
}