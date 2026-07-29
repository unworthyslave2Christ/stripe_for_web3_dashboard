"use client";

interface WorkerStatusProps {
    worker: {
        workerName: string;
        status: "ONLINE" | "OFFLINE";
        lastHeartbeat: string;
        successfulBillings: number;
        failedBillings: number;
        processedSubscriptions: number;
    };
}

export default function WorkerStatus({
    worker,
}: WorkerStatusProps) {
    const online = worker.status === "ONLINE";

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Billing Worker
                </h2>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        online
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                >
                    {worker.status}
                </span>
            </div>

            <div className="mt-6 space-y-4">

                <div className="flex justify-between">
                    <span className="text-slate-400">
                        Worker
                    </span>

                    <span className="font-medium">
                        {worker.workerName}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">
                        Last Heartbeat
                    </span>

                    <span>
                        {worker.lastHeartbeat}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">
                        Successful Billings
                    </span>

                    <span className="text-emerald-400 font-semibold">
                        {worker.successfulBillings}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">
                        Failed Billings
                    </span>

                    <span className="text-red-400 font-semibold">
                        {worker.failedBillings}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">
                        Processed Today
                    </span>

                    <span>
                        {worker.processedSubscriptions}
                    </span>
                </div>

            </div>
        </div>
    );
}