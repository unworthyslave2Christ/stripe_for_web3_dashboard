
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(request: NextRequest) {
  const planId = request.nextUrl.searchParams.get("planId");

   let query = supabase.from("billing_plans").select("*");

    if (planId) {
        query = query.eq("plan_id", Number(planId));

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
    
        return NextResponse.json(data)

    } else {
        return NextResponse.json(
            {
                error: "Provide planId.",
            },

            {
                status: 400,
            },
        );
    }

}