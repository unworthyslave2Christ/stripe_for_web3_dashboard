"use client";

import Link from "next/link";
import { ArrowLeft, Store } from "lucide-react";

import type {
    Merchant,
    BillingPlan,
} from "@/types/dashboard";

interface MerchantHeaderProps {
    merchant: Merchant;

    plans: BillingPlan[];
}

export default function MerchantHeader({
    merchant,
    plans,
}: MerchantHeaderProps) {
    const activePlans =
        plans.filter(
            plan => plan.status === "ACTIVE",
        ).length;

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <div className="mb-8 flex items-center justify-between">

                <Link
                    href="/dashboard/customer/merchants"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-white"
                >
                    <ArrowLeft size={18} />
                    Back
                </Link>

                <span
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${
                        merchant.status === "ACTIVE"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                >
                    {merchant.status}
                </span>

            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-6">

                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500/10">

                        <Store
                            size={38}
                            className="text-cyan-400"
                        />

                    </div>

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            {merchant.name}
                        </h1>

                        <p className="mt-4 max-w-3xl text-slate-400">

                            {
                                merchant.metadataURI ||
                                "Recurring Web3 subscription business."
                            }

                        </p>

                    </div>

                </div>
{/* // TODO: To adjust BillingPlan interval from an arbitrary entry of seconds to a set of predefined intervals
// TODO: To move customer's wallet balances into each merchant plan's subscription card on [merchantId]/page.tsx --> Fulfilled
// TODO: Automatically logging in merchant or customer if wallet is conneted
// TODO: Provide back buttons and corresponding dashboard/home/page.tsx buttons on all(respective) pages */}
                <div className="grid grid-cols-2 gap-5">

                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

                        <p className="text-xs uppercase tracking-wider text-slate-500">
                            Active Plans
                        </p>

                        <p className="mt-2 text-3xl font-bold text-cyan-400">
                            {activePlans}
                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

                        <p className="text-xs uppercase tracking-wider text-slate-500">
                            Merchant ID
                        </p>

                        <p className="mt-2 text-xl font-semibold text-white">
                            #{merchant.merchantId}
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}