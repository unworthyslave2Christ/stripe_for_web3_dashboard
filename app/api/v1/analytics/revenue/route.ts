// app/api/v1/analytics/revenue/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const from = searchParams.get("from");

  const to = searchParams.get("to");

  ////////////////////////////////////////////////////////////
  // TODO
  //
  // Aggregate Revenue.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      range: {
        from,

        to,
      },

      revenue: {
        total: "0",

        successful: "0",

        failed: "0",

        refunded: "0",
      },

      timeline: [],
    },
    {
      status: 200,
    },
  );
}
