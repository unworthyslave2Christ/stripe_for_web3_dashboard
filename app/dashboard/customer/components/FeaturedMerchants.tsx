"use client";

import type {

    Merchant,

} from "@/types/dashboard";

interface FeaturedMerchantsProps {

    merchants: Merchant[];

    onSelectMerchant: (

        merchant: Merchant,

    ) => void;

}

export default function FeaturedMerchants({

    merchants,

    onSelectMerchant,

}: FeaturedMerchantsProps) {

    if (

        merchants.length === 0

    ) {

        return (

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-10">

                <div className="text-center">

                    <div className="text-6xl">

                        ⭐

                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-white">

                        Featured Businesses

                    </h2>

                    <p className="mt-3 text-slate-400">

                        No featured merchants have been selected yet.

                    </p>

                </div>

            </section>

        );

    }

    return (

        <section className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-3xl font-bold text-white">

                        ⭐ Featured Subscription Businesses

                    </h2>

                    <p className="mt-2 text-slate-400">

                        Explore popular Web3 businesses powered by
                        Account Abstraction.

                    </p>

                </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {

                    merchants.map(

                        merchant => (

                            <button

                                key={merchant.merchantId}

                                type="button"

                                onClick={() =>

                                    onSelectMerchant(

                                        merchant,

                                    )

                                }

                                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-600"

                            >

                                <div className="h-28 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700" />

                                <div className="space-y-5 p-6">

                                    <div className="flex items-center justify-between">

                                        <h3 className="text-xl font-semibold text-white">

                                            {merchant.name}

                                        </h3>

                                        <span

                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${

                                                merchant.status ===

                                                "ACTIVE"

                                                    ? "bg-emerald-500/20 text-emerald-400"

                                                    : "bg-red-500/20 text-red-400"

                                            }`}

                                        >

                                            {merchant.status}

                                        </span>

                                    </div>

                                    <p className="line-clamp-2 text-sm text-slate-400">

                                        {

                                            merchant.metadataURI ||

                                            "Create recurring Web3 subscriptions with Stripe-like simplicity powered by Account Abstraction."

                                        }

                                    </p>

                                    <div className="flex items-center justify-between pt-2">

                                        <span className="text-xs uppercase tracking-widest text-slate-500">

                                            Merchant #

                                            {

                                                merchant.merchantId

                                            }

                                        </span>

                                        <span className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-cyan-500">

                                            View Plans →

                                        </span>

                                    </div>

                                </div>

                            </button>

                        ),

                    )

                }

            </div>

        </section>

    );

}