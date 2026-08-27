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

export function MerchantOnboardingState({
    status,
    merchant,
}: {
    status:
        | "disconnected"
        | "checking"
        | "not-created"
        | "existing"
        | "creating"
        | "complete"
        | "error";

    merchant:
        | {
            name?: string;
            merchantId?: number;
        }
        | null;
}) {

    if (
        status ===
        "disconnected"
    ) {
        return (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-3">

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <WalletCards className="size-4 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">

                        <p className="text-sm font-medium">
                            Connect your merchant wallet
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Connect the wallet that owns or will create your
                            Stripe for Web3 merchant account to continue.
                        </p>

                    </div>
                </div>
            </div>
        );
    }

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
                            Checking your merchant account
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Looking for a merchant account associated with your connected wallet.
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    if (
        status ===
            "existing" &&
        merchant
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
                                Merchant account found
                            </p>

                            <Badge variant="secondary">
                                Ready
                            </Badge>

                        </div>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            A merchant account is already associated with this owner wallet.
                        </p>

                        {merchant.name && (
                            <p className="mt-3 text-sm font-medium">
                                {merchant.name}
                            </p>
                        )}

                        <Button
                            render={
                                <Link href="/dashboard">
                                    Continue to dashboard
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
        "creating"
    ) {
        return (
            <div className="rounded-xl border bg-muted/20 p-4">

                <div className="flex items-center gap-3">

                    <Loader2 className="size-4 animate-spin text-muted-foreground" />

                    <div>

                        <p className="text-sm font-medium">
                            Creating your merchant account
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Stripe for Web3 is completing merchant registration.
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
                            No merchant account found
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Complete the form below to create your merchant account.
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    if (
        status ===
        "complete"
    ) {
        return (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">

                <div className="flex items-start gap-3">

                    <CheckCircle2 className="mt-0.5 size-4 text-primary" />

                    <div>

                        <p className="text-sm font-medium">
                            Merchant created successfully
                        </p>

                        <Button
                            render={
                                <Link href="/dashboard">
                                    Continue to dashboard
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

    return null;
}