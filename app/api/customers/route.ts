import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";
import { encryptPrivateKey } from "@/utils/crypto";
import { privateKeyToAccount } from "viem/accounts";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/* -------------------------------------------------------------------------- */
/* GET                                                                         */
/* -------------------------------------------------------------------------- */

export async function GET(request: NextRequest) {
  const customerId = request.nextUrl.searchParams.get("customerId");

  const wallet = request.nextUrl.searchParams.get("wallet");

  const smartAccount = request.nextUrl.searchParams.get("smartAccount");

  let query = supabase.from("customers").select("*");

  if (customerId) {
    query = query.eq("customer_id", Number(customerId));
  } else if (wallet) {
    query = query.eq("wallet_address", wallet);
  } else if (smartAccount) {
    query = query.eq("smart_account", smartAccount);
  } else {
    const { data, error } = await query.order("created_at", {
      ascending: false,
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

    return NextResponse.json(data);
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
        error: "Customer not found.",
      },

      {
        status: 404,
      },
    );
  }

  return NextResponse.json(data);
}

/* -------------------------------------------------------------------------- */
/* POST                                                                        */
/* -------------------------------------------------------------------------- */

export async function POST(request: NextRequest) {

    try {

        const body = await request.json();

        const now = new Date().toISOString();

        /*
        -----------------------------------------------------------------------
        Encrypt session private key
        -----------------------------------------------------------------------
        */

    

        const encryptedSession =
            encryptPrivateKey(body.sessionPrivateKey);

        /*
        -----------------------------------------------------------------------
        Create customer
        -----------------------------------------------------------------------
        */

        const {

            data: customer,

            error: customerError,

        } = await supabase

            .from("customers")

            .insert({

                wallet_address:
                    body.wallet,

                smart_account:
                    body.smartAccount,

                display_name:
                    body.displayName,

                email:
                    body.email,

                status:
                    "ACTIVE",

                created_at:
                    now,

                updated_at:
                    now,

            })

            .select()

            .single();

        if (customerError)
            throw customerError;

        /*
        -----------------------------------------------------------------------
        Create billing permission
        -----------------------------------------------------------------------
        */

       const expiry = new Date(
           
            Date.now() +

            365 * 24 * 60 * 60 * 1000,
            
        ).toISOString();

        console.log("returned customer_id: ", customer.customer_id);
            
        const {

            data: permission,
            
            error: permissionError,
                
        } = await supabase

        .from("billing_permissions")
        
            .insert({
                
                customer_id:
                customer.customer_id,
                
                session_public_key:
                privateKeyToAccount(body.sessionPrivateKey),

                serialized_permission_account:
                body.serializedPermissionAccount,

                encrypted_session:
                    encryptedSession,
                    
                permission_expiry:
                expiry,
                    
                revoked:
                    false,
                    
                created_at:
                now,

                updated_at:
                now,

            })

            .select()

            .single();

            if (permissionError)
            throw permissionError;
        
        
        /*
        -----------------------------------------------------------------------
        Success
        -----------------------------------------------------------------------
        */

        return NextResponse.json({

            customer,

            permission,

        });

    }

    catch (error) {

        console.dir(error, { depth: null });

        throw error;
    }

}