"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { BackButton } from "@/components/common/BackButton";

interface Subscriber {
    subscription_id: number;

    customer_id: string;

    smart_account: string;

    status: string;

    next_billing_time: string;

    created_at: string;
}

export default function PlanSubscribersPage() {

    const { planId } = useParams<{
        planId: string;
    }>();

    const [loading, setLoading] = useState(true);

    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

    const [planName, setPlanName] = useState("");

    async function loadSubscribers() {

        setLoading(true);

        try {

            /*
            ----------------------------------------------------------
            Load the plan first
            ----------------------------------------------------------
            */

            const planResponse = await fetch(
                `/api/plans?planId=${planId}`,
                {
                    cache: "no-store",
                },
            );

            if (!planResponse.ok) {
                throw new Error("Unable to load billing plan.");
            }

            const plan = await planResponse.json();

            setPlanName(plan.name);

            /*
            ----------------------------------------------------------
            Load subscribers
            ----------------------------------------------------------
            */

            const response = await fetch(

                `/api/subscriptions/by-plan?planId=${plan.plan_id}`,

                {
                    cache: "no-store",
                },
            );

            if (!response.ok) {
                throw new Error("Unable to load subscribers.");
            }

            const data = await response.json();

            setSubscribers(data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadSubscribers();

    }, [planId]);

    if (loading) {

        return (

            <main className="mx-auto max-w-7xl p-6">

                <p className="text-slate-400">

                    Loading subscribers...

                </p>

            </main>

        );

    }

    return (

        <main className="mx-auto max-w-7xl space-y-8 p-6">

            <div>
                <div className="flex justify-between">

                    <h1 className="text-3xl font-bold text-white">

                        {planName}

                    </h1>

                    <BackButton />
                </div>


                <p className="mt-2 text-slate-400">

                    {subscribers.length} Subscriber(s)

                </p>

            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

                <table className="min-w-full">

                    <thead className="border-b border-slate-800">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm text-slate-400">

                                Customer

                            </th>

                            <th className="px-6 py-4 text-left text-sm text-slate-400">

                                Smart Account

                            </th>

                            <th className="px-6 py-4 text-left text-sm text-slate-400">

                                Status

                            </th>

                            <th className="px-6 py-4 text-left text-sm text-slate-400">

                                Next Billing

                            </th>

                            <th className="px-6 py-4 text-left text-sm text-slate-400">

                                Joined

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {subscribers.length === 0 && (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="px-6 py-12 text-center text-slate-500"
                                >

                                    No subscribers found.

                                </td>

                            </tr>

                        )}

                        {subscribers.map((subscriber) => (

                            <tr
                                key={subscriber.subscription_id}
                                className="border-b border-slate-800 last:border-none"
                            >

                                <td className="px-6 py-4 text-white">

                                    {subscriber.customer_id}

                                </td>

                                <td className="px-6 py-4 font-mono text-xs text-cyan-400">

                                    {subscriber.smart_account}

                                </td>

                                <td className="px-6 py-4">

                                    <span
                                        className={`rounded px-3 py-1 text-xs ${
                                            subscriber.status === "ACTIVE"
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-red-500/20 text-red-400"
                                        }`}
                                    >

                                        {subscriber.status}

                                    </span>

                                </td>

                                <td className="px-6 py-4 text-slate-300">

                                    {new Date(
                                        subscriber.next_billing_time,
                                    ).toLocaleString()}

                                </td>

                                <td className="px-6 py-4 text-slate-400">

                                    {new Date(
                                        subscriber.created_at,
                                    ).toLocaleDateString()}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </main>

    );

}