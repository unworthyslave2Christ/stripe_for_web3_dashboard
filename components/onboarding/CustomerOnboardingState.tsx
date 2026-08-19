"use client";

import Link from "next/link";

import {
    CheckCircle2,
    Loader2,
    WalletCards,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

interface CustomerOnboardingStateProps {
    status:
        | "disconnected"
        | "checking"
        | "existing"
        | "not-created"
        | "registering"
        | "complete"
        | "error";

    smartAccount:
        | string
        | undefined;
}

export function CustomerOnboardingState({
    status,
    smartAccount,
}: CustomerOnboardingStateProps) {

    if (
        status ===
        "checking"
    ) {
        return (
            <div className="rounded-xl border bg-muted/20 p-4">

                <div className="flex items-center gap-3">

                    <Loader2 className="size-4 animate-spin text-muted-foreground" />

                    <div>

                        <p className="text-sm font-medium">
                            Checking your customer account
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Looking for an account associated with your connected wallet.
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    if (
        status ===
            "existing" &&
        smartAccount
    ) {
        return (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">

                <div className="flex items-start gap-3">

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">

                        <CheckCircle2 className="size-4 text-primary" />

                    </div>

                    <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                            <p className="text-sm font-medium">
                                Customer account found
                            </p>

                            <Badge variant="secondary">
                                Ready
                            </Badge>

                        </div>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            A Stripe for Web3 Smart Account is already associated with this wallet.
                        </p>

                        <code className="mt-3 block break-all font-mono text-xs text-muted-foreground">
                            {smartAccount}
                        </code>

                        <Button
                            render={
                                <Link href="/portal">
                                    Continue to portal
                                </Link>
                            }
                            className="mt-4"
                            size="sm"
                        />

                    </div>

                </div>

            </div>
        );
    }

    if (
        status ===
        "registering"
    ) {
        return (
            <div className="rounded-xl border bg-muted/20 p-4">

                <div className="flex items-center gap-3">

                    <Loader2 className="size-4 animate-spin text-muted-foreground" />

                    <div>

                        <p className="text-sm font-medium">
                            Creating your Smart Account
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Stripe for Web3 is completing your customer registration.
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    if (
        status ===
        "not-created"
    ) {
        return (
            <div className="rounded-xl border bg-muted/20 p-4">

                <div className="flex items-start gap-3">

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">

                        <WalletCards className="size-4 text-muted-foreground" />

                    </div>

                    <div>

                        <p className="text-sm font-medium">
                            No customer account found
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Complete the form below to create your customer account and Smart Account.
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    return null;
}