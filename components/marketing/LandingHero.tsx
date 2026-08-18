import Link from "next/link";

import {
    ArrowRight,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

export function LandingHero() {
    return (
        <section className="border-b">

            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">

                <div className="flex flex-col justify-center">

                    <Badge
                        variant="secondary"
                        className="w-fit"
                    >
                        Account Abstraction billing infrastructure
                    </Badge>

                    <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        Billing infrastructure for the decentralized economy.
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        Stripe for Web3 gives businesses the infrastructure
                        to create plans, manage subscriptions, automate
                        recurring billing, and give customers Smart Accounts
                        for a simpler Web3 experience.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                        <Button
                            render={
                                <Link href="/get-started">
                                    Get started
                                    <ArrowRight />
                                </Link>
                            }
                            size="lg"
                        />
                            
                        

                        <Button
                            render={
                                <Link href="#developers">
                                    Explore the developer platform
                                </Link>
                            }
                            variant="outline"
                            size="lg"
                        />
                            
                        

                    </div>

                    <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">

                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4" />
                            Account abstraction
                        </div>

                        <div className="flex items-center gap-2">
                            <WalletCards className="size-4" />
                            Smart Accounts
                        </div>

                    </div>

                </div>

                <div className="relative">

                    <div className="overflow-hidden rounded-2xl border bg-card shadow-xl">

                        <div className="border-b px-5 py-4">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-xs text-muted-foreground">
                                        Merchant overview
                                    </p>

                                    <p className="mt-1 font-medium">
                                        ACMEFLOW
                                    </p>

                                </div>

                                <Badge variant="secondary">
                                    Operational
                                </Badge>

                            </div>

                        </div>

                        <div className="space-y-4 p-5">

                            <div className="grid grid-cols-2 gap-3">

                                <PreviewCard
                                    label="Customers"
                                    value="2,431"
                                />

                                <PreviewCard
                                    label="Subscriptions"
                                    value="1,892"
                                />

                            </div>

                            <div className="rounded-xl border bg-muted/20 p-5">

                                <p className="text-sm font-medium">
                                    Recurring revenue
                                </p>

                                <p className="mt-2 text-3xl font-semibold">
                                    $45,231
                                </p>

                                <div className="mt-6 h-32 rounded-lg bg-background">
                                    <div className="flex h-full items-end gap-2 px-4 pb-4">
                                        {[34, 47, 43, 61, 56, 72, 84, 76, 91].map(
                                            (height, index) => (
                                                <div
                                                    key={index}
                                                    className="flex-1 rounded-sm bg-primary/70"
                                                    style={{
                                                        height: `${height}%`,
                                                    }}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="rounded-xl border p-4">

                                <div className="flex items-center justify-between">

                                    <span className="text-sm font-medium">
                                        Smart Account
                                    </span>

                                    <Badge variant="secondary">
                                        Active
                                    </Badge>

                                </div>

                                <p className="mt-2 font-mono text-xs text-muted-foreground">
                                    0xf1cc...2347
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

function PreviewCard({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border bg-muted/20 p-4">

            <p className="text-xs text-muted-foreground">
                {label}
            </p>

            <p className="mt-2 text-2xl font-semibold">
                {value}
            </p>

        </div>
    );
}