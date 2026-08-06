// BY GOD'S GRACE ALONE

"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";

import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { getSubscription, SubscriptionRecord } from "@/services/subscription";
import { Subscription } from "@/types/dashboard";
import { CustomerDashboardButton } from "@/components/common/CustomerDashboardButton";

export default function SubscriptionPage() {


    const router = useRouter();

    const params = useParams();

    const subscriptionId =
        Number(params.subscriptionId);

    // console.log("subscriptionId: ", subscriptionId)

    const [subscription, setSubscription] =
        useState<SubscriptionRecord>();

    const [loading, setLoading] =
    
            useState(true);


    useEffect(() => {

        async function load() {
            setLoading(true)

            const s = await getSubscription(subscriptionId);

            setSubscription(s!);

            // console.log("subscription@subscriptionPage: ", subscription);

            setLoading(false)

            console.log("Found subscription:", s);
        }

        load();

    }, [subscriptionId]);


    const {
    modifySubscription,
        loading2,
        modificationSuccessful
    } = useSubscriptions();

    
        

    // useEffect(() => {

    //     if (loading) return;

    //     if (subscription) return;

    //     toast.error(
    //         "Subscription not found.",
    //     );

    //     router.replace(
    //         "/dashboard/customer/home",
    //     );

    // }, [

    //     loading,

    //     subscription,

    //     router,

    // ]);

    if (loading ) {

        return (

            <div className="flex min-h-[70vh] items-center justify-center">

                <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

            </div>

        );

    }

    if (!subscription) {

        return null;

    }

    const isActive = subscription!.status === "ACTIVE";

    const isPaused = subscription!.status === "PAUSED";

    const isCancelled = subscription!.status === "CANCELLED";

    console.log("subscription: ", subscription);

    return (

        <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">

            {/* ------------------------------------------------------ */}
            {/* Header */}
            {/* ------------------------------------------------------ */}

            <section className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">

                        Manage Subscription

                    </h1>

                    <p className="mt-2 text-slate-400">

                        Manage your recurring billing subscription.

                    </p>

                </div>

                <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                        subscription.status === "ACTIVE"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : subscription.status === "PAUSED"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                >

                    {subscription.status}

                </span>

            </section>

            {/* ------------------------------------------------------ */}
            {/* Details */}
            {/* ------------------------------------------------------ */}

            <section className="grid gap-8 lg:grid-cols-2">

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <h2 className="mb-6 text-xl font-semibold text-white">

                        Subscription Details

                    </h2>

                    <div className="space-y-6">

                        <div>

                            <p className="text-sm text-slate-500">

                                Subscription ID

                            </p>

                            <p className="mt-1 text-lg font-semibold text-white">

                                #{subscription.subscription_id}

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">

                                Smart Account

                            </p>

                            <p className="mt-1 break-all font-mono text-cyan-400">

                                {subscription.smart_account}

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">

                                Next Billing

                            </p>

                            <p className="mt-1 text-white">

                                {new Date(
                                    subscription.next_billing_time,
                                ).toLocaleString()}

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-slate-500">

                                Last Charged

                            </p>

                            <p className="mt-1 text-white">

                                {subscription.last_charged_at
                                    ? new Date(
                                          subscription.last_charged_at,
                                      ).toLocaleString()
                                    : "Never"}

                            </p>

                        </div>

                    </div>

                </div>

                {/* ------------------------------------------------------ */}
                {/* Actions */}
                {/* ------------------------------------------------------ */}

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                    <h2 className="mb-6 text-xl font-semibold text-white">

                        Subscription Actions

                    </h2>

                    <div className="space-y-4">

                        <button
                            disabled={!isActive || loading2}
                            className={`w-full rounded-lg border px-5 py-3 font-medium transition
                                ${
                                    !isActive
                                        ? "cursor-not-allowed border-slate-700 text-slate-600"
                                        : "border-amber-600 text-amber-400 hover:bg-amber-600/10"
                                }`}
                            onClick={async () => {

                                await modifySubscription({

                                    subscriptionId: BigInt(subscription.subscription_id),

                                    operation: "pauseSubscription",

                                    statusValue: 1,

                                    apiSegment: "pause",

                                });

                                if (modificationSuccessful){

                                    router.refresh();
                                    
                                    setSubscription(prev =>

                                        prev
                                            ? {
                                                ...prev,
                                                status: "PAUSED",
                                            }
                                            : prev

                                    );

                                }

                            }}
                        >

                            Pause Subscription

                        </button>

                        <button
                            disabled={!isPaused || loading2}
                            className={`w-full rounded-lg border px-5 py-3 font-medium transition
                                ${
                                    !isPaused
                                        ? "cursor-not-allowed border-slate-700 text-slate-600"
                                        : "border-emerald-600 text-emerald-400 hover:bg-emerald-600/10"
                                }`}
                            onClick={async () => {

                                await modifySubscription({

                                    subscriptionId: BigInt(subscription.subscription_id),

                                    operation: "resumeSubscription",

                                    statusValue: 0,

                                    apiSegment: "resume",

                                });

                                if (modificationSuccessful){

                                    router.refresh();
                                    
                                    setSubscription(prev =>

                                        prev
                                            ? {
                                                ...prev,
                                                status: "ACTIVE",
                                            }
                                            : prev

                                    );

                                }

                            }}
                        >

                            Resume Subscription

                        </button>

                        <button
                            disabled={isCancelled || loading2}
                            className={`w-full rounded-lg border px-5 py-3 font-medium transition
                                ${
                                    isCancelled
                                        ? "cursor-not-allowed border-slate-700 text-slate-600"
                                        : "border-red-600 text-red-400 hover:bg-red-600/10"
                                }`}
                            onClick={async () => {

                                await modifySubscription({

                                    subscriptionId: BigInt(subscription.subscription_id),

                                    operation: "cancelSubscription",

                                    statusValue: 2,

                                    apiSegment: "cancel",

                                });

                                if (modificationSuccessful){

                                    router.refresh();
                                    
                                    setSubscription(prev =>

                                        prev
                                            ? {
                                                ...prev,
                                                status: "CANCELLED",
                                            }
                                            : prev

                                    );

                                }

                            }}
                        >

                            Cancel Subscription

                        </button>

                        <CustomerDashboardButton />

                    </div>

                </div>

            </section>

            {/* ------------------------------------------------------ */}
            {/* Billing History */}
            {/* ------------------------------------------------------ */}

            <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold text-white">

                        Billing History

                    </h2>

                </div>

                <div className="mt-6 rounded-lg border border-dashed border-slate-700 p-8 text-center text-slate-500">

                    Billing history will appear here.

                </div>

            </section>

        </main>

    );

}