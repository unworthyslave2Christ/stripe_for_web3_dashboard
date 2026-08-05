import { NextRequest, NextResponse } from "next/server";

import { updatePlanStatus } from "@/lib/supabase/plans";

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { error: "Missing planId" },

        { status: 400 },
      );
    }

    await updatePlanStatus(planId, "ARCHIVED");

    return NextResponse.json({
      success: true,

      status: "ARCHIVED",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to archive plan.",
      },

      {
        status: 500,
      },
    );
  }
}
