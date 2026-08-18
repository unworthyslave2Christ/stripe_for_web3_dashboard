import Link from "next/link";

import {
    ArrowRight,
    CalendarClock,
    CreditCard,
    ShieldCheck,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    CustomerSubscriptionActions,
} from "./CustomerSubscriptionActions";

import {
    CustomerSubscriptionAmount,
} from "./CustomerSubscriptionAmount";

import {
    CustomerSubscriptionStatusBadge,
} from "./CustomerSubscriptionStatusBadge";

import type {
    CustomerSubscriptionRecord,
} from "./customer-subscription.types";

export function CustomerSubscriptionListItem({
    subscription,
}: {
    subscription: CustomerSubscriptionRecord;
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
                                {subscription.planDescription}
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

                    <div className="min-w-[150px]">

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

                    <div className="min-w-[130px]">

                        <p className="text-xs text-muted-foreground">
                            Billing authorization
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm">

                            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />

                            Active

                        </p>

                    </div>

                    {/* ACTION */}

                    <div className="flex shrink-0 flex-wrap gap-2">

                        <CustomerSubscriptionActions
                            subscriptionId={
                                subscription.subscriptionId
                            }
                        />

                        <Link
                            href={`/portal/subscriptions/${subscription.id}`}
                            className="flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            View
                            <ArrowRight className="size-3.5" />
                        </Link>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}