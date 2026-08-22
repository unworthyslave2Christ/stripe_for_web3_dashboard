"use client";

import {
    ArrowLeft,
    CreditCard,
    MoreHorizontal,
} from "lucide-react";

import Link from "next/link";

import {
    Button,
} from "@/components/ui/button";

import {
    Badge,
} from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Inline,
} from "@/components/layout/Inline";

import {
    SubscriptionStatusBadge,
} from "../SubscriptionStatusBadge";

import type {
    MerchantSubscriptionRecord,
} from "@/types/merchant/subscription";

export function SubscriptionDetailHeader({
    subscription,
}: {
    subscription: MerchantSubscriptionRecord;
}) {
    return (
        <div className="space-y-5">

            <Button
                render={
                    <Link href="/dashboard/platform/subscriptions">
                        <ArrowLeft />
                        Subscriptions
                    </Link>
                }
                variant="ghost"
                size="sm"
                className="-ml-2"
            />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">

                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted/40">
                        <CreditCard className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">

                        <Inline
                            gap={2}
                            className="flex-wrap"
                        >
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Subscription #
                                {subscription.subscriptionId}
                            </h1>

                            <SubscriptionStatusBadge
                                status={
                                    subscription.status
                                }
                            />
                        </Inline>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">

                            <Link
                                href={`/dashboard/platform/customers/${subscription.customerId}`}
                                className="hover:text-foreground hover:underline"
                            >
                                {subscription.customerName}
                            </Link>

                            <span>•</span>

                            <Link
                                href={`/dashboard/platform/plans/${subscription.planId}`}
                                className="hover:text-foreground hover:underline"
                            >
                                {subscription.planName}
                            </Link>

                        </div>

                    </div>

                </div>

                <DropdownMenu>

                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="outline"
                                disabled
                            >
                                Manage subscription
                                <MoreHorizontal />
                            </Button>
                        }
                    />

                    <DropdownMenuContent align="end">

                        <DropdownMenuItem disabled>
                            View customer
                        </DropdownMenuItem>

                        <DropdownMenuItem disabled>
                            View plan
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem disabled>
                            Pause subscription
                        </DropdownMenuItem>

                        <DropdownMenuItem disabled>
                            Resume subscription
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            disabled
                            className="text-destructive"
                        >
                            Cancel subscription
                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>

            </div>

            <div className="flex flex-wrap gap-2">

                <Badge variant="secondary">
                    Customer: {subscription.customerName}
                </Badge>

                <Badge variant="outline">
                    Plan: {subscription.planName}
                </Badge>

            </div>

        </div>
    );
}