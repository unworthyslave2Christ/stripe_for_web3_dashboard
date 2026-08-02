"use client";

import type {

    BillingPlan,

    Merchant,

} from "@/types/dashboard";

interface PlanCardProps {

    merchant: Merchant;

    plan: BillingPlan;

    walletBalance: string;

    onSubscribe: (

        merchant: Merchant,

        plan: BillingPlan,

    ) => void;

}

export default function PlanCard({

    merchant,

    plan,

    walletBalance,

    onSubscribe,

}: PlanCardProps) {

    const balance =

        Number(walletBalance);

    const amount =

        Number(plan.amount);

    const affordable =

        balance >= amount;

    function formatInterval(

        seconds: number,

    ) {

        if (seconds === 60)

            return "Every Minute";

        if (seconds === 3600)

            return "Hourly";

        if (seconds === 86400)

            return "Daily";

        if (seconds === 604800)

            return "Weekly";

        if (seconds === 2592000)

            return "Monthly";

        if (seconds === 31536000)

            return "Yearly";

        return `${seconds.toLocaleString()} seconds`;

    }

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-600">

            {/* ---------------------------------------------------------- */}
            {/* Header                                                     */}
            {/* ---------------------------------------------------------- */}

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-2xl font-bold text-white">

                        {plan.name}

                    </h3>

                    <p className="mt-1 text-sm text-slate-400">

                        {merchant.name}

                    </p>

                </div>

                <span

                    className={`rounded-full px-3 py-1 text-xs font-semibold ${

                        plan.status === "ACTIVE"

                            ? "bg-emerald-500/20 text-emerald-400"

                            : "bg-yellow-500/20 text-yellow-400"

                    }`}

                >

                    {plan.status}

                </span>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Amount                                                     */}
            {/* ---------------------------------------------------------- */}

            <div className="mt-8">

                <p className="text-sm uppercase tracking-wider text-slate-500">

                    Subscription Amount

                </p>

                <h2 className="mt-2 text-4xl font-bold text-cyan-400">

                    {plan.amount}

                </h2>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Details                                                    */}
            {/* ---------------------------------------------------------- */}

            <div className="mt-8 space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-5">

                <div className="flex justify-between">

                    <span className="text-slate-400">

                        Payment Token

                    </span>

                    <span className="font-mono text-sm text-white">

                        {plan.paymentToken}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-400">

                        Billing Interval

                    </span>

                    <span className="text-white">

                        {

                            formatInterval(

                                plan.billingIntervalSeconds,

                            )

                        }

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-400">

                        Trial Period

                    </span>

                    <span className="text-white">

                        {

                            plan.trialPeriod > 0

                                ? `${plan.trialPeriod} seconds`

                                : "None"

                        }

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-400">

                        Subscribers

                    </span>

                    <span className="text-white">

                        {

                            plan.subscriberCount

                        }

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-400">

                        Capacity

                    </span>

                    <span className="text-white">

                        {

                            plan.maxSubscribers ??

                            "Unlimited"

                        }

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-400">

                        Auto Renewal

                    </span>

                    <span

                        className={

                            plan.allowRenewal

                                ? "text-emerald-400"

                                : "text-red-400"

                        }

                    >

                        {

                            plan.allowRenewal

                                ? "Enabled"

                                : "Disabled"

                        }

                    </span>

                </div>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Wallet Balance                                             */}
            {/* ---------------------------------------------------------- */}

            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-5">

                <div className="flex items-center justify-between">

                    <span className="text-slate-400">

                        Your Balance

                    </span>

                    <span

                        className={

                            affordable

                                ? "font-semibold text-emerald-400"

                                : "font-semibold text-red-400"

                        }

                    >

                        {walletBalance}

                    </span>

                </div>

                <p className="mt-3 text-sm text-slate-500">

                    {

                        affordable

                            ? "Sufficient balance detected for recurring billing."

                            : "Insufficient balance for recurring billing."

                    }

                </p>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Subscribe                                                  */}
            {/* ---------------------------------------------------------- */}

            <button

                type="button"

                disabled={

                    !affordable ||

                    plan.status !== "ACTIVE"

                }

                onClick={() =>

                    onSubscribe(

                        merchant,

                        plan,

                    )

                }

                className={`mt-8 w-full rounded-xl px-6 py-3 text-lg font-semibold transition ${

                    affordable &&

                    plan.status === "ACTIVE"

                        ? "bg-cyan-600 text-white hover:bg-cyan-500"

                        : "cursor-not-allowed bg-slate-700 text-slate-400"

                }`}

            >

                {

                    affordable

                        ? "Subscribe"

                        : "Insufficient Balance"

                }

            </button>

        </div>

    );

}