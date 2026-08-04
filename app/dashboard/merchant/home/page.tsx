// dashboard/page.tsx

"use client";

import DashboardSkeleton from "../components/DashboardSkeleton";

import MerchantHeader from "../components/MerchantHeader";
import StatsGrid from "../components/StatsGrid";
import QuickActions from "../components/QuickActions";
import RecentPlans from "../components/RecentPlans";
import RecentSubscriptions from "../components/RecentSubscriptions";
import RecentCustomers from "../components/RecentCustomers";
import RecentBillingActivity from "../components/RecentBillingActivity";
import WorkerStatus from "../components/WorkerStatus";
import { useRouter } from "next/navigation";

import { useDashboard } from "@/hooks/useDashboard";

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function DashboardPage() {

    const {

        loading,

        refreshing,

        error,

        refresh,

        registered,

        merchant,

        stats,

        plans,

        customers,

        subscriptions,

        billingAttempts,

        worker,

    } = useDashboard();

    /* ---------------------------------------------------------------------- */
    /* Loading                                                                 */
    /* ---------------------------------------------------------------------- */

    if (loading) {

        return (

            <main className="mx-auto max-w-7xl p-6">

                <DashboardSkeleton />

            </main>

        );

    }

    /* ---------------------------------------------------------------------- */
    /* Merchant Not Registered                                                 */
    /* ---------------------------------------------------------------------- */

    if (!registered) {

        return (

            <main className="mx-auto max-w-3xl p-6">

                <div className="rounded-xl border border-amber-700 bg-amber-950/40 p-10 text-center">

                    <h1 className="text-3xl font-bold text-white">

                        Merchant Account Not Found

                    </h1>

                    <p className="mt-4 text-slate-300">

                        Your connected smart account is not registered as a
                        merchant on the billing protocol.

                    </p>

                </div>

            </main>

        );

    }

    /* ---------------------------------------------------------------------- */
    /* Dashboard Error                                                         */
    /* ---------------------------------------------------------------------- */

    if (error) {

        return (

            <main className="mx-auto max-w-3xl p-6">

                <div className="rounded-xl border border-red-700 bg-red-950/40 p-10">

                    <h2 className="text-2xl font-bold text-white">

                        Unable to Load Dashboard

                    </h2>

                    <p className="mt-4 text-red-300">

                        {error}

                    </p>

                    <button

                        onClick={refresh}

                        disabled={refreshing}

                        className="mt-8 rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"

                    >

                        {refreshing

                            ? "Retrying..."

                            : "Retry"}

                    </button>

                </div>

            </main>

        );

    }

    /* ---------------------------------------------------------------------- */
    /* Safety                                                                  */
    /* ---------------------------------------------------------------------- */

    if (!merchant || !stats) {

        return null;

    }


    const router = useRouter();

    const handleCreatePlan = () => {

        router.push("/dashboard/merchant/plans/create");

    };

    const handleViewPlans = () => {

        router.push("/dashboard/merchant/plans");

    };

    const handleViewCustomers = () => {

        router.push("/dashboard/merchant/customers");

    };

    /* ---------------------------------------------------------------------- */
    /* Dashboard                                                               */
    /* ---------------------------------------------------------------------- */

    return (

        <main className="mx-auto max-w-7xl space-y-8 p-6">

            {/* ---------------------------------------------------------- */}
            {/* Merchant Header                                            */}
            {/* ---------------------------------------------------------- */}

            <MerchantHeader

                merchant={merchant}

                worker={worker!}

            />

            {/* ---------------------------------------------------------- */}
            {/* Statistics                                                 */}
            {/* ---------------------------------------------------------- */}

            <StatsGrid

                stats={stats}

            />

            {/* ---------------------------------------------------------- */}
            {/* Quick Actions                                              */}
            {/* ---------------------------------------------------------- */}

            <QuickActions

                onCreatePlan={handleCreatePlan}

                onViewPlans={handleViewPlans}

                onViewCustomers={handleViewCustomers}

                onRefresh={refresh}

                refreshing={refreshing}

            />

            {/* ---------------------------------------------------------- */}
            {/* Billing Plans                                              */}
            {/* ---------------------------------------------------------- */}

            <RecentPlans

                plans={plans}

            />
                        {/* ---------------------------------------------------------- */}
            {/* Recent Subscriptions                                       */}
            {/* ---------------------------------------------------------- */}

            <RecentSubscriptions

                subscriptions={subscriptions}

            />

            {/* ---------------------------------------------------------- */}
            {/* Bottom Dashboard Grid                                      */}
            {/* ---------------------------------------------------------- */}

            <div className="grid gap-8 xl:grid-cols-2">

                {/* -------------------------------------------------- */}
                {/* Customers                                          */}
                {/* -------------------------------------------------- */}

                <RecentCustomers

                    customers={customers}

                />

                {/* -------------------------------------------------- */}
                {/* Billing Activity                                   */}
                {/* -------------------------------------------------- */}

                <RecentBillingActivity

                    billingAttempts={billingAttempts}

                />

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Worker Status                                              */}
            {/* ---------------------------------------------------------- */}

            {worker && (

                <WorkerStatus

                    worker={worker}

                />

            )}
        </main>

    );

}