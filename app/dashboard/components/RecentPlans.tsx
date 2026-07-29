// dashboard/components/RecentPlans.tsx

"use client";

import type {

    BillingPlan,

} from "@/types/dashboard";

interface RecentPlansProps {

    plans: BillingPlan[];

}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function RecentPlans({

    plans,

}: RecentPlansProps) {

    return (

        <section className="rounded-xl border border-slate-800 bg-slate-900">

            {/* ---------------------------------------------------------- */}
            {/* Header                                                     */}
            {/* ---------------------------------------------------------- */}

            <div className="border-b border-slate-800 px-6 py-4">

                <h2 className="text-lg font-semibold text-white">

                    Recent Billing Plans

                </h2>

                <p className="mt-1 text-sm text-slate-400">

                    Your most recently created subscription plans.

                </p>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Empty State                                                */}
            {/* ---------------------------------------------------------- */}

            {plans.length === 0 ? (

                <div className="py-16 text-center">

                    <p className="text-slate-400">

                        No billing plans have been created yet.

                    </p>

                </div>

            ) : (

                <div className="divide-y divide-slate-800">

                    {plans.map((plan) => (

                        <div

                            key={plan.planId}

                            className="flex items-center justify-between px-6 py-5 transition hover:bg-slate-800/40"

                        >

                            {/* -------------------------------------- */}
                            {/* Left                                   */}
                            {/* -------------------------------------- */}

                            <div>

                                <h3 className="font-semibold text-white">

                                    {plan.name}

                                </h3>

                                <div className="mt-2 flex flex-wrap items-center gap-2">

                                    <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">

                                        Plan #{plan.planId}

                                    </span>

                                    <span

                                        className={`rounded px-2 py-1 text-xs font-medium ${

                                            plan.status === "ACTIVE"

                                                ? "bg-emerald-500/20 text-emerald-400"

                                                : "bg-red-500/20 text-red-400"

                                        }`}

                                    >

                                        {plan.status}

                                    </span>

                                </div>

                            </div>

                            {/* -------------------------------------- */}
                            {/* Right                                  */}
                            {/* -------------------------------------- */}

                            <div className="text-right">

                                <p className="font-semibold text-white">

                                    {plan.amount}

                                </p>

                                <p className="mt-1 text-xs text-slate-400">

                                    {plan.subscriberCount} Subscriber{

                                        plan.subscriberCount === 1

                                            ? ""

                                            : "s"

                                    }

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>

    );

}