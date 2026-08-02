"use client";

import { useState } from "react";

import { toast } from "sonner";

import {

    BillingPlan,

    Merchant,

} from "@/types/dashboard";

import {

    useCustomerDashboard,

} from "@/hooks/useCustomerDashboard";

import CustomerGreeting from "../components/CustomerGreeting";

import CustomerStats from "../components/CustomerStats";

import CustomerOverview from "../components/CustomerOverview";

import SearchBar from "../components/SearchBar";

import FeaturedMerchants from "../components/FeaturedMerchants";

import MerchantGrid from "../components/MerchantGrid";

import MerchantPlansDialog from "../components/MerchantPlansDialog";

import ActiveSubscriptions from "../components/ActiveSubscriptions";

export default function CustomerHomePage() {

    const {

        loading,

        subscribing,

        customer,

        dashboardStats,

        featuredMerchants,

        merchants,

        merchantPlans,

        subscriptions,

        walletBalances,

        selectedMerchant,

        setSelectedMerchant,

        search,

        setSearch,

        subscribeToPlan,

        refresh,

    } = useCustomerDashboard();

    /*
    --------------------------------------------------------------------------
    Dialog State
    --------------------------------------------------------------------------
    */

    const [

        dialogOpen,

        setDialogOpen,

    ] = useState(false);
        /*
    --------------------------------------------------------------------------
    Event Handlers
    --------------------------------------------------------------------------
    */

    function handleMerchantSelected(

        merchant: Merchant,

    ) {

        setSelectedMerchant(

            merchant,

        );

        setDialogOpen(

            true,

        );

    }

    function handleDialogClose() {

        setDialogOpen(

            false,

        );

        setSelectedMerchant(

            null,

        );

    }

    async function handleSubscribe(

        merchant: Merchant,

        plan: BillingPlan,

    ) {

        try {

            await subscribeToPlan(

                plan,

            );

            toast.success(

                "Subscription created successfully.",

                {

                    description:

                        `${merchant.name} • ${plan.name}`,

                },

            );

            setDialogOpen(

                false,

            );

            await refresh();

        }

        catch (

            error

        ) {

            console.error(

                error,

            );

            toast.error(

                "Unable to subscribe.",

                {

                    description:

                        error instanceof Error

                            ? error.message

                            : "Unknown error",

                },

            );

        }

    }

    /*
    --------------------------------------------------------------------------
    Selected Merchant Plans
    --------------------------------------------------------------------------
    */

    const selectedMerchantPlans =

        selectedMerchant

            ? merchantPlans[

                selectedMerchant.merchantId

            ] ?? []

            : [];

    /*
    --------------------------------------------------------------------------
    Wallet Balance Lookup
    --------------------------------------------------------------------------
    */

    const walletBalanceMap =

        Object.fromEntries(

            walletBalances.map(

                balance => [

                    balance.token.toLowerCase(),

                    balance.formatted,

                ],

            ),

        );

    /*
    --------------------------------------------------------------------------
    Loading
    --------------------------------------------------------------------------
    */

    if (

        loading

    ) {

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

            <SearchBar

                value={search}

                onChange={setSearch}

            />

            <FeaturedMerchants

                merchants={featuredMerchants}

                onSelectMerchant={

                    handleMerchantSelected

                }

            />

            <MerchantGrid

                merchants={merchants}

                selectedMerchant={

                    selectedMerchant

                }

                onSelectMerchant={

                    handleMerchantSelected

                }

            />

            <ActiveSubscriptions

                subscriptions={

                    subscriptions

                }

            />

            <MerchantPlansDialog

                open={

                    dialogOpen

                }

                merchant={

                    selectedMerchant

                }

                plans={

                    selectedMerchantPlans

                }

                loading={

                    subscribing

                }

                balances={

                    walletBalanceMap

                }

                onClose={

                    handleDialogClose

                }

                onSubscribe={

                    handleSubscribe

                }

            />

        </div>

    );

}