"use client";

import type {

    WalletBalance,

} from "@/services/customerDashboard";

interface WalletBalancesProps {

    balances: WalletBalance[];

}

export default function WalletBalances({

    balances,

}: WalletBalancesProps) {

    return (

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Wallet Balances

                    </h2>

                    <p className="mt-2 text-slate-400">

                        Subscription payments are funded directly from your
                        Smart Account.

                    </p>

                </div>

            </div>

            {

                balances.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center">

                        <div className="text-5xl">

                            💰

                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-white">

                            No Supported Tokens Found

                        </h3>

                        <p className="mt-2 text-slate-400">

                            Deposit supported payment tokens into your smart
                            account before subscribing.

                        </p>

                    </div>

                ) : (

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {

                            balances.map(

                                balance => (

                                    <div

                                        key={balance.token}

                                        className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-cyan-700"

                                    >

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <h3 className="text-xl font-semibold text-white">

                                                    {

                                                        balance.symbol

                                                    }

                                                </h3>

                                                <p className="mt-1 text-xs text-slate-500">

                                                    {

                                                        balance.token

                                                    }

                                                </p>

                                            </div>

                                            <div className="text-3xl">

                                                🪙

                                            </div>

                                        </div>

                                        <div className="mt-8">

                                            <p className="text-sm uppercase tracking-wider text-slate-500">

                                                Available

                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-cyan-400">

                                                {

                                                    balance.formatted

                                                }

                                            </p>

                                        </div>

                                    </div>

                                ),

                            )

                        }

                    </div>

                )

            }

        </section>

    );

}