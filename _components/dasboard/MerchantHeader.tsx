// components/dashboard/MerchantHeader.tsx

"use client";

import { Copy, ExternalLink } from "lucide-react";

import { toast } from "sonner";

interface MerchantHeaderProps {
    merchant: any;
}

export default function MerchantHeader({
    merchant,
}: MerchantHeaderProps) {

    if (!merchant)
        return null;

    async function copy(text: string) {
        await navigator.clipboard.writeText(text);

        toast.success("Copied to clipboard.");
    }

    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <div className="flex items-start justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        {merchant.name}
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Merchant Dashboard
                    </p>

                </div>

                <div className="rounded-xl bg-emerald-600/20 px-4 py-2 text-sm font-medium text-emerald-400">

                    ACTIVE

                </div>

            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">

                <InfoCard
                    title="Merchant ID"
                    value={merchant.merchantId?.toString()}
                    copyable
                />

                <InfoCard
                    title="Smart Account"
                    value={merchant.smartAccount}
                    copyable
                />

                <InfoCard
                    title="Payout Wallet"
                    value={merchant.payoutWallet}
                    copyable
                />

            </div>

        </section>
    );

}

interface InfoCardProps {

    title: string;

    value: string;

    copyable?: boolean;

}

function InfoCard({

    title,

    value,

    copyable,

}: InfoCardProps) {

    async function handleCopy() {

        await navigator.clipboard.writeText(value);

        toast.success("Copied.");

    }

    return (

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

            <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">

                {title}

            </div>

            <div className="flex items-center justify-between gap-3">

                <div className="truncate font-mono text-sm">

                    {value}

                </div>

                {copyable && (

                    <button
                        onClick={handleCopy}
                        className="text-slate-400 hover:text-white"
                    >

                        <Copy size={16} />

                    </button>

                )}

            </div>

        </div>

    );

}