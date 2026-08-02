"use client";

import type {

    DashboardStats,

} from "@/types/dashboard";

interface CustomerStatsProps {

    stats: DashboardStats;

}

export default function CustomerStats({

    stats,

}: CustomerStatsProps) {

    const cards = [

        {

            title: "Businesses",

            value: stats.totalMerchants,

            icon: "🏪",

            color: "text-cyan-400",

            description:

                "Registered merchants",

        },

        {

            title: "Available Plans",

            value: stats.totalPlans,

            icon: "📦",

            color: "text-violet-400",

            description:

                "Subscription plans",

        },

        {

            title: "Active Subscriptions",

            value: stats.activeSubscriptions,

            icon: "🔄",

            color: "text-emerald-400",

            description:

                "Currently billing",

        },

        {

            title: "Customers",

            value: stats.totalCustomers,

            icon: "👥",

            color: "text-amber-400",

            description:

                "Protocol users",

        },

    ];

    return (

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {

                cards.map(

                    card => (

                        <div

                            key={card.title}

                            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-cyan-600 hover:-translate-y-1"

                        >

                            <div className="flex items-center justify-between">

                                <span className="text-4xl">

                                    {card.icon}

                                </span>

                                <span

                                    className={`text-3xl font-bold ${card.color}`}

                                >

                                    {card.value}

                                </span>

                            </div>

                            <h3 className="mt-8 text-lg font-semibold text-white">

                                {card.title}

                            </h3>

                            <p className="mt-2 text-sm text-slate-400">

                                {card.description}

                            </p>

                        </div>

                    ),

                )

            }

        </section>

    );

}