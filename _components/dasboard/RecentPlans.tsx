// components/dashboard/RecentPlans.tsx

"use client";

import Link from "next/link";

import {
    CreditCard,
    Plus,
    ArrowRight,
} from "lucide-react";

interface RecentPlansProps {
    plans: any[];
}

export default function RecentPlans({
    plans,
}: RecentPlansProps) {

    return (

        <section className="mt-10">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-semibold">

                        Billing Plans

                    </h2>

                    <p className="mt-1 text-slate-400">

                        Your latest subscription plans.

                    </p>

                </div>

                <Link
                    href="/dashboard/plans"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                    View All

                    <ArrowRight
                        size={16}
                    />

                </Link>

            </div>

            {
                plans.length === 0 ? (

                    <EmptyState />

                ) : (

                    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                        <table className="w-full">

                            <thead className="border-b border-slate-800 bg-slate-950">

                                <tr>

                                    <Header>
                                        Plan
                                    </Header>

                                    <Header>
                                        Amount
                                    </Header>

                                    <Header>
                                        Billing Interval
                                    </Header>

                                    <Header>
                                        Subscribers
                                    </Header>

                                    <Header>
                                        Status
                                    </Header>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    plans.map(
                                        (
                                            plan,
                                        ) => (

                                            <tr
                                                key={
                                                    plan.plan_id
                                                }
                                                className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40"
                                            >

                                                <Cell>

                                                    <div>

                                                        <div className="font-medium">

                                                            {
                                                                plan.name
                                                            }

                                                        </div>

                                                        <div className="text-xs text-slate-500">

                                                            #
                                                            {
                                                                plan.plan_id
                                                            }

                                                        </div>

                                                    </div>

                                                </Cell>

                                                <Cell>

                                                    {
                                                        plan.amount
                                                    }

                                                </Cell>

                                                <Cell>

                                                    {
                                                        plan.billing_interval_seconds
                                                    }
                                                    s

                                                </Cell>

                                                <Cell>

                                                    {
                                                        plan.subscriber_count ??
                                                        0
                                                    }

                                                </Cell>

                                                <Cell>

                                                    <StatusBadge
                                                        status={
                                                            plan.status
                                                        }
                                                    />

                                                </Cell>

                                            </tr>

                                        ),
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                )
            }

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

                    <CreditCard
                        size={28}
                    />

                </div>

                <h3 className="mt-6 text-xl font-semibold">

                    No Billing Plans Yet

                </h3>

                <p className="mt-3 text-sm text-slate-400">

                    Create your first subscription plan and begin accepting recurring Web3 payments.

                </p>

                <Link
                    href="/dashboard/plans/new"
                    className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
                >

                    <Plus
                        size={18}
                    />

                    Create First Plan

                </Link>

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

    const active =
        status === "ACTIVE";

    return (

        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                active
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
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