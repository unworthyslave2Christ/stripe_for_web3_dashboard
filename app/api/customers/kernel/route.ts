// app/api/customer/kernel/route.ts

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { deserializePermissionAccount } from "@zerodev/permissions";

import { toPermissionValidator } from "@zerodev/permissions";

import { toECDSASigner } from "@zerodev/permissions/signers";

import { privateKeyToAccount } from "viem/accounts";

import { createPublicClient, http } from "viem";

import { arbitrumSepolia } from "viem/chains";

import { toSudoPolicy } from "@zerodev/permissions/policies";

import { entryPoint, kernelVersion } from "@/services/kernel.client";

import { decryptPrivateKey } from "@/utils/crypto";
import { walletClientToSmartAccountSigner } from "permissionless";

/* -------------------------------------------------------------------------- */
/* Supabase                                                                    */
/* -------------------------------------------------------------------------- */

const supabase = createClient(
  process.env.SUPABASE_URL!,

  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/* -------------------------------------------------------------------------- */
/* Public Client                                                               */
/* -------------------------------------------------------------------------- */

const publicClient = createPublicClient({
  chain: arbitrumSepolia,

  transport: http(process.env.RPC_URL),
});

/* -------------------------------------------------------------------------- */
/* POST                                                                        */
/* -------------------------------------------------------------------------- */

export async function POST(request: NextRequest) {
  try {
    const { wallet } = await request.json();

    if (!wallet) {
      return NextResponse.json(
        {
          error: "Wallet address required.",
        },

        {
          status: 400,
        },
      );
    }

    /*
        ----------------------------------------------------------------------
        Customer
        ----------------------------------------------------------------------
        */

    const {
      data: customer,

      error: customerError,
    } = await supabase

      .from("customers")

      .select("*")

      .eq(
        "wallet_address",

        wallet,
      )

      .single();

    if (customerError || !customer) {
      return NextResponse.json(
        {
          error: "Customer not found.",
        },

        {
          status: 404,
        },
      );
    }

    /*
        ----------------------------------------------------------------------
        Billing Permission
        ----------------------------------------------------------------------
        */

    const {
      data: permission,

      error: permissionError,
    } = await supabase

      .from("billing_permissions")

      .select("*")

      .eq(
        "customer_id",

        customer.customer_id,
      )

      .eq(
        "revoked",

        false,
      )

      .single();

    if (permissionError || !permission) {
      return NextResponse.json(
        {
          error: "Permission account not found.",
        },

        {
          status: 404,
        },
      );
    }

    /*
        ----------------------------------------------------------------------
        Recover Session
        ----------------------------------------------------------------------
        */

    const sessionPrivateKey = await decryptPrivateKey(
      permission.encrypted_session,
    );

    const sessionAccount = privateKeyToAccount(sessionPrivateKey);

    const sessionSigner = await toECDSASigner({
      signer: sessionAccount,
    });

    /*
        ----------------------------------------------------------------------
        Kernel
        ----------------------------------------------------------------------
        */

    const kernel = await deserializePermissionAccount(
        publicClient,
        entryPoint,
        kernelVersion,
        permission.serialized_permission_account,
        sessionSigner,
    );


    /*
        ----------------------------------------------------------------------
        Verify
        ----------------------------------------------------------------------
        */

    if (kernel.address.toLowerCase() !== customer.smart_account.toLowerCase()) {
      return NextResponse.json(
        {
          error: "Kernel verification failed.",
        },

        {
          status: 500,
        },
      );
    }

    /*
        ----------------------------------------------------------------------
        Success
        ----------------------------------------------------------------------
        */

    return NextResponse.json({
      customer,

      kernelAddress: kernel.address,

      serializedPermissionAccount: permission.serialized_permission_account,

      sessionPrivateKey: sessionPrivateKey,

      permissionId: permission.permission_id
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },

      {
        status: 500,
      },
    );
  }
}
