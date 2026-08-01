"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePlan } from "@/hooks/useCreatePlan";

export default function CreatePlanPage() {

    const {
        createBillingPlan,
        error,
        loading
    } = useCreatePlan();

    const router =
        useRouter();

    const [name, setName] =
        useState("");

    const [paymentToken, setPaymentToken] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [billingInterval, setBillingInterval] =
        useState("");

    const [trialPeriod, setTrialPeriod] =
        useState("");

    const [maxSubscribers, setMaxSubscribers] =
        useState("");

    const [metadataURI, setMetadataURI] =
        useState("");

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {

        event.preventDefault();

        try {

                await createBillingPlan({

                    name,

                    paymentToken:
                        paymentToken as `0x${string}`,

                    amount:
                        BigInt(amount),

                    billingInterval:
                        BigInt(billingInterval),

                    trialPeriod:
                        trialPeriod === ""
                            ? 0n
                            : BigInt(trialPeriod),

                    maxSubscribers:
                        maxSubscribers === ""
                            ? null
                            : Number(maxSubscribers),

                    metadataURI,

                });

                router.push(
                    "/dashboard/merchant/plans",
                );

        } catch (error){
            console.error(error);

        }

    }

    return (

        <main className="mx-auto max-w-4xl p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-white">

                    Create Billing Plan

                </h1>

                <p className="mt-2 text-slate-400">

                    Configure a recurring billing plan
                    for your customers.

                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8 rounded-xl border border-slate-800 bg-slate-900 p-8"
            >
                                {/* ------------------------------------------------------ */}
                {/* Plan Details                                            */}
                {/* ------------------------------------------------------ */}

                <section className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Plan Name

                        </label>

                        <input
                            required
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="Premium Plan"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Payment Token

                        </label>

                        <input
                            required
                            value={paymentToken}
                            onChange={(event) =>
                                setPaymentToken(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-white outline-none focus:border-cyan-500"
                            placeholder="0x..."
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Amount

                        </label>

                        <input
                            required
                            type="number"
                            min="1"
                            value={amount}
                            onChange={(event) =>
                                setAmount(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="1000000"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Billing Interval (seconds)

                        </label>

                        <input
                            required
                            type="number"
                            min="1"
                            value={billingInterval}
                            onChange={(event) =>
                                setBillingInterval(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="2592000"
                        />

                    </div>

                </section>
                                {/* ------------------------------------------------------ */}
                {/* Optional Configuration                                 */}
                {/* ------------------------------------------------------ */}

                <section className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Trial Period (seconds)

                        </label>

                        <input
                            type="number"
                            min="0"
                            value={trialPeriod}
                            onChange={(event) =>
                                setTrialPeriod(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="0"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Maximum Subscribers

                        </label>

                        <input
                            type="number"
                            min="0"
                            value={maxSubscribers}
                            onChange={(event) =>
                                setMaxSubscribers(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="Unlimited"
                        />

                    </div>

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Metadata URI

                        </label>

                        <input
                            value={metadataURI}
                            onChange={(event) =>
                                setMetadataURI(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="ipfs://..."
                        />

                    </div>

                </section>

                                {/* ------------------------------------------------------ */}
                {/* Actions                                                 */}
                {/* ------------------------------------------------------ */}

                <div className="flex items-center justify-end gap-4 border-t border-slate-800 pt-6">

                    <button
                        type="button"
                        onClick={() =>
                            router.back()
                        }
                        className="rounded-lg border border-slate-700 px-6 py-3 text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
                    >

                        Cancel

                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {loading
                            ? "Creating Plan..."
                            : "Create Plan"}

                    </button>

                </div>

            </form>

            {error && (

                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">

                    {error.message}

                </div>

            )}

        </main>

    );

}
           