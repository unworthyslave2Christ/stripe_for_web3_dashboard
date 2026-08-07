// app/api/v1/merchants/route.ts

import { NextRequest, NextResponse } from "next/server";

interface CreateMerchantRequest {
  name: string;

  metadataURI?: string;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateMerchantRequest;

  ////////////////////////////////////////////////////////////
  // Validation
  ////////////////////////////////////////////////////////////

  if (!body.name) {
    return NextResponse.json(
      {
        success: false,

        error: {
          code: "INVALID_REQUEST",

          message: "Merchant name is required.",
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
  // Authenticate Merchant Session.
  // Submit UserOperation.
  // Mirror canonical database.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      merchant: {
        merchantId: "mch_mock",

        name: body.name,

        metadataURI: body.metadataURI ?? "",

        ownerWallet: "0x0000000000000000000000000000000000000000",

        status: "ACTIVE",

        createdAt: new Date().toISOString(),
      },

      userOperation: {
        id: "uop_mock",

        status: "PENDING",
      },
    },
    {
      status: 201,
    },
  );
}

export async function GET(_request: NextRequest) {
  ////////////////////////////////////////////////////////////
  // TODO
  //
  // Return all Merchants belonging
  // to authenticated account.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      merchants: [],
    },
    {
      status: 200,
    },
  );
}
