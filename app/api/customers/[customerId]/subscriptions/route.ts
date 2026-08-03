// app/api/customer/[customerId]/subscriptions/route.ts

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

/* -------------------------------------------------------------------------- */
/* Supabase                                                                    */
/* -------------------------------------------------------------------------- */

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/* -------------------------------------------------------------------------- */
/* GET                                                                         */
/* -------------------------------------------------------------------------- */

export async function GET(
    request: NextRequest,
    {
        params,
    }: {
        params: Promise<{
            customerId: string;
        }>;
    },
) {
    try {

        const { customerId } = await params;

        /*
        ----------------------------------------------------------------------
        Verify Customer
        ----------------------------------------------------------------------
        */

        const {

            data: customer,

            error: customerError,

        } = await supabase

            .from("customers")

            .select("customer_id")

            .eq(
                "customer_id",
                customerId,
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
        Load Subscriptions
        ----------------------------------------------------------------------
        */

        const {

            data: subscriptions,

            error,

        } = await supabase

            .from("subscriptions")

            .select("*")

            .eq(
                "customer_id",
                customerId,
            )

            .order(
                "next_billing_time",
                {
                    ascending: true,
                },
            );

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

        /*
        ----------------------------------------------------------------------
        Empty
        ----------------------------------------------------------------------
        */

        if (!subscriptions?.length) {

            return NextResponse.json([]);

        }

        /*
        ----------------------------------------------------------------------
        Merchant IDs
        ----------------------------------------------------------------------
        */

        const merchantIds = [

            ...new Set(

                subscriptions.map(
                    subscription =>
                        subscription.merchant_id,
                ),

            ),

        ];

        /*
        ----------------------------------------------------------------------
        Plan IDs
        ----------------------------------------------------------------------
        */

        const planIds = [

            ...new Set(

                subscriptions.map(
                    subscription =>
                        subscription.plan_id,
                ),

            ),

        ];

        /*
        ----------------------------------------------------------------------
        Merchants
        ----------------------------------------------------------------------
        */

        const {

            data: merchants,

        } = await supabase

            .from("merchants")

            .select("*")

            .in(
                "merchant_id",
                merchantIds,
            );

        /*
        ----------------------------------------------------------------------
        Billing Plans
        ----------------------------------------------------------------------
        */

        const {

            data: plans,

        } = await supabase

            .from("billing_plans")

            .select("*")

            .in(
                "plan_id",
                planIds,
            );

        /*
        ----------------------------------------------------------------------
        Billing Permissions
        ----------------------------------------------------------------------
        */

        const {

            data: permissions,

        } = await supabase

            .from("billing_permissions")

            .select(
                "permission_id, revoked",
            )

            .eq(
                "customer_id",
                customerId,
            );

        /*
        ----------------------------------------------------------------------
        Lookup Maps
        ----------------------------------------------------------------------
        */

        const merchantMap =
            new Map(
                merchants?.map(
                    merchant => [

                        merchant.merchant_id,

                        merchant,

                    ],
                ) ?? [],
            );

        const planMap =
            new Map(
                plans?.map(
                    plan => [

                        plan.plan_id,

                        plan,

                    ],
                ) ?? [],
            );

        const permissionMap =
            new Map(
                permissions?.map(
                    permission => [

                        permission.permission_id,

                        permission,

                    ],
                ) ?? [],
            );

        /*
        ----------------------------------------------------------------------
        Aggregate
        ----------------------------------------------------------------------
        */

        const result =
            subscriptions.map(
                subscription => {

                    const merchant =
                        merchantMap.get(
                            subscription.merchant_id,
                        );

                    const plan =
                        planMap.get(
                            subscription.plan_id,
                        );

                    const permission =
                        permissionMap.get(
                            subscription.permission_id,
                        );

                    return {

                        subscriptionId:
                            subscription.subscription_id,

                        status:
                            subscription.status,

                        smartAccount:
                            subscription.smart_account,

                        createdAt:
                            subscription.created_at,

                        cancelledAt:
                            subscription.cancelled_at,

                        lastChargedAt:
                            subscription.last_charged_at,

                        nextBillingTime:
                            subscription.next_billing_time,

                        merchant: {

                            merchantId:
                                merchant?.merchant_id,

                            name:
                                merchant?.name,

                            metadataURI:
                                merchant?.metadata_uri,

                            payoutWallet:
                                merchant?.payout_wallet,

                            status:
                                merchant?.status,

                        },

                        plan: {

                            planId:
                                plan?.plan_id,

                            name:
                                plan?.name,

                            token:
                                plan?.payment_token,

                            amount:
                                plan?.amount,

                            billingInterval:
                                plan?.billing_interval,

                            maxPayments:
                                plan?.max_payments,

                            trialPeriod:
                                plan?.trial_period,

                            status:
                                plan?.status,

                        },

                        permission: {

                            permissionId:
                                subscription.permission_id,

                            revoked:
                                permission?.revoked ??
                                true,

                        },

                    };

                },
            );

        /*
        ----------------------------------------------------------------------
        Success
        ----------------------------------------------------------------------
        */

        return NextResponse.json(result);

    }

    catch (error) {

        console.error(error);

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