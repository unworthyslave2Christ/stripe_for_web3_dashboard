"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePlan } from "@/hooks/usePlans";

import { useEffect } from "react";

import { useAccount, usePublicClient } from "wagmi";
import { getWalletBalance, type WalletBalance } from "@/services/token";



const SUPPORTED_TOKENS = [

    {
        label: "USDC (Arbitrum Sepolia)",
        symbol: "USDC",
        address:
            "0xA6B0921999d8D862B87eaCb3DDA1eb8805a096cD",
    },

    {
        label: "Custom Token",
        symbol: "CUSTOM",
        address: "",
    },

];


const BILLING_PERIODS = [

    { value: "THREE_MINUTES", label: "3 Minutes(Testing)", seconds: 180 },

    { value: "FIVE_MINUTES", label: "5 Minutes(Testing)", seconds: 300 },

    { value: "DAILY", label: "Daily", seconds: 86400 },

    { value: "WEEKLY", label: "Weekly", seconds: 604800 },

    { value: "MONTHLY", label: "Monthly", seconds: 2592000 },

    { value: "QUARTERLY", label: "Quarterly", seconds: 7776000 },

    { value: "BIANNUAL", label: "Biannual", seconds: 15552000 },

    { value: "ANNUAL", label: "Annual", seconds: 31536000 },

];

const TRIAL_PERIODS = [

    { value: "NONE", label: "None", seconds: 0 },

    { value: "THREE_MINUTES", label: "3 Minutes(Testing)", seconds: 180 },

    { value: "FIVE_MINUTES", label: "5 Minutes(Testing)", seconds: 300 },

    { value: "ONE_DAY", label: "1 Day", seconds: 86400 },

    { value: "THREE_DAYS", label: "3 Days", seconds: 259200 },

    { value: "SEVEN_DAYS", label: "7 Days", seconds: 604800 },

    { value: "FOURTEEN_DAYS", label: "14 Days", seconds: 1209600 },

    { value: "THIRTY_DAYS", label: "30 Days", seconds: 2592000 },

];

