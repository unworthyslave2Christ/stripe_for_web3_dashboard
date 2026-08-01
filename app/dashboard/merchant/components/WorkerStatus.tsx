// dashboard/components/WorkerStatus.tsx

"use client";

import { formatDistanceToNow } from "date-fns";

import type {

    Worker,

} from "@/types/dashboard";

interface WorkerStatusProps {

    worker: Worker;

}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function WorkerStatus({

    worker,

}: WorkerStatusProps) {

    const statusColor = {

        RUNNING:
            "bg-emerald-500",

        PAUSED:
            "bg-yellow-500",

        OFFLINE:
            "bg-red-500",

    }[worker.status];

    return (

        <section className="rounded-xl border border-slate-800 bg-slate-900">

            {/* ---------------------------------------------------------- */}
            {/* Header                                                     */}
            {/* ---------------------------------------------------------- */}

            <div className="border-b border-slate-800 px-6 py-4">

                <h2 className="text-lg font-semibold text-white">

                    Billing Worker

                </h2>

                <p className="mt-1 text-sm text-slate-400">

                    Background billing service health and statistics.

                </p>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* Content                                                    */}
            {/* ---------------------------------------------------------- */}

            <div className="space-y-6 p-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <span

                            className={`h-3 w-3 rounded-full ${statusColor}`}

                        />

                        <div>

                            <p className="font-semibold text-white">

                                {worker.workerName}

                            </p>

                            <p className="text-sm text-slate-400">

                                {worker.status}

                            </p>

                        </div>

                    </div>

                    <span className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">

                        v{worker.version}

                    </span>

                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

                        <p className="text-sm text-slate-400">

                            Current Batch Size

                        </p>

                        <p className="mt-2 text-2xl font-bold text-white">

                            {worker.currentBatchSize}

                        </p>

                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

                        <p className="text-sm text-slate-400">

                            Successful Billings

                        </p>

                        <p className="mt-2 text-2xl font-bold text-emerald-400">

                            {worker.successfulBillings}

                        </p>

                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

                        <p className="text-sm text-slate-400">

                            Failed Billings

                        </p>

                        <p className="mt-2 text-2xl font-bold text-red-400">

                            {worker.failedBillings}

                        </p>

                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">

                        <p className="text-sm text-slate-400">

                            Skipped Billings

                        </p>

                        <p className="mt-2 text-2xl font-bold text-yellow-400">

                            {worker.skippedBillings}

                        </p>

                    </div>

                </div>

                <div className="grid gap-4 sm:grid-cols-3">

                    <div>

                        <p className="text-sm text-slate-400">

                            Plans

                        </p>

                        <p className="mt-1 font-semibold text-white">

                            {worker.planCount}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-400">

                            Customers

                        </p>

                        <p className="mt-1 font-semibold text-white">

                            {worker.customerCount}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-400">

                            Subscriptions

                        </p>

                        <p className="mt-1 font-semibold text-white">

                            {worker.subscriptionCount}

                        </p>

                    </div>

                </div>

                <div className="border-t border-slate-800 pt-4">

                    <p className="text-sm text-slate-400">

                        Last Heartbeat

                    </p>

                    <p className="mt-1 text-white">

                        {worker.lastHeartbeat
                            ? formatDistanceToNow(
                                  new Date(worker.lastHeartbeat),
                                  { addSuffix: true },
                              )
                            : "Never"}

                    </p>

                    {worker.lastError && (

                        <div className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-3">

                            <p className="text-xs font-semibold uppercase tracking-wide text-red-400">

                                Last Error

                            </p>

                            <p className="mt-2 text-sm text-red-300">

                                {worker.lastError}

                            </p>

                        </div>

                    )}

                </div>

            </div>

        </section>

    );

}