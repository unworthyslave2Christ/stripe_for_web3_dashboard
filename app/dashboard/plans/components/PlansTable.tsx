"use client";

import Link from "next/link";

import type {

    BillingPlan,

} from "@/types/dashboard";

interface PlansTableProps {

    plans: BillingPlan[];

}

export default function PlansTable({

    plans,

}: PlansTableProps) {

    return (

        <div className="overflow-x-auto">

            <table className="min-w-full divide-y divide-slate-800">

                <thead className="bg-slate-950">

                    <tr>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">

                            Plan

                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">

                            Amount

                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">

                            Interval

                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">

                            Subscribers

                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">

                            Status

                        </th>

                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody className="divide-y divide-slate-800">

                                        {plans.map((plan) => (

                        <tr
                            key={plan.planId}
                            className="transition hover:bg-slate-800/40"
                        >

                            <td className="px-6 py-5">

                                <div>

                                    <p className="font-medium text-white">

                                        {plan.name}

                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">

                                        Plan #{plan.plan_id}

                                    </p>

                                </div>

                            </td>

                            <td className="px-6 py-5 text-sm text-white">

                                {plan.amount}

                            </td>

                            <td className="px-6 py-5 text-sm text-slate-300">

                                {plan.billing_interval_seconds}s

                            </td>

                            <td className="px-6 py-5 text-sm text-slate-300">

                                {plan.subscriber_count ?? 0}

                            </td>

                            <td className="px-6 py-5">

                                <span
                                    className={`rounded-md px-3 py-1 text-xs font-medium ${
                                        plan.status === "ACTIVE"
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : "bg-red-500/20 text-red-400"
                                    }`}
                                >

                                    {plan.status}

                                </span>

                            </td>

                            <td className="px-6 py-5 text-right">

                                                            <Link

                                    href={`/dashboard/plans/${plan.plan_id}`}

                                    className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400"

                                >

                                    View

                                </Link>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}