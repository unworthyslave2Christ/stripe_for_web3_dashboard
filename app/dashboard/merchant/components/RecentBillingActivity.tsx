// dashboard/components/RecentBillingActivity.tsx

"use client";

import { formatDistanceToNow } from "date-fns";

import type {

    BillingAttempt,

} from "@/types/dashboard";

interface RecentBillingActivityProps {

    billingAttempts: BillingAttempt[];

}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function RecentBillingActivity({

    billingAttempts,

}: RecentBillingActivityProps) {

    return (

        <section className="rounded-xl border border-slate-800 bg-slate-900">

            {/* ---------------------------------------------------------- */}
            {/* Header                                                     */}
            {/* ---------------------------------------------------------- */}

            <div className="border-b border-slate-800 px-6 py-4">

                <h2 className="text-lg font-semibold text-white">

                    Recent Billing Activity

                </h2>

                <p className="mt-1 text-sm text-slate-400">

                    Latest billing execution attempts.

                </p>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Empty State                                                */}
            {/* ---------------------------------------------------------- */}

            {billingAttempts.length === 0 ? (

                <div className="py-16 text-center">

                    <p className="text-slate-400">

                        No billing attempts found.

                    </p>

                </div>

            ) : (

                <div className="divide-y divide-slate-800">

                    {billingAttempts.map((attempt) => (

                        <div

                            key={attempt.billingAttemptId}

                            className="flex items-center justify-between px-6 py-5 transition hover:bg-slate-800/40"

                        >

                            {/* -------------------------------------- */}
                            {/* Left                                   */}
                            {/* -------------------------------------- */}

                            <div>

                                <div className="flex flex-wrap items-center gap-2">

                                    <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">

                                        Attempt #

                                        {attempt.billingAttemptId}

                                    </span>

                                    <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">

                                        Subscription #

                                        {attempt.subscriptionId}

                                    </span>

                                    <span

                                        className={`rounded px-2 py-1 text-xs font-medium ${

                                            attempt.billingResult === "SUCCESS"

                                                ? "bg-emerald-500/20 text-emerald-400"

                                                : "bg-red-500/20 text-red-400"

                                        }`}

                                    >

                                        {attempt.billingResult}

                                    </span>

                                </div>

                                <p className="mt-3 text-xs text-slate-500">

                                    {

                                        formatDistanceToNow(

                                            new Date(

                                                attempt.attemptedAt,

                                            ),

                                            {

                                                addSuffix: true,

                                            },

                                        )

                                    }

                                </p>

                                {attempt.transactionHash && (

                                    <p className="mt-2 truncate font-mono text-xs text-slate-500">

                                        {attempt.transactionHash}

                                    </p>

                                )}

                                {/* {attempt?.failureReason && (

                                    <p className="mt-2 text-xs text-red-400">

                                        {attempt?.failureReason}

                                    </p>

                                )} */}

                            </div>

                            {/* -------------------------------------- */}
                            {/* Right                                  */}
                            {/* -------------------------------------- */}

                            <div className="text-right">

                                <p className="font-semibold text-white">

                                    {attempt.amount}

                                </p>

                                <p className="mt-1 text-xs text-slate-400">

                                    Fee: {attempt.protocolFee}

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>

    );

}