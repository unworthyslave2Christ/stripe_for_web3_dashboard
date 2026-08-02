"use client";

import type {

    BillingPlan,

    Merchant,

    Subscription,

} from "@/types/dashboard";

interface SubscriptionCardProps {

    subscription: Subscription;

    merchant?: Merchant;

    plan?: BillingPlan;

    onManage?: (subscription: Subscription) => void;

}

export default function SubscriptionCard({

    subscription,

    merchant,

    plan,

    onManage,

}: SubscriptionCardProps) {

    const statusColor = {

        ACTIVE:
            "bg-emerald-500/20 text-emerald-400",

        PAUSED:
            "bg-amber-500/20 text-amber-400",

        CANCELLED:
            "bg-red-500/20 text-red-400",

    };

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-700">

            <div className="flex items-start justify-between">

                <div>

                    <h3 className="text-xl font-semibold text-white">

                        {

                            merchant?.name ??

                            `Merchant #${subscription.merchantId}`

                        }

                    </h3>

                    <p className="mt-2 text-slate-400">

                        {

                            plan?.name ??

                            `Plan #${subscription.planId}`

                        }

                    </p>

                </div>

                <span

                    className={`rounded-full px-3 py-1 text-xs font-semibold ${

                        statusColor[subscription.status]

                    }`}

                >

                    {subscription.status}

                </span>

            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">

                <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">

                        Next Billing

                    </p>

                    <p className="mt-2 font-medium text-white">

                        {

                            new Date(

                                subscription.nextBillingTime,

                            ).toLocaleString()

                        }

                    </p>

                </div>

                <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">

                        Last Charged

                    </p>

                    <p className="mt-2 font-medium text-white">

                        {

                            subscription.lastChargedAt

                                ? new Date(

                                    subscription.lastChargedAt,

                                ).toLocaleString()

                                : "Never"

                        }

                    </p>

                </div>

                <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">

                        Smart Account

                    </p>

                    <p className="mt-2 break-all font-mono text-sm text-cyan-400">

                        {

                            subscription.smartAccount

                        }

                    </p>

                </div>

                <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">

                        Subscription ID

                    </p>

                    <p className="mt-2 font-semibold text-white">

                        #

                        {

                            subscription.subscriptionId

                        }

                    </p>

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button

                    type="button"

                    onClick={() =>

                        onManage?.(

                            subscription,

                        )

                    }

                    className="rounded-xl bg-cyan-600 px-5 py-2 font-medium text-white transition hover:bg-cyan-500"

                >

                    Manage Subscription

                </button>

            </div>

        </div>

    );

}