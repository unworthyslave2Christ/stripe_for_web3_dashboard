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

import type {
    CustomerBillingRecord,
} from "@/types/customer-billing";

import {
    CustomerBillingAmount,
} from "./CustomerBillingAmount";

import {
    CustomerBillingStatusBadge,
} from "./CustomerBillingStatusBadge";

export function CustomerBillingListItem({
    billing,
}: {
    billing:
        CustomerBillingRecord;
}) {
    return (
        <Card className="transition-colors hover:border-foreground/20">

            <CardContent className="p-5">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

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

                    <div className="shrink-0">

                        <CustomerBillingStatusBadge
                            status={
                                billing.status
                            }
                        />

                    </div>

                    <div className="min-w-[170px]">

                        <p className="text-xs text-muted-foreground">
                            Processed
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm">

                            <CalendarClock className="size-3.5 text-muted-foreground" />

                            {billing.processedAt}

                        </p>

                    </div>

                    <div className="shrink-0">

                        <Button
                            render={
                                <Link
                                    href={`/portal/subscriptions/${billing.subscriptionId}`}
                                >
                                    Details
                                    <ExternalLink />
                                </Link>
                            }
                            variant="outline"
                            size="sm"
                        />

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}