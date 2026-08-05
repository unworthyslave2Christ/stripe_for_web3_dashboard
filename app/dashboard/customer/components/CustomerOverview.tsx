"use client";

import type {

    Customer,

} from "@/types/dashboard";

import type {

    WalletBalance,

} from "@/services/customerDashboard";
import WalletBalances from "./WalletBalanceCard";

interface CustomerOverviewProps {

    customer: Customer | null;

    walletBalances: WalletBalance[];

}

export default function CustomerOverview({

    customer,

    walletBalances,

}: CustomerOverviewProps) {

    return (

        <section className="grid gap-6 lg:grid-cols-2">

            {/* -------------------------------------------------------------- */}
            {/* Customer Information                                           */}
            {/* -------------------------------------------------------------- */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="mb-6 text-xl font-semibold text-white">

                    Customer Profile

                </h2>

                <div className="space-y-5">

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Display Name

                        </p>

                        <p className="mt-1 text-lg text-white">

                            {customer?.displayName ?? "-"}

                        </p>

                    </div>

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Email

                        </p>

                        <p className="mt-1 text-white">

                            {customer?.email ?? "-"}

                        </p>

                    </div>

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Wallet

                        </p>

                        <p className="mt-1 break-all font-mono text-sm text-cyan-400">

                            {customer?.walletAddress}

                        </p>

                    </div>

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Smart Account

                        </p>

                        <p className="mt-1 break-all font-mono text-sm text-cyan-400">

                            {customer?.smartAccount ?? "-"}

                        </p>

                    </div>

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Status

                        </p>

                        <span className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">

                            {customer?.status}

                        </span>

                    </div>

                </div>

            </div>

            {/* -------------------------------------------------------------- */}
            {/* Wallet Assets                                                  */}
            {/* -------------------------------------------------------------- */}

            <div className="space-y-4">

                <WalletBalances
                    balances={walletBalances!}
                />

                

            </div>

        </section>

    );

}