export default function CreatePlanPage() {

    const publicClient = usePublicClient();

    const {
        createBillingPlan,
        error,
        loading
    } = useCreatePlan();

    const router =
        useRouter();

    const [name, setName] =
        useState("");

    const { address } = useAccount();

    const [selectedToken, setSelectedToken] =
        useState(SUPPORTED_TOKENS[0].address);

    const [walletBalance, setWalletBalance] =
        useState<WalletBalance | null>(null);

    const [tokenLoading, setTokenLoading] =
        useState(false);

    const [tokenError, setTokenError] =
        useState("");
    
    const [paymentToken, setPaymentToken] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [billingInterval, setBillingInterval] =
        useState("");

    const [trialPeriod, setTrialPeriod] =
        useState("");

    const [billingPeriodNamed, setBillingPeriodNamed] =
        useState("MONTHLY");

    const [trialPeriodNamed, setTrialPeriodNamed] =
        useState("NONE");

    const [maxSubscribers, setMaxSubscribers] =
        useState("");

    const [metadataURI, setMetadataURI] =
        useState("");


    useEffect(() => {

        async function loadToken() {

            if (!address)
                return;

            if (!paymentToken)
                return;

            try {

                setTokenLoading(true);

                setTokenError("");

                const balance =
                    await getWalletBalance(
                        address,
                        paymentToken as `0x${string}`,
                        publicClient!
                    );

                setWalletBalance(balance);

            } catch {

                setWalletBalance(null);

                setTokenError(
                    "Invalid ERC20 token.",
                );

            } finally {

                setTokenLoading(false);

            }

        }

        loadToken();

    }, [
        paymentToken,
        address,
    ]);



    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {

        event.preventDefault();

        const billingPeriod =
            BILLING_PERIODS.find(
                p => p.value === billingPeriodNamed,
            )!;

        const trialPeriod =
            TRIAL_PERIODS.find(
                p => p.value === trialPeriodNamed,
            )!;

        try {

                await createBillingPlan({

                    name,

                    paymentToken:
                        paymentToken as `0x${string}`,

                    amount:
                        BigInt(amount),

                    billingInterval:
                        BigInt(billingPeriod.seconds),

                    trialPeriod:
                        BigInt(trialPeriod.seconds),

                    billingPeriodNamed:
                        billingPeriod.value,

                    trialPeriodNamed:
                        trialPeriod.value,

                    maxSubscribers:
                        maxSubscribers === ""
                            ? null
                            : Number(maxSubscribers),

                    metadataURI,

                });

                router.push(
                    "/dashboard/merchant/plans",
                );

        } catch (error){
            console.error(error);

        }

    }

    return (

        <main className="mx-auto max-w-4xl p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-white">

                    Create Billing Plan

                </h1>

                <p className="mt-2 text-slate-400">

                    Configure a recurring billing plan
                    for your customers.

                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8 rounded-xl border border-slate-800 bg-slate-900 p-8"
            >
                                {/* ------------------------------------------------------ */}
                {/* Plan Details                                            */}
                {/* ------------------------------------------------------ */}

                <section className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Plan Name

                        </label>

                        <input
                            required
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="Premium Plan"
                        />

                    </div>

                    <div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-300">

                                Payment Token

                            </label>

                            <select

                                value={selectedToken}

                                onChange={(event) => {

                                    setSelectedToken(event.target.value);

                                    setPaymentToken(event.target.value);

                                }}

                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"

                            >

                                {SUPPORTED_TOKENS.map(token => (

                                    <option

                                        key={token.label}

                                        value={token.address}

                                    >

                                        {token.label}

                                    </option>

                                ))}

                            </select>

                        </div>

                        {selectedToken === "" && (

                        <div className="mt-4">

                            <label className="mb-2 block text-sm font-medium text-slate-300">

                                ERC20 Contract Address

                            </label>

                            <input

                                value={paymentToken}

                                onChange={(event) =>

                                    setPaymentToken(
                                        event.target.value,
                                    )

                                }

                                placeholder="0x..."

                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-white"

                            />

                        </div>

                    )}

                    {tokenLoading && (

                        <div className="mt-4 rounded-lg bg-slate-800 p-4 text-slate-300">

                            Verifying token...

                        </div>

                    )}

                    {walletBalance && (

                        <div className="mt-4 rounded-lg border border-emerald-700 bg-emerald-900/20 p-4">

                            <div className="font-semibold text-emerald-400">

                                {walletBalance.symbol}

                            </div>

                            <div className="mt-2 text-sm text-slate-300">

                                Decimals: {walletBalance.decimals}

                            </div>

                            <div className="text-sm text-slate-300">

                                Wallet Balance: {walletBalance.formatted}

                            </div>

                        </div>

                    )}

                    {tokenError && (

                        <div className="mt-4 rounded-lg border border-red-700 bg-red-900/20 p-4 text-red-400">

                            {tokenError}

                        </div>

                    )}

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Amount

                        </label>

                        <input
                            required
                            type="number"
                            min="1"
                            value={amount}
                            onChange={(event) =>
                                setAmount(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="10"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Billing Frequency

                        </label>

                        <select
                            value={billingPeriodNamed}
                            onChange={(e) =>
                                setBillingPeriodNamed(e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                        >

                            {BILLING_PERIODS.map(period => (

                                <option
                                    key={period.value}
                                    value={period.value}
                                >

                                    {period.label}

                                </option>

                            ))}

                        </select>

                    </div>

                </section>
                                {/* ------------------------------------------------------ */}
                {/* Optional Configuration                                 */}
                {/* ------------------------------------------------------ */}

                <section className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Trial Period

                        </label>

                        <select
                            value={trialPeriodNamed}
                            onChange={(e) =>
                                setTrialPeriodNamed(e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                        >

                            {TRIAL_PERIODS.map(period => (

                                <option
                                    key={period.value}
                                    value={period.value}
                                >

                                    {period.label}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Maximum Subscribers

                        </label>

                        <input
                            type="number"
                            min="0"
                            value={maxSubscribers}
                            onChange={(event) =>
                                setMaxSubscribers(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="Unlimited"
                        />

                    </div>

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium text-slate-300">

                            Metadata URI

                        </label>

                        <input
                            value={metadataURI}
                            onChange={(event) =>
                                setMetadataURI(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="ipfs://..."
                        />

                    </div>

                </section>

                                {/* ------------------------------------------------------ */}
                {/* Actions                                                 */}
                {/* ------------------------------------------------------ */}

                <div className="flex items-center justify-end gap-4 border-t border-slate-800 pt-6">

                    <button
                        type="button"
                        onClick={() =>
                            router.back()
                        }
                        className="rounded-lg border border-slate-700 px-6 py-3 text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
                    >

                        Cancel

                    </button>

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            tokenLoading ||
                            !walletBalance
                        }
                        className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {loading
                            ? "Creating Plan..."
                            : "Create Plan"}

                    </button>

                </div>

            </form>

            {error && (

                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 mt-2 text-sm text-red-400">

                    {error.message}

                </div>

            )}

        </main>

    );

}
           