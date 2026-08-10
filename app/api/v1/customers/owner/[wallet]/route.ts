// app/api/v1/merchants/wallet/[wallet]/route.ts

import { NextRequest, NextResponse } from "next/server";

import { supabase } from "../../../shared";

interface RouteContext {
    params: Promise<{
        wallet: `0x${string}`;
    }>;
}

export async function GET(
    _request: NextRequest,
    { params }: RouteContext,
) {

    const { wallet } = await params;

    let query = supabase.from("customers").select("*");

    if (wallet) {
        query = query.eq("owner_wallet", wallet);
    } else {
        return NextResponse.json(
            {
                error: "Provide wallet address"
            },
            {
                status: 400
            }
        );
    }

  const {
    data,

    error,
  } = await query.maybeSingle();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },

      {
        status: 500,
      },
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        error: "Merchant not found.",
      },

      {
        status: 404,
      },
    );
  }

  return NextResponse.json(data);
}