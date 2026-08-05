import { NextRequest, NextResponse } from "next/server";

// import { pausePlan } from "@/lib/contracts/merchant";

pauseSubscription;

import { updatePlanStatus } from "@/lib/supabase/plans";
import { pauseSubscription } from "@/services/billingProtocol";

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { error: "Missing planId" },

        { status: 400 },
      );
    }

    await updatePlanStatus(planId, "PAUSED");

    return NextResponse.json({
      success: true,

      status: "PAUSED",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to pause plan.",
      },

      {
        status: 500,
      },
    );
  }
}
