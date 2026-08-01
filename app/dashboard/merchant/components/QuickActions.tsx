// dashboard/components/QuickActions.tsx

"use client";

interface QuickActionsProps {

    onCreatePlan: () => void;

    onViewPlans: () => void;

    onViewCustomers: () => void;

    onRefresh: () => void;

    refreshing?: boolean;

}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function QuickActions({

    onCreatePlan,

    onViewPlans,

    onViewCustomers,

    onRefresh,

    refreshing = false,

}: QuickActionsProps) {

    return (

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {/* ---------------------------------------------------------- */}
            {/* Create Plan                                                */}
            {/* ---------------------------------------------------------- */}

            <button

                onClick={onCreatePlan}

                className="rounded-xl border border-emerald-600 bg-emerald-600 p-5 text-left transition hover:bg-emerald-500"

            >

                <h3 className="text-lg font-semibold text-white">

                    Create Billing Plan

                </h3>

                <p className="mt-2 text-sm text-emerald-100">

                    Create a new subscription plan for your customers.

                </p>

            </button>

            {/* ---------------------------------------------------------- */}
            {/* View Plans                                                 */}
            {/* ---------------------------------------------------------- */}

            <button

                onClick={onViewPlans}

                className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-slate-700 hover:bg-slate-800"

            >

                <h3 className="text-lg font-semibold text-white">

                    Billing Plans

                </h3>

                <p className="mt-2 text-sm text-slate-400">

                    View and manage existing plans.

                </p>

            </button>

            {/* ---------------------------------------------------------- */}
            {/* Customers                                                  */}
            {/* ---------------------------------------------------------- */}

            <button

                onClick={onViewCustomers}

                className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-slate-700 hover:bg-slate-800"

            >

                <h3 className="text-lg font-semibold text-white">

                    Customers

                </h3>

                <p className="mt-2 text-sm text-slate-400">

                    View all subscribed customers.

                </p>

            </button>

            {/* ---------------------------------------------------------- */}
            {/* Refresh                                                    */}
            {/* ---------------------------------------------------------- */}

            <button

                onClick={onRefresh}

                disabled={refreshing}

                className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-slate-700 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"

            >

                <h3 className="text-lg font-semibold text-white">

                    {refreshing

                        ? "Refreshing..."

                        : "Refresh Dashboard"}

                </h3>

                <p className="mt-2 text-sm text-slate-400">

                    Reload the latest dashboard information.

                </p>

            </button>

        </section>

    );

}