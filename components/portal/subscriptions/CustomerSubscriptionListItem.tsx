import Link from "next/link";

import {
    ArrowRight,
    CalendarClock,
    CreditCard,
    ShieldCheck,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type {
    CustomerSubscriptionView,
} from "@/types/customer-subscription";

import {
    CustomerSubscriptionActions,
} from "./CustomerSubscriptionActions";

import {
    CustomerSubscriptionAmount,
} from "./CustomerSubscriptionAmount";

import {
    CustomerSubscriptionStatusBadge,
} from "./CustomerSubscriptionStatusBadge";

export function CustomerSubscriptionListItem({
    subscription,
    onPause,
    onResume,
    onCancel,
    actionLoading,
}: {
    subscription:
        CustomerSubscriptionView;

    onPause:
        (
            subscriptionId: number,
        ) => Promise<unknown>;

    onResume:
        (
            subscriptionId: number,
        ) => Promise<unknown>;

    onCancel:
        (
            subscriptionId: number,
        ) => Promise<unknown>;

    actionLoading: boolean;
}) {
    return (
        <Card className="transition-colors hover:border-foreground/20">

            <CardContent className="p-5">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* PLAN */}

                    <div className="flex min-w-0 flex-1 items-start gap-3">

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/40">

                            <CreditCard className="size-4 text-muted-foreground" />

                        </div>

                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                                <Link
                                    href={`/portal/subscriptions/${subscription.id}`}
                                    className="truncate text-sm font-semibold hover:underline"
                                >
                                    {subscription.planName}
                                </Link>

                                <CustomerSubscriptionStatusBadge
                                    status={
                                        subscription.status
                                    }
                                />

                            </div>

                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                {
                                    subscription.planDescription
                                }
                            </p>

                        </div>

                    </div>

                    {/* PRICE */}

                    <div className="shrink-0">

                        <CustomerSubscriptionAmount
                            amount={
                                subscription.amount
                            }
                            currency={
                                subscription.currency
                            }
                            interval={
                                subscription.interval
                            }
                        />

                    </div>

                    {/* NEXT BILLING */}

                    <div className="min-w-[170px]">

                        <p className="text-xs text-muted-foreground">
                            Next billing
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">

                            <CalendarClock className="size-3.5 text-muted-foreground" />

                            {subscription.nextBilling ||
                                "No scheduled billing"}

                        </p>

                    </div>

                    {/* PERMISSION */}

                    <div className="min-w-[150px]">

                        <p className="text-xs text-muted-foreground">
                            Billing authorization
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm">

                            <ShieldCheck
                                className={
                                    subscription.billingPermissionActive
                                        ? "size-3.5 text-emerald-600 dark:text-emerald-400"
                                        : "size-3.5 text-muted-foreground"
                                }
                            />

                            {subscription.billingPermissionActive
                                ? "Active"
                                : "Unavailable"}

                        </p>

                    </div>

                    {/* ACTIONS */}

                    <CustomerSubscriptionActions
                        subscriptionId={
                            subscription.subscriptionId
                        }
                        status={
                            subscription.status
                        }
                        onPause={
                            onPause
                        }
                        onResume={
                            onResume
                        }
                        onCancel={
                            onCancel
                        }
                        loading={
                            actionLoading
                        }
                    />

                    <Button
                        render={
                            <Link
                                href={`/portal/subscriptions/${subscription.id}`}
                            >
                                View
                                <ArrowRight />
                            </Link>
                        }
                        variant="outline"
                        size="sm"
                    />

                </div>

            </CardContent>

        </Card>
    );
}