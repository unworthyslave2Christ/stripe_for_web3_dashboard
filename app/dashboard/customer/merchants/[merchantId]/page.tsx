"use client";

import { useEffect, useMemo } from "react";

import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";

import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";

import MerchantHeader from "../../components/MerchantHeader";

import MerchantPlans from "../../components/MerchantPlans";

export default function CustomerMerchantPage() {

    const router = useRouter();

    const params = useParams();

    const merchantId = Number(params.merchantId);

    const {

        loading,

        subscribing,

        merchants,

        merchantPlans,

        walletBalances,

        subscribeToPlan,

        subscriptions

    } = useCustomerDashboard();

    const activePlanIds = useMemo(() => {

        return new Set(

            subscriptions
                .filter(subscription =>
                    subscription.status === "ACTIVE",
                )
                .map(subscription =>
                    subscription.plan.planId,
                ),

        );

    }, [subscriptions]);

    /*
    --------------------------------------------------------------------------
    Derived State
    --------------------------------------------------------------------------
    */

    const merchant =
        merchants.find(
            merchant =>
                merchant.merchantId === merchantId,
        );

    const plans =
        merchantPlans[merchantId] ?? [];

    const balances = useMemo(

        () =>

            Object.fromEntries(

                walletBalances.map(balance => [

                    balance.token.toLowerCase(),

                    balance.formatted,

                ]),

            ),

        [walletBalances],

    );

    /*
    --------------------------------------------------------------------------
    Merchant Redirect
    --------------------------------------------------------------------------
    */

    useEffect(() => {

        if (loading) return;

        if (merchant) return;

        toast.error(

            "Merchant not found.",

            {

                description:
                    "Redirecting back to merchants...",

            },

        );

        const timeout = setTimeout(() => {

            router.replace(

                "/dashboard/customer/merchants",

            );

        }, 2000);

        return () => clearTimeout(timeout);

    }, [

        loading,

        merchant,

        router,

    ]);

    /*
    --------------------------------------------------------------------------
    Loading
    --------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div className="flex min-h-[70vh] items-center justify-center">

                <div className="space-y-4 text-center">

                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

                    <p className="text-slate-400">

                        Loading merchant...

                    </p>

                </div>

            </div>

        );

    }

    /*
    --------------------------------------------------------------------------
    Merchant Missing
    --------------------------------------------------------------------------
    */

    if (!merchant) {

        return (

            <div className="flex min-h-[70vh] items-center justify-center">

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">

                    <h2 className="text-2xl font-semibold text-white">

                        Merchant Not Found

                    </h2>

                    <p className="mt-4 text-slate-400">

                        Redirecting you back to the merchants page...

                    </p>

                </div>

            </div>

        );

    }

    /*
    --------------------------------------------------------------------------
    Page
    --------------------------------------------------------------------------
    */

    return (

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">

            <MerchantHeader

                merchant={merchant}

                plans={plans}

            />

            <MerchantPlans

                merchant={merchant}

                plans={plans}

                balances={balances}

                loading={subscribing}

                onSubscribe={subscribeToPlan}

                activePlanIds={activePlanIds}

            />

        </div>

    );

}