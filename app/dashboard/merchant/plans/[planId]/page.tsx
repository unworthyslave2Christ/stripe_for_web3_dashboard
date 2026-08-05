"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import type {

    BillingPlan,

} from "@/types/dashboard";
import { BackButton } from "@/components/common/BackButton";
import { useCreatePlan } from "@/hooks/usePlans";
import { usePublicClient } from "wagmi";
import { erc20Abi } from "viem";






export default function BillingPlanPage() {
    const publicClient = usePublicClient();

    const router = useRouter();

    const {

        planId,

    } = useParams<{

        planId: string;

    }>();

    
    const {modifyPlan, loading: loading2, modificationSuccessful, getTokenMetadata} = useCreatePlan()
    

    const [plan, setPlan] =
    
    useState<BillingPlan | null>(null);

    const isActive = plan?.status === "ACTIVE";
    const isPaused = plan?.status === "PAUSED";
    const isArchived = plan?.status === "ARCHIVED";

    const [tokenInfo, setTokenInfo] =
            useState<{
                symbol: string;
                decimals: number;
            } | null>(null);

        useEffect(() => {

            if (!plan?.payment_token) return;

            getTokenMetadata(
                plan.payment_token as `0x${string}`,
            )
                .then(setTokenInfo)
                .catch(console.error);

        }, [plan]);

    const [loading, setLoading] =

        useState(true);

    async function loadPlan() {

        setLoading(true);

        console.log("Received planId: ", planId);

        try {

            const response =

                await fetch(

                    `/api/plans?planId=${planId}`,

                    {

                        cache: "no-store",

                    },

                );

            if (!response.ok) {

                throw new Error(

                    "Unable to load billing plan.",

                );

            }

            const data =

                await response.json();

            setPlan(data);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadPlan();

    }, [planId]);

        if (loading) {

        return (

            <main className="mx-auto flex max-w-7xl justify-center p-10">

                <p className="text-slate-400">

                    Loading billing plan...

                </p>

            </main>

        );

    }

    if (!plan) {

        return (

            <main className="mx-auto flex max-w-7xl justify-center p-10">

                <p className="text-red-400">

                    Billing plan not found.

                </p>

            </main>

        );

    }

    return (

        <main className="mx-auto max-w-7xl space-y-8 p-6">

            {/* ------------------------------------------------------ */}
            {/* Header                                                 */}
            {/* ------------------------------------------------------ */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">

                        {plan.name}

                    </h1>

                    <p className="mt-2 text-slate-400">

                        Billing Plan #{plan.plan_id}

                    </p>

                </div>

                <span

                    className={`rounded-md px-4 py-2 text-sm font-medium ${
                        plan.status === "ACTIVE"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                    }`}

                >

                    {plan.status}

                </span>

            </div>

                        {/* ------------------------------------------------------ */}
            {/* Plan Details                                            */}
            {/* ------------------------------------------------------ */}

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <p className="text-sm text-slate-400">

                        Amount

                    </p>

                    <p className="mt-2 text-2xl font-semibold text-white">

                        {plan.amount}

                    </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <p className="text-sm text-slate-400">

                        Billing Interval

                    </p>

                    <p className="mt-2 text-2xl font-semibold text-white">

                        {plan.billing_interval_seconds}s

                    </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                <p className="text-sm text-slate-400">
                    Payment Token
                </p>

                <div className="mt-2">

                    <p className="text-lg font-semibold text-white">

                        {tokenInfo?.symbol ?? "Loading..."}

                    </p>

                    <p className="text-sm text-slate-400">

                        {tokenInfo?.decimals ?? "--"} Decimals

                    </p>

                    <p className="mt-3 break-all font-mono text-xs text-cyan-400">

                        {plan.payment_token}

                    </p>

                </div>

            </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <p className="text-sm text-slate-400">

                        Trial Period

                    </p>

                    <p className="mt-2 text-xl font-semibold text-white">

                        {plan.trial_period}s

                    </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <p className="text-sm text-slate-400">

                        Maximum Subscribers

                    </p>

                    <p className="mt-2 text-xl font-semibold text-white">

                        {plan.max_subscribers ?? "Unlimited"}

                    </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <p className="text-sm text-slate-400">

                        Auto Renewal

                    </p>

                    <p className="mt-2 text-xl font-semibold text-emerald-400">

                        {plan.allow_renewal ? "Enabled" : "Disabled"}

                    </p>

                </div>

            </section>

                        {/* ------------------------------------------------------ */}
            {/* Actions                                                 */}
            {/* ------------------------------------------------------ */}

            <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="text-lg font-semibold text-white">

                    Plan Actions

                </h2>

                <p className="mt-2 text-sm text-slate-400">

                    Manage this billing plan and its subscriptions.

                </p>

                <div className="flex justify-between">

                    <div className="mt-6 flex flex-wrap gap-4">

                        <button

                            className="rounded-lg bg-cyan-600 px-5 py-3 font-medium text-white transition hover:bg-cyan-500"

                            onClick={() => {
                                router.push(`/dashboard/merchant/plans/${plan.plan_id}/edit`)
                            }}

                        >

                            Edit Plan

                        </button>

                        <button
                            disabled={!isActive || loading2}
                            className={`rounded-lg border px-5 py-3 font-medium transition
                                ${
                                    !isActive
                                        ? "cursor-not-allowed border-slate-700 text-slate-600"
                                        : "border-amber-600 text-amber-400 hover:bg-amber-600/10"
                                }`}
                            onClick={async () => 
                                {
                                    await modifyPlan(
                                        "pausePlan",
                                        1,
                                        "pause",
                                        plan
                                    )

                                    if(modificationSuccessful) {
                                        router.refresh()
    
                                        setPlan(prev =>
                                            prev
                                                ? {
                                                    ...prev,
                                                    status: "PAUSED",
                                                }
                                                : prev,
                                        );
                                    }

                                }
                            }
                        >
                            Pause Plan
                        </button>

                        <button
                            disabled={isArchived || loading2}
                            className={`rounded-lg border px-5 py-3 font-medium transition
                                ${
                                    isArchived
                                        ? "cursor-not-allowed border-slate-700 text-slate-600"
                                        : "border-red-600 text-red-400 hover:bg-red-600/10"
                                }`}
                    
                            onClick={async () => 
                                {
                                    await modifyPlan(
                                        "archivePlan",
                                        2,
                                        "archive",
                                        plan
                                    )

                                    if(modificationSuccessful) {
                                        router.refresh()
    
                                        setPlan(prev =>
                                            prev
                                                ? {
                                                    ...prev,
                                                    status: "PAUSED",
                                                }
                                                : prev,
                                        );
                                    }
                                }
                            }
                        >
                            Archive Plan
                        </button>

                        <button
                            disabled={!isPaused || loading2}
                            className={`rounded-lg border px-5 py-3 font-medium transition
                                ${
                                    !isPaused
                                        ? "cursor-not-allowed border-slate-700 text-slate-600"
                                        : "border-emerald-600 text-emerald-400 hover:bg-emerald-600/10"
                                }`}
                            

                            onClick={async () => 
                                {
                                     await modifyPlan(
                                        "activatePlan",
                                        0,
                                        "resume",
                                        plan
                                    )

                                    if(modificationSuccessful) {
                                        router.refresh()
    
                                        setPlan(prev =>
                                            prev
                                                ? {
                                                    ...prev,
                                                    status: "PAUSED",
                                                }
                                                : prev,
                                        );
                                    }
                                }
                            }
                        >
                            Resume Plan
                        </button>

                        <button

                            className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
                            onClick={ () => {router.push(`/dashboard/merchant/plans/${plan.plan_id}/subscribers`)}}
                        >

                            View Subscribers

                        </button>

                    </div>

                    <BackButton />

                </div>

            </section>

        </main>

    );

}