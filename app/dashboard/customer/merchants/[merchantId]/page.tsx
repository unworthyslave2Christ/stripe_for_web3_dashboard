// app/dashboard/customer/merchants/[merchantId]/page.tsx

"use client";

import { useMemo } from "react";

import { notFound, useParams } from "next/navigation";

import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";

import MerchantHeader from "../../components/MerchantHeader";
import MerchantPlans from "../../components/MerchantPlans";

export default function CustomerMerchantPage() {

    const params = useParams();

    const merchantId = Number(params.merchantId);

    const {

        loading,

        subscribing,

        merchants,

        merchantPlans,

        walletBalances,

        subscribeToPlan,

    } = useCustomerDashboard();

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
    Merchant
    --------------------------------------------------------------------------
    */

    const merchant = merchants.find(

        merchant => merchant.merchantId === merchantId,

    );

    if (!merchant) {

        notFound();

    }

    /*
    --------------------------------------------------------------------------
    Plans
    --------------------------------------------------------------------------
    */

    const plans = merchantPlans[merchantId] ?? [];

    /*
    --------------------------------------------------------------------------
    Wallet Balances
    --------------------------------------------------------------------------
    */

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
    Page
    --------------------------------------------------------------------------
    */

    return (

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">

            <MerchantHeader

                merchant={merchant}

            />

            <MerchantPlans

                merchant={merchant}

                plans={plans}

                balances={balances}

                loading={subscribing}

                onSubscribe={subscribeToPlan}

            />

        </div>

    );

}