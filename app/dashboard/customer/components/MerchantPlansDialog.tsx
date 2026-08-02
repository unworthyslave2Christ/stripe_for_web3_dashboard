"use client";

import type {

    BillingPlan,

    Merchant,

} from "@/types/dashboard";

import PlanCard from "./PlanCard";

interface MerchantPlansDialogProps {

    merchant: Merchant | null;

    plans: BillingPlan[];

    open: boolean;

    loading?: boolean;

    balances?: Record<string, string>;

    onClose: () => void;

    onSubscribe: (
        merchant: Merchant,
        plan: BillingPlan,
    ) => void;

}

export default function MerchantPlansDialog({

    merchant,

    plans,

    open,

    loading = false,

    balances = {},

    onClose,

    onSubscribe,

}: MerchantPlansDialogProps) {

    if (!open || !merchant) {

        return null;

    }

    const merchantPlans =

        plans.filter(

            plan =>

                plan.merchantId ===

                merchant.merchantId,

        );

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">

                {/* ------------------------------------------------------ */}
                {/* Header                                                 */}
                {/* ------------------------------------------------------ */}

                <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

                    <div>

                        <h2 className="text-3xl font-bold text-white">

                            {merchant.name}

                        </h2>

                        <p className="mt-2 text-slate-400">

                            Browse available subscription plans.

                        </p>

                    </div>

                    <button

                        type="button"

                        onClick={onClose}

                        className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 transition hover:border-red-500 hover:text-red-400"

                    >

                        ✕

                    </button>

                </div>

                {/* ------------------------------------------------------ */}
                {/* Body                                                   */}
                {/* ------------------------------------------------------ */}

                <div className="flex-1 overflow-y-auto p-8">

                    {

                        loading && (

                            <div className="py-20 text-center text-slate-400">

                                Loading plans...

                            </div>

                        )

                    }

                    {

                        !loading &&

                        merchantPlans.length === 0 && (

                            <div className="rounded-2xl border border-dashed border-slate-700 py-20 text-center">

                                <div className="text-6xl">

                                    📦

                                </div>

                                <h3 className="mt-6 text-2xl font-bold text-white">

                                    No Plans Available

                                </h3>

                                <p className="mt-3 text-slate-400">

                                    This merchant has not published any
                                    subscription plans yet.

                                </p>

                            </div>

                        )

                    }

                    {

                        !loading &&

                        merchantPlans.length > 0 && (

                            <div className="grid gap-6 lg:grid-cols-2">

                                {

                                    merchantPlans.map(

                                        plan => (

                                            <PlanCard

                                                key={

                                                    plan.planId

                                                }

                                                merchant={

                                                    merchant

                                                }

                                                plan={

                                                    plan

                                                }

                                                walletBalance={

                                                    balances[
                                                        plan.paymentToken.toLowerCase()
                                                    ] ??

                                                    "0"

                                                }

                                                onSubscribe={

                                                    onSubscribe

                                                }

                                            />

                                        ),

                                    )

                                }

                            </div>

                        )

                    }

                </div>

            </div>

        </div>

    );

}