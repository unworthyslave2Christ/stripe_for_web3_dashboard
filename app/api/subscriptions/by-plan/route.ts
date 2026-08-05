
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);


export async function GET(request: NextRequest) {

    const planId = request.nextUrl.searchParams.get("planId");

    if (!planId) {

        return NextResponse.json(

            {
                error: "PlanId is required.",
            },

            {
                status: 400,
            },

        );

    }

    /*
    ----------------------------------------------------------
    Verify plan belongs to merchant
    ----------------------------------------------------------
    */

    const {

        data: plan,

        error: planError,

    } = await supabase

        .from("billing_plans")

        .select("plan_id")

        .eq("plan_id", Number(planId))

        .single();

    console.log("plan returned: ", plan)

    if (planError || !plan) {

        return NextResponse.json(

            {
                error: "Plan not found.",
            },

            {
                status: 404,
            },

        );

    }

    /*
    ----------------------------------------------------------
    Load subscriptions
    ----------------------------------------------------------
    */

    const {

        data,

        error,

    } = await supabase

        .from("subscriptions")

        .select(`
            subscription_id,
            customer_id,
            smart_account,
            status,
            next_billing_time,
            created_at
        `)

        .eq("plan_id", Number(planId))

        .order("created_at", {

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