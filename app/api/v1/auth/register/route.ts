// app/api/v1/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RegisterRequest {
  wallet: `0x${string}`;

  signature: `0x${string}`;

  challenge: string;

  merchantName: string;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as RegisterRequest;

  ////////////////////////////////////////////////////////////
  // Validation
  ////////////////////////////////////////////////////////////

  if (
    !body.wallet ||
    !body.signature ||
    !body.challenge ||
    !body.merchantName
  ) {
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
  // Verify wallet signature.
  // Verify challenge nonce.
  // Check wallet is not already registered.
  // Create Merchant.
  // Generate API Keys.
  // Create Session.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      merchant: {
        merchantId: "mch_mock",

        ownerWallet: body.wallet,

        name: body.merchantName,
      },

      session: {
        sessionId: "sess_mock",

        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },

      apiKeys: {
        publishableKey: "pk_test_mock",

        secretKey: "sk_test_mock",
      },
    },
    {
      status: 201,
    },
  );
}
