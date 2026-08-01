// dashboard/components/RecentSubscriptions.tsx

"use client";

import { formatDistanceToNow } from "date-fns";

import type {

    Subscription,

} from "@/types/dashboard";

interface RecentSubscriptionsProps {

    subscriptions: Subscription[];

}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function RecentSubscriptions({

    subscriptions,

}: RecentSubscriptionsProps) {

    return (

        <section className="rounded-xl border border-slate-800 bg-slate-900">

            {/* ---------------------------------------------------------- */}
            {/* Header                                                     */}
            {/* ---------------------------------------------------------- */}

            <div className="border-b border-slate-800 px-6 py-4">

                <h2 className="text-lg font-semibold text-white">

                    Recent Subscriptions

                </h2>

                <p className="mt-1 text-sm text-slate-400">

                    Latest customer subscriptions.

                </p>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Empty State                                                */}
            {/* ---------------------------------------------------------- */}

            {subscriptions.length === 0 ? (

                <div className="py-16 text-center">

                    <p className="text-slate-400">

                        No subscriptions found.

                    </p>

                </div>

            ) : (

                <div className="divide-y divide-slate-800">

                    {subscriptions.map((subscription) => (

                        <div

                            key={subscription.subscriptionId}

                            className="flex items-center justify-between px-6 py-5 transition hover:bg-slate-800/40"

                        >

                            {/* -------------------------------------- */}
                            {/* Left                                   */}
                            {/* -------------------------------------- */}

                            <div>

                                <h3 className="font-semibold text-white">

                                    {subscription.customerName}

                                </h3>

                                <div className="mt-2 flex flex-wrap items-center gap-2">

                                    <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">

                                        Subscription #

                                        {subscription.subscriptionId}

                                    </span>

                                    <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">

                                        Plan #

                                        {subscription.planId}

                                    </span>

                                    <span

                                        className={`rounded px-2 py-1 text-xs font-medium ${

                                            subscription.status === "ACTIVE"

                                                ? "bg-emerald-500/20 text-emerald-400"

                                                : subscription.status === "PAUSED"

                                                    ? "bg-yellow-500/20 text-yellow-400"

                                                    : "bg-red-500/20 text-red-400"

                                        }`}

                                    >

                                        {subscription.status}

                                    </span>

                                </div>

                            </div>

                            {/* -------------------------------------- */}
                            {/* Right                                  */}
                            {/* -------------------------------------- */}

                            <div className="text-right">

                                <p className="text-sm text-slate-400">

                                    Next Billing

                                </p>

                                <p className="mt-1 font-medium text-white">

                                    {formatDistanceToNow(

                                        new Date(

                                            subscription.nextBillingTime,

                                        ),

                                        {

                                            addSuffix: true,

                                        },

                                    )}

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>

    );

}