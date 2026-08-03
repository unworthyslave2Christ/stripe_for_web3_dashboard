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

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-3xl font-bold text-white">

                            Discover Subscription Businesses

                        </h2>

                        <p className="mt-3 max-w-2xl text-slate-400">

                            Browse verified Web3 businesses, explore their
                            subscription plans, and subscribe using your
                            Account Abstraction smart account.

                        </p>

                    </div>

                    <button

                        type="button"

                        onClick={() =>
                            router.push(
                                "/dashboard/customer/merchants",
                            )
                        }

                        className="rounded-xl bg-cyan-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-cyan-500"

                    >

                        Browse Merchants →

                    </button>

                </div>

            </section>

          
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