"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Wallet, Repeat2, Store, Users } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50">

            {/* ------------------------------------------------------------------ */}
            {/* Hero                                                               */}
            {/* ------------------------------------------------------------------ */}

            <section className="mx-auto flex max-w-7xl flex-col items-center px-8 py-24 text-center">

                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400">

                    Web3 Subscription Infrastructure

                </span>

                <h1 className="mt-8 max-w-5xl text-6xl font-extrabold tracking-tight">

                    Web3 Subscription Billing

                </h1>

                <p className="mt-5 text-2xl font-semibold text-cyan-400">

                    The Stripe for Web3.

                </p>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">

                    Create subscription businesses powered by Account
                    Abstraction. Customers authorize recurring payments once,
                    merchants receive automated recurring revenue, and billing
                    executes securely on-chain through permissioned smart
                    accounts.

                </p>

                <div className="mt-12">

                    <ConnectButton />

                </div>

                <div className="mt-12 flex flex-col gap-5 sm:flex-row">

                    <Link
                        href="/dashboard/merchant"
                        className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold transition hover:bg-cyan-600"
                    >
                        Register as Merchant

                        <ArrowRight className="ml-3 h-5 w-5" />
                    </Link>

                    <Link
                        href="/dashboard/customer"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-8 py-4 text-lg font-semibold transition hover:border-cyan-500 hover:bg-slate-900"
                    >
                        Register as Customer

                    </Link>

                </div>

            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Statistics (Future Live Data)                                      */}
            {/* ------------------------------------------------------------------ */}

            <section className="mx-auto max-w-7xl px-8">

                <div className="grid gap-6 md:grid-cols-4">

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

                        <p className="text-sm uppercase tracking-wide text-slate-500">

                            Merchants

                        </p>

                        <h2 className="mt-4 text-4xl font-bold">

                            —

                        </h2>

                        <p className="mt-2 text-sm text-slate-500">

                            Live protocol statistic

                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

                        <p className="text-sm uppercase tracking-wide text-slate-500">

                            Customers

                        </p>

                        <h2 className="mt-4 text-4xl font-bold">

                            —

                        </h2>

                        <p className="mt-2 text-sm text-slate-500">

                            Live protocol statistic

                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

                        <p className="text-sm uppercase tracking-wide text-slate-500">

                            Active Plans

                        </p>

                        <h2 className="mt-4 text-4xl font-bold">

                            —

                        </h2>

                        <p className="mt-2 text-sm text-slate-500">

                            Live protocol statistic

                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

                        <p className="text-sm uppercase tracking-wide text-slate-500">

                            Total Volume

                        </p>

                        <h2 className="mt-4 text-4xl font-bold">

                            —

                        </h2>

                        <p className="mt-2 text-sm text-slate-500">

                            Live protocol statistic

                        </p>

                    </div>

                </div>

            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Features                                                           */}
            {/* ------------------------------------------------------------------ */}

            <section className="mx-auto mt-24 max-w-7xl px-8">

                <h2 className="text-center text-4xl font-bold">

                    Built for Subscription Businesses

                </h2>

                <p className="mx-auto mt-4 max-w-3xl text-center text-slate-400">

                    Everything required to launch and operate decentralized
                    recurring billing on-chain.

                </p>

                <div className="mt-16 grid gap-8 md:grid-cols-3">

                    <FeatureCard
                        icon={<ShieldCheck className="h-8 w-8 text-cyan-400" />}
                        title="Permissioned Billing"
                        description="Customers approve recurring payments once. No repeated wallet confirmations."
                    />

                    <FeatureCard
                        icon={<Repeat2 className="h-8 w-8 text-cyan-400" />}
                        title="Automated Recurring Charges"
                        description="Billing workers execute scheduled subscription payments automatically."
                    />

                    <FeatureCard
                        icon={<Wallet className="h-8 w-8 text-cyan-400" />}
                        title="Account Abstraction"
                        description="Built around smart accounts, session keys and ZeroDev infrastructure."
                    />

                    <FeatureCard
                        icon={<Store className="h-8 w-8 text-cyan-400" />}
                        title="Merchant Management"
                        description="Create subscription plans, manage pricing and monitor recurring revenue."
                    />

                    <FeatureCard
                        icon={<Users className="h-8 w-8 text-cyan-400" />}
                        title="Customer Portal"
                        description="Discover merchants, subscribe to plans and manage active subscriptions."
                    />

                    <FeatureCard
                        icon={<ShieldCheck className="h-8 w-8 text-cyan-400" />}
                        title="Secure Session Keys"
                        description="Permission accounts are serialized while session keys remain encrypted for billing."
                    />

                </div>

            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Recent Merchants (Future)                                          */}
            {/* ------------------------------------------------------------------ */}

            <section className="mx-auto mt-28 max-w-7xl px-8">

                <div className="flex items-center justify-between">

                    <h2 className="text-3xl font-bold">

                        Recent Merchants

                    </h2>

                    <span className="text-sm text-slate-500">

                        Coming Soon

                    </span>

                </div>

                <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-20 text-center text-slate-500">

                    Merchant carousel will appear here.

                </div>

            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Featured Businesses                                                */}
            {/* ------------------------------------------------------------------ */}

            <section className="mx-auto mt-24 max-w-7xl px-8">

                <div className="flex items-center justify-between">

                    <h2 className="text-3xl font-bold">

                        Featured Subscription Businesses

                    </h2>

                    <span className="text-sm text-slate-500">

                        Coming Soon

                    </span>

                </div>

                <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-20 text-center text-slate-500">

                    Featured merchants and plans will appear here.

                </div>

            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Technology                                                         */}
            {/* ------------------------------------------------------------------ */}

            <section className="mx-auto mt-24 mb-24 max-w-7xl px-8">

                <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 to-slate-800 p-12">

                    <h2 className="text-4xl font-bold">

                        Powered by Account Abstraction

                    </h2>

                    <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">

                        Built upon ERC-4337 smart accounts, ZeroDev Kernel,
                        permissioned session keys, Paymasters, Bundlers and
                        automated billing workers to deliver enterprise-grade
                        recurring payments for Web3 businesses.

                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <Badge text="ERC-4337" />

                        <Badge text="ZeroDev Kernel" />

                        <Badge text="Session Keys" />

                        <Badge text="Paymasters" />

                        <Badge text="Bundlers" />

                        <Badge text="Recurring Billing" />

                    </div>

                </div>

            </section>

        </main>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({
    icon,
    title,
    description,
}: FeatureCardProps) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:border-cyan-500">

            {icon}

            <h3 className="mt-6 text-2xl font-semibold">

                {title}

            </h3>

            <p className="mt-4 leading-7 text-slate-400">

                {description}

            </p>

        </div>
    );
}

function Badge({
    text,
}: {
    text: string;
}) {
    return (
        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">

            {text}

        </span>
    );
}