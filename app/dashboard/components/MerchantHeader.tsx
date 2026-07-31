// dashboard/components/MerchantHeader.tsx

"use client";

import type {
    Merchant,
    Worker,
} from "@/types/dashboard";

interface MerchantHeaderProps {
    merchant: Merchant;
    worker: Worker;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function shortenAddress(address?: string) {
    if (!address) return "N/A";

    return `${address.slice(0, 8)}...${address.slice(-6)}`;
}

function AddressCard({
    label,
    address,
    color,
}: {
    label: string;
    address?: string;
    color: string;
}) {
    return (
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">

            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {label}
            </p>

            <p
                className={`mt-2 font-mono text-sm font-medium ${color}`}
                title={address}
            >
                {shortenAddress(address)}
            </p>

            <p className="mt-2 break-all font-mono text-[11px] text-slate-500">
                {address}
            </p>

        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function MerchantHeader({
    merchant,
    worker,
}: MerchantHeaderProps) {

    const workerColor = {
        RUNNING: "bg-emerald-500",
        PAUSED: "bg-yellow-500",
        OFFLINE: "bg-red-500",
    }[worker.status];

    return (

        <section className="rounded-xl border border-slate-800 bg-slate-900">

            <div className="flex flex-col gap-8 p-8 xl:flex-row xl:justify-between">

                {/* ====================================================== */}
                {/* Merchant                                                */}
                {/* ====================================================== */}

                <div className="flex-1">

                    <h1 className="text-3xl font-bold text-white">
                        {merchant.name}
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Merchant Dashboard
                    </p>

                    {/* -------------------------------------------------- */}
                    {/* Merchant Metadata                                 */}
                    {/* -------------------------------------------------- */}

                    <div className="mt-5 flex flex-wrap items-center gap-3">

                        <span className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">
                            Merchant #{merchant.merchantId}
                        </span>

                        <span
                            className={`rounded-md px-3 py-1 text-xs font-medium ${
                                merchant.status === "ACTIVE"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-red-500/20 text-red-400"
                            }`}
                        >
                            {merchant.status}
                        </span>

                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Identity                                           */}
                    {/* -------------------------------------------------- */}

                    <div className="mt-8 grid gap-4 lg:grid-cols-3">

                        <AddressCard
                            label="Merchant Smart Account"
                            address={merchant.smartAccount}
                            color="text-cyan-400"
                        />

                        <AddressCard
                            label="Owner Wallet"
                            address={merchant.ownerWallet}
                            color="text-emerald-400"
                        />

                        <AddressCard
                            label="Payout Wallet"
                            address={merchant.payoutWallet}
                            color="text-amber-400"
                        />

                    </div>

                </div>

                {/* ====================================================== */}
                {/* Worker                                                 */}
                {/* ====================================================== */}

                <div className="w-full xl:max-w-sm">

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-5">

                        <div className="flex items-center gap-3">

                            <span
                                className={`h-3 w-3 rounded-full ${workerColor}`}
                            />

                            <div>

                                <p className="font-medium text-white">
                                    {worker.workerName}
                                </p>

                                <p className="text-xs text-slate-400">
                                    {worker.status}
                                </p>

                            </div>

                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-5 text-sm">

                            <div>

                                <p className="text-slate-500">
                                    Version
                                </p>

                                <p className="mt-1 text-white">
                                    {worker.version}
                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500">
                                    Batch Size
                                </p>

                                <p className="mt-1 text-white">
                                    {worker.currentBatchSize}
                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500">
                                    Plans
                                </p>

                                <p className="mt-1 text-white">
                                    {worker.planCount}
                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500">
                                    Customers
                                </p>

                                <p className="mt-1 text-white">
                                    {worker.customerCount}
                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500">
                                    Subscriptions
                                </p>

                                <p className="mt-1 text-white">
                                    {worker.subscriptionCount}
                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500">
                                    Successful Billings
                                </p>

                                <p className="mt-1 font-semibold text-emerald-400">
                                    {worker.successfulBillings}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}