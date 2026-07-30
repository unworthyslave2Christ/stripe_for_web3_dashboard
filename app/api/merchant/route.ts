// app/api/merchant/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/* -------------------------------------------------------------------------- */
/* GET                                                                         */
/* -------------------------------------------------------------------------- */

export async function GET(request: NextRequest) {

    const smartAccount =
        request.nextUrl.searchParams.get("smartAccount");

    const merchantId =
        request.nextUrl.searchParams.get("merchantId");

    let query =
        supabase
            .from("merchants")
            .select("*");

    if (smartAccount) {

        query =
            query.eq(
                "smart_account",
                smartAccount,
            );

    }

    else if (merchantId) {

        query =
            query.eq(
                "merchant_id",
                Number(merchantId),
            );

    }

    else {

        return NextResponse.json(

            {

                error:
                    "Provide smartAccount or merchantId.",

            },

            {

                status: 400,

            },

        );

    }

    const {

        data,

        error,

    } = await query.maybeSingle();

    if (error) {

        return NextResponse.json(

            {

                error:
                    error.message,

            },

            {

                status: 500,

            },

        );

    }

    if (!data) {

        return NextResponse.json(

            {

                error:
                    "Merchant not found.",

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

        const body =
            await request.json();

        const now =
            new Date().toISOString();

        const {

            error,

        } = await supabase

            .from("merchants")

            .upsert({

                merchant_id:
                    body.merchantId,

                smart_account:
                    body.smartAccount,

                payout_wallet:
                    body.payoutWallet,

                name:
                    body.name,

                metadata_uri:
                    body.metadataURI,

                status:
                    "ACTIVE",

                created_at:
                    now,

                updated_at:
                    now,

            });

        if (error) {

            return NextResponse.json(

                {

                    error:
                        error.message,

                },

                {

                    status: 500,

                },

            );

        }

        return NextResponse.json({

            success: true,

        });

    }

    catch (error) {

        return NextResponse.json(

            {

                error:

                    error instanceof Error

                        ? error.message

                        : "Unknown error",

            },

            {

                status: 500,

            },

        );

    }

}