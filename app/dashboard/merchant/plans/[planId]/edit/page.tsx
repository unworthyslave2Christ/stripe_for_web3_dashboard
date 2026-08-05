"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useCreatePlan } from "@/hooks/usePlans";

const BILLING_PERIODS = [
    { value: "THREE_MINUTES", label: "3 Minutes (Testing)", seconds: 180 },
    { value: "FIVE_MINUTES", label: "5 Minutes (Testing)", seconds: 300 },
    { value: "DAILY", label: "Daily", seconds: 86400 },
    { value: "WEEKLY", label: "Weekly", seconds: 604800 },
    { value: "MONTHLY", label: "Monthly", seconds: 2592000 },
    { value: "QUARTERLY", label: "Quarterly", seconds: 7776000 },
    { value: "BIANNUAL", label: "Biannual", seconds: 15552000 },
    { value: "ANNUAL", label: "Annual", seconds: 31536000 },
];

const TRIAL_PERIODS = [
    { value: "NONE", label: "None", seconds: 0 },
    { value: "THREE_MINUTES", label: "3 Minutes (Testing)", seconds: 180 },
    { value: "FIVE_MINUTES", label: "5 Minutes (Testing)", seconds: 300 },
    { value: "ONE_DAY", label: "1 Day", seconds: 86400 },
    { value: "THREE_DAYS", label: "3 Days", seconds: 259200 },
    { value: "SEVEN_DAYS", label: "7 Days", seconds: 604800 },
    { value: "FOURTEEN_DAYS", label: "14 Days", seconds: 1209600 },
    { value: "THIRTY_DAYS", label: "30 Days", seconds: 2592000 },
];

export default function EditPlanPage() {

    const router = useRouter();

    const params = useParams();

    const planId = Number(params.planId);

    const {
        getPlan,
        updatePlan,
        loading,
        error,
    } = useCreatePlan();

    const [loaded, setLoaded] = useState(false);

    const [plan, setPlan] = useState<any>(null);

    const [name, setName] = useState("");

    const [amount, setAmount] = useState("");

    const [paymentToken, setPaymentToken] = useState("");

    const [billingPeriodNamed, setBillingPeriodNamed] =
        useState("MONTHLY");

    const [trialPeriodNamed, setTrialPeriodNamed] =
        useState("NONE");

    const [maxSubscribers, setMaxSubscribers] =
        useState("");

    const [metadataURI, setMetadataURI] =
        useState("");

    useEffect(() => {

        async function load() {

            const p = await getPlan(planId);

            if (!p) return;

            setPlan(p);

            setName(p.name);

            setAmount(String(p.amount));

            setPaymentToken(p.paymentToken);

            setMetadataURI(p.metadataURI ?? "");

            setMaxSubscribers(
                p.maxSubscribers
                    ? String(p.maxSubscribers)
                    : "",
            );

            setBillingPeriodNamed(
                p.billingPeriodNamed ?? "MONTHLY",
            );

            setTrialPeriodNamed(
                p.trialPeriodNamed ?? "NONE",
            );

            setLoaded(true);

        }

        load();

    }, [planId]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {

        event.preventDefault();

        if (!plan) return;

        const billing =
            BILLING_PERIODS.find(
                x => x.value === billingPeriodNamed,
            )!;

        const trial =
            TRIAL_PERIODS.find(
                x => x.value === trialPeriodNamed,
            )!;

        await updatePlan({

            planId: BigInt(planId),

            originalPlan: plan,

            updatedPlan: {

                ...plan,
                
                name,

                amount: BigInt(amount).toString(),

                billingIntervalSeconds: billing.seconds,

                billingPeriodNamed,

                trialPeriod: trial.seconds,

                trialPeriodNamed,

                maxSubscribers:
                    maxSubscribers === ""
                        ? 0
                        : Number(maxSubscribers),

                metadataURI,

            },

        });

        router.push(
            `/dashboard/merchant/plans/${planId}`,
        );

    }

    if (!loaded) {

        return (
            <main className="p-8">
                Loading...
            </main>
        );

    }

    return (

        <main className="mx-auto max-w-4xl p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-white">

                    Edit Billing Plan

                </h1>

                <p className="mt-2 text-slate-400">

                    Update your billing plan configuration.

                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8 rounded-xl border border-slate-800 bg-slate-900 p-8"
            >

                <section className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">

                            Plan Name

                        </label>

                        <input
                            value={name}
                            onChange={e =>
                                setName(e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">

                            Payment Token

                        </label>

                        <input
                            disabled
                            value={paymentToken}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-500"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">

                            Amount

                        </label>

                        <input
                            value={amount}
                            type="number"
                            onChange={e =>
                                setAmount(e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">

                            Billing Frequency

                        </label>

                        <select
                            value={billingPeriodNamed}
                            onChange={e =>
                                setBillingPeriodNamed(
                                    e.target.value,
                                )
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                        >

                            {BILLING_PERIODS.map(period => (

                                <option
                                    key={period.value}
                                    value={period.value}
                                >

                                    {period.label}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">

                            Trial Period

                        </label>

                        <select
                            value={trialPeriodNamed}
                            onChange={e =>
                                setTrialPeriodNamed(
                                    e.target.value,
                                )
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                        >

                            {TRIAL_PERIODS.map(period => (

                                <option
                                    key={period.value}
                                    value={period.value}
                                >

                                    {period.label}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">

                            Maximum Subscribers

                        </label>

                        <input
                            value={maxSubscribers}
                            type="number"
                            onChange={e =>
                                setMaxSubscribers(
                                    e.target.value,
                                )
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                        />

                    </div>

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm text-slate-300">

                            Metadata URI

                        </label>

                        <input
                            value={metadataURI}
                            onChange={e =>
                                setMetadataURI(
                                    e.target.value,
                                )
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                        />

                    </div>

                </section>

                <div className="flex justify-end gap-4 border-t border-slate-800 pt-6">

                    <button
                        type="button"
                        onClick={() =>
                            router.back()
                        }
                        className="rounded-lg border border-slate-700 px-6 py-3 text-slate-300"
                    >

                        Cancel

                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-cyan-600 px-6 py-3 text-white"
                    >

                        {loading
                            ? "Saving..."
                            : "Save Changes"}

                    </button>

                </div>

            </form>

            {error && (

                <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">

                    {error.message}

                </div>

            )}

        </main>

    );

}