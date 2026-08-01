// dashboard/components/RecentCustomers.tsx

"use client";

import { formatDistanceToNow } from "date-fns";

import type {

    Customer,

} from "@/types/dashboard";

interface RecentCustomersProps {

    customers: Customer[];

}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function RecentCustomers({

    customers,

}: RecentCustomersProps) {

    return (

        <section className="rounded-xl border border-slate-800 bg-slate-900">

            {/* ---------------------------------------------------------- */}
            {/* Header                                                     */}
            {/* ---------------------------------------------------------- */}

            <div className="border-b border-slate-800 px-6 py-4">

                <h2 className="text-lg font-semibold text-white">

                    Recent Customers

                </h2>

                <p className="mt-1 text-sm text-slate-400">

                    Latest customers registered on your billing platform.

                </p>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Empty State                                                */}
            {/* ---------------------------------------------------------- */}

            {customers.length === 0 ? (

                <div className="py-16 text-center">

                    <p className="text-slate-400">

                        No customers found.

                    </p>

                </div>

            ) : (

                <div className="divide-y divide-slate-800">

                    {customers.map((customer) => (

                        <div

                            key={customer.customerId}

                            className="flex items-center justify-between px-6 py-5 transition hover:bg-slate-800/40"

                        >

                            {/* -------------------------------------- */}
                            {/* Left                                   */}
                            {/* -------------------------------------- */}

                            <div>

                                <h3 className="font-semibold text-white">

                                    {

                                        customer.displayName

                                        ??

                                        "Unnamed Customer"

                                    }

                                </h3>

                                <p className="mt-1 text-sm text-slate-400">

                                    {

                                        customer.email

                                        ??

                                        "No email provided"

                                    }

                                </p>

                                <div className="mt-2 flex flex-wrap items-center gap-2">

                                    <span className="rounded bg-slate-800 px-2 py-1 font-mono text-xs text-slate-300">

                                        {customer.walletAddress}

                                    </span>

                                    <span

                                        className={`rounded px-2 py-1 text-xs font-medium ${

                                            customer.status === "ACTIVE"

                                                ? "bg-emerald-500/20 text-emerald-400"

                                                : "bg-red-500/20 text-red-400"

                                        }`}

                                    >

                                        {customer.status}

                                    </span>

                                </div>

                            </div>

                            {/* -------------------------------------- */}
                            {/* Right                                  */}
                            {/* -------------------------------------- */}

                            <div className="text-right">

                                <p className="text-sm text-slate-400">

                                    Joined

                                </p>

                                <p className="mt-1 font-medium text-white">

                                    {

                                        formatDistanceToNow(

                                            new Date(

                                                customer.createdAt,

                                            ),

                                            {

                                                addSuffix: true,

                                            },

                                        )

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