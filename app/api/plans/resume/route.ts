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

    await updatePlanStatus(planId, "ACTIVE");

    return NextResponse.json({
      success: true,

      status: "ACTIVE",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to activate plan.",
      },

      {
        status: 500,
      },
    );
  }
}
