import Link from "next/link";

import {
    CalendarClock,
    CreditCard,
    ExternalLink,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    CustomerBillingAmount,
} from "./CustomerBillingAmount";

import {
    CustomerBillingStatusBadge,
} from "./CustomerBillingStatusBadge";

import type {
    CustomerBillingRecord,
} from "./customer-billing.types";

export function CustomerBillingListItem({
    billing,
}: {
    billing: CustomerBillingRecord;
}) {
    return (
        <Card className="transition-colors hover:border-foreground/20">

            <CardContent className="p-5">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* BILLING IDENTITY */}

                    <div className="flex min-w-0 flex-1 items-start gap-3">

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/40">

                            <CreditCard className="size-4 text-muted-foreground" />

                        </div>

                        <div className="min-w-0">

                            <Link
                                href={`/portal/subscriptions/${billing.subscriptionId}`}
                                className="block truncate text-sm font-semibold hover:underline"
                            >
                                {billing.planName}
                            </Link>

                            <p className="mt-1 font-mono text-xs text-muted-foreground">
                                {billing.billingId}
                            </p>

                        </div>

                    </div>

                    {/* AMOUNT */}

                    <div className="shrink-0">

                        <CustomerBillingAmount
                            amount={
                                billing.amount
                            }
                            currency={
                                billing.currency
                            }
                            interval={
                                billing.interval
                            }
                        />

                    </div>

                    {/* STATUS */}

                    <div className="shrink-0">

                        <CustomerBillingStatusBadge
                            status={
                                billing.status
                            }
                        />

                    </div>

                    {/* DATE */}

                    <div className="min-w-[150px]">

                        <p className="text-xs text-muted-foreground">
                            Processed
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm">

                            <CalendarClock className="size-3.5 text-muted-foreground" />

                            {billing.processedAt}

                        </p>

                    </div>

                    {/* ACTION */}

                    <div className="shrink-0">

                        <Button
                            variant="outline"
                            size="sm"
                        >
                            Details
                            <ExternalLink />
                        </Button>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}