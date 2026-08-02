// app/dashboard/customer/home/page.tsx

"use client";

import { useRouter } from "next/navigation";

import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";

import CustomerGreeting from "../components/CustomerGreeting";
import CustomerStats from "../components/CustomerStats";
import CustomerOverview from "../components/CustomerOverview";
import ActiveSubscriptions from "../components/ActiveSubscriptions";

export default function CustomerHomePage() {

    const router = useRouter();

    const {

        loading,

        customer,

        dashboardStats,

        subscriptions,

        walletBalances,

    } = useCustomerDashboard();

    /*
    --------------------------------------------------------------------------
    Loading
    --------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div className="flex min-h-[70vh] items-center justify-center">

                <div className="space-y-4 text-center">

                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

                    <p className="text-slate-400">

                        Loading customer dashboard...

                    </p>

                </div>

            </div>

        );

    }

    /*
    --------------------------------------------------------------------------
    Customer Dashboard
    --------------------------------------------------------------------------
    */

    return (

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">

            <CustomerGreeting
                customer={customer}
            />

            <CustomerStats
                stats={dashboardStats}
            />

            <CustomerOverview
                customer={customer}
                walletBalances={walletBalances}
            />

          
            <ActiveSubscriptions

                subscriptions={subscriptions}

                onBrowseMerchants = {() => {
                    router.push(
                        "/dashboard/customer/merchants",
                    )
                }}

            />

        </div>

    );

}