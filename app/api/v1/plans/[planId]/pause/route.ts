// app/api/v1/plans/[planId]/pause/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    planId: string;
  }>;
}

export async function POST(_request: NextRequest, { params }: RouteContext) {
  const { planId } = await params;

  ////////////////////////////////////////////////////////////
  // TODO
  //
  // Authenticate Merchant.
  // Verify ownership.
  // Submit PausePlan UserOperation.
  // Mirror canonical database.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      plan: {
        planId,

        status: "PAUSED",

        pausedAt: new Date().toISOString(),
      },

      userOperation: {
        id: "uop_mock",

        status: "PENDING",
      },
    },
    {
      status: 200,
    },
  );
}
