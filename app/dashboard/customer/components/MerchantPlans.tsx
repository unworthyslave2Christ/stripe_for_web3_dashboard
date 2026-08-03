"use client";

import type {
    BillingPlan,
    Merchant,
} from "@/types/dashboard";

interface MerchantPlansProps {
    merchant: Merchant;

    plans: BillingPlan[];

    balances: Record<string, string>;

    loading?: boolean;

    onSubscribe: (
        plan: BillingPlan,
    ) => void;
}

export default function MerchantPlans({
    merchant,
    plans,
    balances,
    loading = false,
    onSubscribe,
}: MerchantPlansProps) {

    if (plans.length === 0) {

        return (

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-10">

                <h2 className="text-2xl font-bold text-white">

                    Subscription Plans

                </h2>

                <p className="mt-6 text-slate-400">

                    This merchant currently has no active subscription plans.

                </p>

            </section>

        );

    }

    return (

        <section className="space-y-8">

            <div>

                <h2 className="text-3xl font-bold text-white">

                    Subscription Plans

                </h2>

                <p className="mt-2 text-slate-400">

                    Select a billing plan to begin your subscription.

                </p>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                {

                    plans.map(plan => {

                        const balance =
                            balances[
                                plan.paymentToken.toLowerCase()
                            ] ?? "0";

                        return (

                            <div
                                key={plan.planId}
                                className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:border-cyan-600"
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h3 className="text-2xl font-semibold text-white">

                                            {plan.name}

                                        </h3>

                                        <p className="mt-2 text-sm text-slate-400">

                                            Plan #{plan.planId}

                                        </p>

                                    </div>

                                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">

                                        {plan.status}

                                    </span>

                                </div>

                                <div className="mt-8 grid gap-4 text-sm">

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">

                                            Amount

                                        </span>

                                        <span className="font-medium text-white">

                                            {plan.amount}

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">

                                            Billing Interval

                                        </span>

                                        <span className="font-medium text-white">

                                            {plan.billingIntervalSeconds} sec

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">

                                            Trial Period

                                        </span>

                                        <span className="font-medium text-white">

                                            {plan.trialPeriod} sec

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">

                                            Subscribers

                                        </span>

                                        <span className="font-medium text-white">

                                            {plan.subscriberCount}

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">

                                            Your Balance

                                        </span>

                                        <span className="font-medium text-cyan-400">

                                            {balance}

                                        </span>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() =>
                                        onSubscribe(
                                            plan,
                                        )
                                    }
                                    className="mt-8 w-full rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    {

                                        loading
                                            ? "Subscribing..."
                                            : "Subscribe"

                                    }

                                </button>

                            </div>

                        );

                    })

                }

            </div>

        </section>

    );

}