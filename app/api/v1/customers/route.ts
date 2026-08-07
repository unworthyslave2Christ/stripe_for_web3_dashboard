// app/api/v1/customers/route.ts

import { NextRequest, NextResponse } from "next/server";

interface CreateCustomerRequest {
  wallet: `0x${string}`;

  metadataURI?: string;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateCustomerRequest;

  ////////////////////////////////////////////////////////////
  // Validation
  ////////////////////////////////////////////////////////////

  if (!body.wallet) {
    return NextResponse.json(
      {
        success: false,

        error: {
          code: "INVALID_REQUEST",

          message: "Customer wallet is required.",
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
  // Authenticate Merchant.
  // Create Customer.
  // Mirror canonical database.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      customer: {
        customerId: "cus_mock",

        wallet: body.wallet,

        metadataURI: body.metadataURI ?? "",

        status: "ACTIVE",

        createdAt: new Date().toISOString(),
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
  // Return all Customers belonging
  // to authenticated Merchant.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      customers: [],
    },
    {
      status: 200,
    },
  );
}
