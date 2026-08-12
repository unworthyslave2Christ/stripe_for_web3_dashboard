import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../shared";


interface CreateMerchantRequest {
  merchantId: number;
  ownerWallet: `0x${string}`;
  smartAccount: `0x${string}`;
  payoutWallet: `0x${string}`;
  name: string;
  metadataURI?: string;
  billingOperator: `0x${string}`;
  registrationTransactionHash: `0x${string}`;
  approvalUserOperationHash: `0x${string}`;
}

export async function POST(request: NextRequest) {
  const body =
    (await request.json()) as CreateMerchantRequest;

    

  ////////////////////////////////////////////////////////////
  // VALIDATION
  ////////////////////////////////////////////////////////////

  if (
    body.merchantId === undefined ||
    body.merchantId === null
  ) {
    return NextResponse.json(
      {
        error: "merchantId is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.ownerWallet) {
    return NextResponse.json(
      {
        error: "ownerWallet is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.smartAccount) {
    return NextResponse.json(
      {
        error: "smartAccount is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.payoutWallet) {
    return NextResponse.json(
      {
        error: "payoutWallet is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.name) {
    return NextResponse.json(
      {
        error: "Merchant name is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.billingOperator) {
    return NextResponse.json(
      {
        error: "billingOperator is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.registrationTransactionHash) {
    return NextResponse.json(
      {
        error: "registrationTransactionHash is required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!body.approvalUserOperationHash) {
    return NextResponse.json(
      {
        error: "approvalUserOperationHash is required.",
      },
      {
        status: 400,
      },
    );
  }

  console.log("body: ", body);

  ////////////////////////////////////////////////////////////
  // INSERT CANONICAL MERCHANT MIRROR
  ////////////////////////////////////////////////////////////

  const now = new Date();

  const {
    data,
    error,
  } = await supabase
    .from("merchants")
    .insert({
      merchant_id: body.merchantId,

      owner_wallet: body.ownerWallet,

      smart_account: body.smartAccount,

      payout_wallet: body.payoutWallet,

      name: body.name,

      metadata_uri:
        body.metadataURI ?? "",

      billing_operator:
        body.billingOperator,

      registration_transaction_hash:
        body.registrationTransactionHash,

      approval_user_operation_hash:
        body.approvalUserOperationHash,

      status: "ACTIVE",

      created_at: now,

      updated_at: now
    })
    .select("*")
    .single();

  if (error) {
    console.log("error.message: ", error.message);
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }

  ////////////////////////////////////////////////////////////
  // RETURN ACTUAL DATABASE ROW
  ////////////////////////////////////////////////////////////

  return NextResponse.json(
    data,
    {
      status: 201,
    },
  );
}

////////////////////////////////////////////////////////////
// GET ALL MERCHANTS
////////////////////////////////////////////////////////////

export async function GET(
  _request: NextRequest,
) {
  const {
    data,
    error,
  } = await supabase
    .from("merchants")
    .select("*")
    .order("merchant_id", {
      ascending: true,
    });

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

  console.log("returned data: ", data);
  return NextResponse.json(data ?? []);
}