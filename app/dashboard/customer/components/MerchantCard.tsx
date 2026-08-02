"use client";

import type {

    Merchant,

} from "@/types/dashboard";

interface MerchantCardProps {

    merchant: Merchant;

    selected: boolean;

    onSelect: (
        merchant: Merchant,
    ) => void;

}

export default function MerchantCard({

    merchant,

    selected,

    onSelect,

}: MerchantCardProps) {

    return (

        <button

            type="button"

            onClick={() =>
                onSelect(
                    merchant,
                )
            }

            className={`overflow-hidden rounded-2xl border text-left transition-all duration-200 ${

                selected

                    ? "border-cyan-500 bg-cyan-500/10"

                    : "border-slate-800 bg-slate-900 hover:-translate-y-1 hover:border-cyan-600"

            }`}

        >

            <div className="h-28 bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-700" />

            <div className="p-6">

                <div className="flex items-center justify-between">

                    <h3 className="text-xl font-semibold text-white">

                        {merchant.name}

                    </h3>

                    <span

                        className={`rounded-full px-3 py-1 text-xs font-semibold ${

                            merchant.status === "ACTIVE"

                                ? "bg-emerald-500/20 text-emerald-400"

                                : "bg-red-500/20 text-red-400"

                        }`}

                    >

                        {merchant.status}

                    </span>

                </div>

                <p className="mt-4 line-clamp-2 text-sm text-slate-400">

                    {

                        merchant.metadataURI ||

                        "Recurring Web3 subscriptions powered by Account Abstraction."

                    }

                </p>

                <div className="mt-6 flex items-center justify-between">

                    <span className="text-xs uppercase tracking-widest text-slate-500">

                        Merchant #

                        {

                            merchant.merchantId

                        }

                    </span>

                    <span className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white">

                        View Plans →

                    </span>

                </div>

            </div>

        </button>

    );

}