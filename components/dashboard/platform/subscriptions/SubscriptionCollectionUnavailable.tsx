"use client";

import Link from "next/link";

import {
    ArrowRight,
    CreditCard,
    RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

interface SubscriptionCollectionUnavailableProps {
    merchantId: number | null;

    refreshing?: boolean;

    onRefresh: () => void;
}

export function SubscriptionCollectionUnavailable({
    merchantId,
    refreshing = false,
    onRefresh,
}: SubscriptionCollectionUnavailableProps) {
    return (
        <Card className="border-amber-500/20">
            <CardContent className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <CreditCard className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium">
                                Subscription collection is not exposed yet
                            </p>

                            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                                SDK capability boundary
                            </span>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            The merchant account is available, but the current
                            Merchant SDK surface does not yet expose the
                            merchant-side operation required to retrieve its
                            subscription collection.
                        </p>

                        {merchantId !== null && (
                            <div className="mt-4 rounded-lg border bg-muted/20 p-3">
                                <p className="text-xs text-muted-foreground">
                                    Current merchant
                                </p>

                                <code className="mt-1 block font-mono text-xs">
                                    {merchantId}
                                </code>
                            </div>
                        )}

                        <div className="mt-4 rounded-lg border bg-muted/20 p-4">
                            <p className="text-sm font-medium">
                                What is intentionally not happening
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                The page does not fabricate customers,
                                plans, billing totals, renewal dates or
                                subscription counts.
                            </p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onRefresh}
                                disabled={refreshing}
                            >
                                <RefreshCw
                                    className={
                                        refreshing
                                            ? "animate-spin"
                                            : undefined
                                    }
                                />
                                Refresh merchant
                            </Button>

                            <Button
                                render={
                                    <Link href="/dashboard/platform/plans">
                                        View plans
                                        <ArrowRight />
                                    </Link>
                                }
                                size="sm"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}