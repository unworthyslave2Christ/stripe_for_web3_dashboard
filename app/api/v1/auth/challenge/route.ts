// app/api/v1/auth/challenge/route.ts

import { randomUUID } from "crypto";

import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  const nonce = randomUUID();

  const issuedAt = new Date().toISOString();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  return NextResponse.json(
    {
      success: true,

      challenge: {
        nonce,

        message: `Sign this message to authenticate with Stripe for Web3.\n\nNonce: ${nonce}`,

        issuedAt,

        expiresAt,
      },
    },
    {
      status: 200,
    },
  );
}
