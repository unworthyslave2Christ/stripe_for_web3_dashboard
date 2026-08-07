// app/api/v1/plans/[planId]/resume/route.ts

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
  // Submit ResumePlan UserOperation.
  // Mirror canonical database.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      plan: {
        planId,

        status: "ACTIVE",

        resumedAt: new Date().toISOString(),
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
