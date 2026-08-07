// app/api/v1/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";

interface LoginRequest {
  wallet: `0x${string}`;

  signature: `0x${string}`;

  challenge: string;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LoginRequest;

  ////////////////////////////////////////////////////////////
  // Validation
  ////////////////////////////////////////////////////////////

  if (!body.wallet || !body.signature || !body.challenge) {
    return NextResponse.json(
      {
        success: false,

        error: {
          code: "INVALID_REQUEST",

          message: "Missing required fields.",
        },
      },
      {
        status: 400,
      },
    );
  }

  ////////////////////////////////////////////////////////////
  // TODO
  //
  // Verify challenge.
  // Verify signature.
  // Lookup Merchant.
  // Create session.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      merchant: {
        merchantId: "mch_mock",

        ownerWallet: body.wallet,
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
