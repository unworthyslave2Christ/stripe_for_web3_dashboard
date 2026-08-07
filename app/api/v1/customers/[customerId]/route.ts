// app/api/v1/customers/[customerId]/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    customerId: string;
  }>;
}

interface UpdateCustomerRequest {
  metadataURI?: string;

  status?: "ACTIVE" | "PAUSED" | "ARCHIVED";
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { customerId } = await params;

  ////////////////////////////////////////////////////////////
  // TODO
  //
  // Authenticate Merchant.
  // Lookup Customer.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      customer: {
        customerId,

        wallet: "0x0000000000000000000000000000000000000000",

        metadataURI: "",

        status: "ACTIVE",

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
      },
    },
    {
      status: 200,
    },
  );
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { customerId } = await params;

  const body = (await request.json()) as UpdateCustomerRequest;

  ////////////////////////////////////////////////////////////
  // TODO
  //
  // Authenticate Merchant.
  // Update Customer.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      customer: {
        customerId,

        metadataURI: body.metadataURI ?? "",

        status: body.status ?? "ACTIVE",

        updatedAt: new Date().toISOString(),
      },
    },
    {
      status: 200,
    },
  );
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const { customerId } = await params;

  ////////////////////////////////////////////////////////////
  // TODO
  //
  // Archive Customer.
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    {
      success: true,

      customer: {
        customerId,

        status: "ARCHIVED",

        archivedAt: new Date().toISOString(),
      },
    },
    {
      status: 200,
    },
  );
}
