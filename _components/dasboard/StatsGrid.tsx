// components/dashboard/StatsGrid.tsx

"use client";

import {
    CreditCard,
    Users,
    Wallet,
    CheckCircle2,
    XCircle,
    Activity,
} from "lucide-react";

interface StatsGridProps {
    stats: {
        activePlans: number;
        totalPlans: number;
        totalCustomers: number;
        totalSubscriptions: number;
        activeSubscriptions: number;
        successfulBillings: number;
        failedBillings: number;
        worker?: any;
    };
}

export default function StatsGrid({
    stats,
}: StatsGridProps) {

    if (!stats)
        return null;

    return (

        <section className="mt-8">

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                <StatCard
                    title="Billing Plans"
                    value={stats.totalPlans}
                    subtitle={`${stats.activePlans} Active`}
                    icon={<Wallet size={22} />}
                />

                <StatCard
                    title="Customers"
                    value={stats.totalCustomers}
                    subtitle="Registered Customers"
                    icon={<Users size={22} />}
                />

                <StatCard
                    title="Subscriptions"
                    value={stats.totalSubscriptions}
                    subtitle={`${stats.activeSubscriptions} Active`}
                    icon={<CreditCard size={22} />}
                />

                <StatCard
                    title="Successful Billings"
                    value={stats.successfulBillings}
                    subtitle="Completed Charges"
                    icon={<CheckCircle2 size={22} />}
                />

                <StatCard
                    title="Failed Billings"
                    value={stats.failedBillings}
                    subtitle="Require Attention"
                    icon={<XCircle size={22} />}
                />

                <WorkerCard
                    worker={stats.worker}
                />

            </div>

        </section>

    );

}

interface StatCardProps {

    title: string;

    value: number | string;

    subtitle: string;

    icon: React.ReactNode;

}

function StatCard({

    title,

    value,

    subtitle,

    icon,

}: StatCardProps) {

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

                <div className="text-slate-400">

                    {title}

                </div>

                <div className="text-blue-400">

                    {icon}

                </div>

            </div>

            <div className="mt-5 text-4xl font-bold">

                {value}

            </div>

            <div className="mt-2 text-sm text-slate-500">

                {subtitle}

            </div>

        </div>

    );

}

function WorkerCard({
    worker,
}: {
    worker: any;
}) {

    const healthy =
        worker &&
        worker.worker_status === "ACTIVE";

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

                <div className="text-slate-400">

                    Billing Worker

                </div>

                <Activity
                    size={22}
                    className={
                        healthy
                            ? "text-emerald-400"
                            : "text-red-400"
                    }
                />

            </div>

            <div
                className={`mt-5 text-3xl font-bold ${
                    healthy
                        ? "text-emerald-400"
                        : "text-red-400"
                }`}
            >
                {healthy
                    ? "Healthy"
                    : "Offline"}
            </div>

            <div className="mt-3 space-y-1 text-sm text-slate-500">

                <div>
                    Successful Billings:&nbsp;
                    <span className="text-slate-300">
                        {worker?.successful_billings ?? 0}
                    </span>
                </div>

                <div>
                    Failed Billings:&nbsp;
                    <span className="text-slate-300">
                        {worker?.failed_billings ?? 0}
                    </span>
                </div>

                <div>
                    Last Heartbeat:&nbsp;
                    <span className="text-slate-300">
                        {worker?.last_heartbeat
                            ? new Date(
                                  worker.last_heartbeat,
                              ).toLocaleString()
                            : "Never"}
                    </span>
                </div>

            </div>

        </div>

    );

}