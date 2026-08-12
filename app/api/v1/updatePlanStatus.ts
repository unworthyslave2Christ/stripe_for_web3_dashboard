import { supabase } from "./shared";


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
