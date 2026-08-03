"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";


import PlansTable from "./components/PlansTable";

import type {

    BillingPlan,

} from "@/types/dashboard";
import { getMerchantByOwnerWallet } from "@/services/merchant";
import { BackButton } from "@/components/common/BackButton";
import { MerchantDashboardButton } from "@/components/common/MerchantDashboardButton";

export  default function PlansPage() {

    const router =
        useRouter();

    const {
        address: ownerWallet,
    } = useAccount();

    const [plans, setPlans] =
        useState<BillingPlan[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [merchantId, setMerchantId] =
        useState<number | null>(null);


    useEffect(() => {

        if (!ownerWallet)
            return;

        async function initialize() {

            setLoading(true);

            try {

                const merchant =
                    await getMerchantByOwnerWallet(
                        ownerWallet as `0x${string}`,
                    );

                setMerchantId(
                    merchant.merchant_id,
                );

                const response =
                    await fetch(

                        `/api/plans?merchantId=${merchant.merchant_id}`,

                        {

                            cache: "no-store",

                        },

                    );

                if (!response.ok) {

                    throw new Error(
                        "Unable to load plans.",
                    );

                }

                const data =
                    await response.json();

                setPlans(data);

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        }

        initialize();

    }, [ownerWallet]);

        return (

        <main className="mx-auto max-w-7xl space-y-8 p-6">

            {/* ------------------------------------------------------ */}
            {/* Header                                                 */}
            {/* ------------------------------------------------------ */}

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">

                        Billing Plans

                    </h1>

                    <p className="mt-2 text-slate-400">

                        Create, manage and monitor all
                        subscription plans offered by
                        your business.

                    </p>

                </div>

                <div className="flex items-stretch">

                    <button

                        onClick={() =>
                            router.push(
                                "/dashboard/merchant/plans/create",
                            )
                        }

                        className="rounded-lg  bg-cyan-600 px-6 py-3 font-medium text-white transition hover:bg-cyan-500"

                    >

                        + Create Plan

                    </button>

                    <MerchantDashboardButton />
                </div>


            </div>

                        {/* ------------------------------------------------------ */}
            {/* Plans Table                                             */}
            {/* ------------------------------------------------------ */}

            <section className="rounded-xl border border-slate-800 bg-slate-900">

                {loading ? (

                    <div className="flex items-center justify-center py-20">

                        <p className="text-slate-400">

                            Loading billing plans...

                        </p>

                    </div>

                ) : plans.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-20">

                        <h2 className="text-xl font-semibold text-white">

                            No Billing Plans

                        </h2>

                        <p className="mt-2 text-slate-400">

                            Create your first billing plan to begin
                            accepting subscriptions.

                        </p>

                        <button

                            onClick={() =>
                                router.push(
                                    "/dashboard/merchant/plans/create",
                                )
                            }

                            className="mt-6 rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-500"

                        >

                            Create First Plan

                        </button>

                    </div>

                ) : (

                    <PlansTable
                        plans={plans}
                    />

                )}

            </section>

        </main>

    );

}