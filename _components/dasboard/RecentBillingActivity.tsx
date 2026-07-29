"use client";

import { formatDistanceToNow } from "date-fns";

interface BillingAttempt {
    id: number;
    subscription_id: number;
    billing_result: "SUCCESS" | "FAILED";
    attempted_at: string;
    amount: string;
    transaction_hash?: string | null;
}

interface RecentBillingActivityProps {
    attempts: BillingAttempt[];
    loading?: boolean;
}

export default function RecentBillingActivity({
    attempts,
    loading = false,
}: RecentBillingActivityProps) {
    if (loading) {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <div className="h-5 w-48 animate-pulse rounded bg-slate-800" />

                <div className="mt-6 space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-16 animate-pulse rounded-lg bg-slate-800"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">
                    Recent Billing Activity
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    Latest billing executions across all subscriptions
                </p>
            </div>

            {attempts.length === 0 ? (
                <div className="py-14 text-center">
                    <p className="text-slate-400">
                        No billing activity yet.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-slate-800">
                    {attempts.map((attempt) => (
                        <div
                            key={attempt.id}
                            className="flex items-center justify-between px-6 py-5 transition hover:bg-slate-800/40"
                        >
                            <div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                            attempt.billing_result === "SUCCESS"
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-red-500/20 text-red-400"
                                        }`}
                                    >
                                        {attempt.billing_result}
                                    </span>

                                    <span className="text-sm text-slate-300">
                                        Subscription #{attempt.subscription_id}
                                    </span>
                                </div>

                                <p className="mt-2 text-xs text-slate-500">
                                    {formatDistanceToNow(
                                        new Date(attempt.attempted_at),
                                        {
                                            addSuffix: true,
                                        },
                                    )}
                                </p>

                                {attempt.transaction_hash && (
                                    <p className="mt-2 truncate font-mono text-xs text-slate-500">
                                        {attempt.transaction_hash}
                                    </p>
                                )}
                            </div>

                            <div className="text-right">
                                <p className="font-semibold text-white">
                                    {attempt.amount}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}