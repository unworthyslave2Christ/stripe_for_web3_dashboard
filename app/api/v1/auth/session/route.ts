// app/api/v1/auth/session/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  ////////////////////////////////////////////////////////////
  // TODO
  //
  // Validate session token.
  // Load authenticated Merchant.
  // Load session.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      authenticated: true,

      merchant: {
        merchantId: "mch_mock",

        ownerWallet: "0x0000000000000000000000000000000000000000",

        name: "Mock Merchant",
      },

      session: {
        sessionId: "sess_mock",

        accessToken: "access_mock",

        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    },
    {
      status: 200,
    },
  );
}
