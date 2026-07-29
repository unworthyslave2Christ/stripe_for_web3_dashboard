// components/dashboard/QuickActions.tsx

"use client";

import Link from "next/link";

import {
    PlusCircle,
    CreditCard,
    Users,
    Receipt,
    Settings,
    Activity,
} from "lucide-react";

export default function QuickActions() {

    return (

        <section className="mt-8">

            <div className="mb-5">

                <h2 className="text-2xl font-semibold">

                    Quick Actions

                </h2>

                <p className="mt-1 text-slate-400">

                    Everything needed to operate your Web3 billing business.

                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                <ActionCard
                    title="Create Billing Plan"
                    description="Launch a new subscription plan that customers can subscribe to."
                    href="/dashboard/plans/new"
                    icon={<PlusCircle size={28} />}
                    accent="bg-blue-600"
                />

                <ActionCard
                    title="Manage Billing Plans"
                    description="View, edit, pause or archive your existing plans."
                    href="/dashboard/plans"
                    icon={<CreditCard size={28} />}
                    accent="bg-violet-600"
                />

                <ActionCard
                    title="Customers"
                    description="Manage subscribers, permissions and smart accounts."
                    href="/dashboard/customers"
                    icon={<Users size={28} />}
                    accent="bg-emerald-600"
                />

                <ActionCard
                    title="Subscriptions"
                    description="Monitor every active subscription and billing cycle."
                    href="/dashboard/subscriptions"
                    icon={<Receipt size={28} />}
                    accent="bg-orange-600"
                />

                <ActionCard
                    title="Billing Activity"
                    description="Inspect billing history, worker logs and execution records."
                    href="/dashboard/activity"
                    icon={<Activity size={28} />}
                    accent="bg-pink-600"
                />

                <ActionCard
                    title="Merchant Settings"
                    description="Configure payout wallet, metadata and protocol preferences."
                    href="/dashboard/settings"
                    icon={<Settings size={28} />}
                    accent="bg-slate-700"
                />

            </div>

        </section>

    );

}

interface ActionCardProps {

    title: string;

    description: string;

    href: string;

    icon: React.ReactNode;

    accent: string;

}

function ActionCard({

    title,

    description,

    href,

    icon,

    accent,

}: ActionCardProps) {

    return (

        <Link
            href={href}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500 hover:bg-slate-800"
        >

            <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl text-white ${accent}`}
            >

                {icon}

            </div>

            <h3 className="text-lg font-semibold group-hover:text-blue-400">

                {title}

            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">

                {description}

            </p>

        </Link>

    );

}