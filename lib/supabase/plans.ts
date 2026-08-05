import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function updatePlanStatus(
  planId: number,

  status: "ACTIVE" | "PAUSED" | "ARCHIVED",
) {
  const { error } = await supabase

    .from("billing_plans")

    .update({
      status,

      updated_at: new Date().toISOString(),
    })

    .eq("plan_id", planId);

  if (error) {
    throw error;
  }
}
