// dashboard/components/StatsGrid.tsx

"use client";

import type {

    DashboardStats,

} from "@/types/dashboard";

interface StatsGridProps {

    stats: DashboardStats;

}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function StatsGrid({

    stats,

}: StatsGridProps) {

    const cards = [

        {

            title: "Total Plans",

            value: stats.totalPlans,

            color: "text-white",

        },

        {

            title: "Active Plans",

            value: stats.activePlans,

            color: "text-emerald-400",

        },

        {

            title: "Customers",

            value: stats.totalCustomers,

            color: "text-blue-400",

        },

        {

            title: "Subscriptions",

            value: stats.totalSubscriptions,

            color: "text-purple-400",

        },

        {

            title: "Active Subscriptions",

            value: stats.activeSubscriptions,

            color: "text-cyan-400",

        },

        {

            title: "Successful Billings",

            value: stats.successfulBillings,

            color: "text-emerald-400",

        },

        {

            title: "Failed Billings",

            value: stats.failedBillings,

            color: "text-red-400",

        },

        {

            title: "Monthly Revenue",

            value: `$${stats.monthlyRevenue.toLocaleString()}`,

            color: "text-yellow-400",

        },

        {

            title: "Total Revenue",

            value: `$${stats.totalRevenue.toLocaleString()}`,

            color: "text-amber-400",

        },

    ];

    return (

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {cards.map((card) => (

                <div

                    key={card.title}

                    className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"

                >

                    <p className="text-sm text-slate-400">

                        {card.title}

                    </p>

                    <h3

                        className={`mt-3 text-3xl font-bold ${card.color}`}

                    >

                        {card.value}

                    </h3>

                </div>

            ))}

        </section>

    );

}