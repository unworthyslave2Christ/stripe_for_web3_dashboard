"use client";

import {
    CalendarClock,
    CreditCard,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type {
    SubscriptionRecord,
} from "@/components/dashboard/platform/subscriptions/subscription.types";
import { MerchantSubscriptionRecord } from "@/types/merchant/subscription";

////////////////////////////////////////////////////////////
// CONFIGURATION
////////////////////////////////////////////////////////////

export function SubscriptionConfiguration({
    subscription,
}: {
    subscription: MerchantSubscriptionRecord;
}) {
    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

            {/* CUSTOMER */}

            <Card>

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">
                        <WalletCards className="size-4" />
                        Customer
                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-4">

                    <ConfigurationRow
                        label="Customer"
                        value={
                            subscription.customerName
                        }
                    />

                    <ConfigurationRow
                        label="Customer ID"
                        value={
                            subscription.customerId
                        }
                    />

                    <ConfigurationRow
                        label="Smart Account"
                        value={
                            subscription.smartAccount
                        }
                        mono
                    />

                    {subscription.customerWallet && (
                        <ConfigurationRow
                            label="Owner wallet"
                            value={
                                subscription.customerWallet
                            }
                            mono
                        />
                    )}

                </CardContent>

            </Card>

            {/* PLAN */}

            <Card>

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="size-4" />
                        Plan
                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-4">

                    <ConfigurationRow
                        label="Plan"
                        value={
                            subscription.planName
                        }
                    />

                    <ConfigurationRow
                        label="Plan ID"
                        value={String(
                            subscription.planId,
                        )}
                    />

                    <ConfigurationRow
                        label="Amount"
                        value={`${subscription.currency} ${subscription.amount}`}
                    />

                    <ConfigurationRow
                        label="Billing interval"
                        value={
                            formatInterval(
                                subscription.interval,
                            )
                        }
                    />

                </CardContent>

            </Card>

            {/* BILLING */}

            <Card>

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">
                        <CalendarClock className="size-4" />
                        Billing
                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-4">

                    <ConfigurationRow
                        label="Next billing"
                        value={
                            subscription.nextBilling!
                        }
                    />

                    <ConfigurationRow
                        label="Total billed"
                        value={
                            subscription.totalBilled
                        }
                    />

                    <ConfigurationRow
                        label="Successful payments"
                        value={
                            String(
                                subscription.successfulPayments ??
                                0,
                            )
                        }
                    />

                    <ConfigurationRow
                        label="Failed payments"
                        value={
                            String(
                                subscription.failedPayments ??
                                0,
                            )
                        }
                    />

                </CardContent>

            </Card>

            {/* AUTHORIZATION */}

            <Card>

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="size-4" />
                        Authorization
                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-4">

                    <ConfigurationRow
                        label="Permission"
                        value={
                            subscription.permissionId ??
                            "No permission assigned"
                        }
                        mono={
                            Boolean(
                                subscription.permissionId,
                            )
                        }
                    />

                    <ConfigurationRow
                        label="Subscription status"
                        value={
                            formatStatus(
                                subscription.status,
                            )
                        }
                    />

                    <ConfigurationRow
                        label="Created"
                        value={
                            subscription.createdAt.toLocaleString()
                        }
                    />

                </CardContent>

            </Card>

        </div>
    );
}

////////////////////////////////////////////////////////////
// ROW
////////////////////////////////////////////////////////////

function ConfigurationRow({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">

            <span className="shrink-0 text-sm text-muted-foreground">
                {label}
            </span>

            <span
                className={[
                    "max-w-[65%] break-all text-right text-sm font-medium",
                    mono
                        ? "font-mono text-xs"
                        : "",
                ].join(" ")}
            >
                {value}
            </span>

        </div>
    );
}

////////////////////////////////////////////////////////////
// FORMATTERS
////////////////////////////////////////////////////////////

function formatInterval(
    interval: SubscriptionRecord["interval"],
) {
    switch (interval) {
        case "DAY":
            return "Daily";

        case "WEEK":
            return "Weekly";

        case "YEAR":
            return "Yearly";

        case "MONTH":
        default:
            return "Monthly";
    }
}

function formatStatus(
    status: SubscriptionRecord["status"],
) {
    switch (status) {
        case "ACTIVE":
            return "Active";

        case "PAUSED":
            return "Paused";

        case "CANCELLED":
            return "Cancelled";

        case "PENDING":
            return "Pending";
    }
}