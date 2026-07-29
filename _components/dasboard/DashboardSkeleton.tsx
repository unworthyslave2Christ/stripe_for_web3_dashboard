"use client";

export default function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">

            {/* Merchant Header */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="h-8 w-64 rounded bg-slate-800" />
                <div className="mt-3 h-4 w-96 rounded bg-slate-800" />

                <div className="mt-6 flex gap-4">
                    <div className="h-10 w-32 rounded-lg bg-slate-800" />
                    <div className="h-10 w-32 rounded-lg bg-slate-800" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                    >
                        <div className="h-4 w-28 rounded bg-slate-800" />

                        <div className="mt-4 h-10 w-20 rounded bg-slate-800" />

                        <div className="mt-4 h-3 w-24 rounded bg-slate-800" />
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-20 rounded-xl border border-slate-800 bg-slate-900"
                    />
                ))}
            </div>

            {/* Main Dashboard */}
            <div className="grid gap-6 xl:grid-cols-3">

                {/* Left Column */}
                <div className="space-y-6 xl:col-span-2">

                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                        >
                            <div className="h-6 w-48 rounded bg-slate-800" />

                            <div className="mt-6 space-y-4">
                                {Array.from({ length: 4 }).map((_, row) => (
                                    <div
                                        key={row}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="h-4 w-48 rounded bg-slate-800" />
                                        <div className="h-4 w-24 rounded bg-slate-800" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>

                {/* Worker Status */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <div className="h-6 w-40 rounded bg-slate-800" />

                    <div className="mt-8 space-y-5">

                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between"
                            >
                                <div className="h-4 w-28 rounded bg-slate-800" />

                                <div className="h-4 w-20 rounded bg-slate-800" />
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}