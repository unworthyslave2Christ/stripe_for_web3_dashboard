// components/dashboard/RecentSubscriptions.tsx

"use client";

import Link from "next/link";

import {
    Receipt,
    ArrowRight,
    Users,
} from "lucide-react";

interface RecentSubscriptionsProps {
    subscriptions: any[];
}

export default function RecentSubscriptions({
    subscriptions,
}: RecentSubscriptionsProps) {

    return (

        <section className="mt-10">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-semibold">

                        Recent Subscriptions

                    </h2>

                    <p className="mt-1 text-slate-400">

                        Latest customer subscriptions.

                    </p>

                </div>

                <Link
                    href="/dashboard/subscriptions"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                    View All

                    <ArrowRight size={16} />

                </Link>

            </div>

            {subscriptions.length === 0 ? (

                <EmptyState />

            ) : (

                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                    <table className="w-full">

                        <thead className="border-b border-slate-800 bg-slate-950">

                            <tr>

                                <Header>
                                    Customer
                                </Header>

                                <Header>
                                    Plan
                                </Header>

                                <Header>
                                    Amount
                                </Header>

                                <Header>
                                    Next Billing
                                </Header>

                                <Header>
                                    Status
                                </Header>

                            </tr>

                        </thead>

                        <tbody>

                            {subscriptions.map(
                                (subscription) => (

                                    <tr
                                        key={
                                            subscription.subscription_id
                                        }
                                        className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40"
                                    >

                                        <Cell>

                                            <div>

                                                <div className="font-medium">

                                                    {
                                                        subscription
                                                            .customers
                                                            ?.display_name ??
                                                        "Unknown Customer"
                                                    }

                                                </div>

                                                <div className="font-mono text-xs text-slate-500">

                                                    {
                                                        subscription.customer_id
                                                    }

                                                </div>

                                            </div>

                                        </Cell>

                                        <Cell>

                                            {
                                                subscription
                                                    .billing_plans
                                                    ?.name
                                            }

                                        </Cell>

                                        <Cell>

                                            {
                                                subscription
                                                    .billing_plans
                                                    ?.amount
                                            }

                                        </Cell>

                                        <Cell>

                                            {new Date(
                                                subscription.next_billing_time,
                                            ).toLocaleString()}

                                        </Cell>

                                        <Cell>

                                            <StatusBadge
                                                status={
                                                    subscription.status
                                                }
                                            />

                                        </Cell>

                                    </tr>

                                ),
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </section>

    );

}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                 */
/* -------------------------------------------------------------------------- */

function EmptyState() {

    return (

        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 py-16">

            <div className="mx-auto flex max-w-sm flex-col items-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">

                    <Users size={30} />

                </div>

                <h3 className="mt-6 text-xl font-semibold">

                    No Active Subscriptions

                </h3>

                <p className="mt-3 text-sm text-slate-400">

                    Customer subscriptions will appear here once someone subscribes to one of your billing plans.

                </p>

            </div>

        </div>

    );

}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                                */
/* -------------------------------------------------------------------------- */

function StatusBadge({
    status,
}: {
    status: string;
}) {

    const colors: Record<string, string> = {

        ACTIVE:
            "bg-emerald-500/20 text-emerald-400",

        PAUSED:
            "bg-yellow-500/20 text-yellow-400",

        CANCELLED:
            "bg-red-500/20 text-red-400",

        EXPIRED:
            "bg-slate-500/20 text-slate-400",

    };

    return (

        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                colors[status] ??
                "bg-slate-700 text-slate-300"
            }`}
        >

            {status}

        </span>

    );

}

/* -------------------------------------------------------------------------- */
/* Table Helpers                                                               */
/* -------------------------------------------------------------------------- */

function Header({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">

            {children}

        </th>

    );

}

function Cell({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <td className="px-6 py-5 text-sm">

            {children}

        </td>

    );

}