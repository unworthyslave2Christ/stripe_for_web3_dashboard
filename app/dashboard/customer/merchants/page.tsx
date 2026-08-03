// app/dashboard/customer/merchants/page.tsx

"use client";

import { useRouter } from "next/navigation";

import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";

import { useEffect, useState } from "react";

import MerchantSelector from "../components/MerchantSelector";
import FeaturedMerchants from "../components/FeaturedMerchants";
import MerchantGrid from "../components/MerchantGrid";

export default function CustomerMerchantsPage() {

    const [selectedMerchantId, setSelectedMerchantId] =
    useState<number | null>(null);

    

    const router = useRouter();

    const {

        loading,

        featuredMerchants,

        merchants,

        selectedMerchant,

        setSelectedMerchant,

        search,

        setSearch,

    } = useCustomerDashboard();

    let filteredMerchants = selectedMerchantId === null
            ? merchants
            : merchants.filter(
                merchant =>
                    merchant.merchantId === selectedMerchantId,
            );
;

    useEffect(()=>{
        filteredMerchants =
        selectedMerchantId === null
            ? merchants
            : merchants.filter(
                merchant =>
                    merchant.merchantId === selectedMerchantId,
            );

    }, [selectedMerchantId])


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

                        Loading merchants...

                    </p>

                </div>

            </div>

        );

    }

    /*
    --------------------------------------------------------------------------
    Merchant Selection
    --------------------------------------------------------------------------
    */

    function handleMerchantSelected(merchant: typeof merchants[number]) {

        setSelectedMerchant(merchant);

        router.push(
            `/dashboard/customer/merchants/${merchant.merchantId}`,
        );

    }

    /*
    --------------------------------------------------------------------------
    Page
    --------------------------------------------------------------------------
    */

    return (

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">

            <div>

                <h1 className="text-4xl font-bold text-white">

                    Browse Subscription Businesses

                </h1>

                <p className="mt-3 max-w-3xl text-slate-400">

                    Explore verified Web3 merchants offering recurring
                    subscription services powered by Account Abstraction.
                    Select any merchant to view their plans and subscribe.

                </p>

            </div>

            <MerchantSelector

                merchants={merchants}

                selectedMerchantId={selectedMerchantId}

                onChange={setSelectedMerchantId}

            />

            <FeaturedMerchants

                merchants={featuredMerchants}

                onSelectMerchant={handleMerchantSelected}

            />

            <MerchantGrid

                merchants={filteredMerchants}

                selectedMerchant={selectedMerchant}

                onSelectMerchant={handleMerchantSelected}

            />

        </div>

    );

}