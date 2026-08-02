"use client";

import type {

    Merchant,

} from "@/types/dashboard";

import MerchantCard from "./MerchantCard";

interface MerchantGridProps {

    merchants: Merchant[];

    selectedMerchant: Merchant | null;

    onSelectMerchant: (
        merchant: Merchant,
    ) => void;

}

export default function MerchantGrid({

    merchants,

    selectedMerchant,

    onSelectMerchant,

}: MerchantGridProps) {

    if (merchants.length === 0) {

        return (

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

                <div className="text-6xl">

                    🔍

                </div>

                <h2 className="mt-6 text-2xl font-bold text-white">

                    No merchants found

                </h2>

                <p className="mt-3 text-slate-400">

                    Try another search or check back later for new
                    subscription businesses.

                </p>

            </section>

        );

    }

    return (

        <section className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold text-white">

                    Browse Businesses

                </h2>

                <p className="mt-2 text-slate-400">

                    Select a merchant to explore their subscription plans.

                </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                {

                    merchants.map(

                        merchant => (

                            <MerchantCard

                                key={merchant.merchantId}

                                merchant={merchant}

                                selected={

                                    selectedMerchant?.merchantId ===

                                    merchant.merchantId

                                }

                                onSelect={

                                    onSelectMerchant

                                }

                            />

                        ),

                    )

                }

            </div>

        </section>

    );

}