"use client";

import { CreditCard } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type {
    MerchantSubscriptionRecord,
} from "@/types/merchant/subscription";

import { SubscriptionTableRow } from "./SubscriptionTableRow";

export function SubscriptionsTable({
    subscriptions,
}: {
    subscriptions: MerchantSubscriptionRecord[];
}) {
    if (subscriptions.length === 0) {
        return (
            <Card>
                <CardContent className="flex min-h-[260px] items-center justify-center p-8 text-center">
                    <div className="max-w-md">
                        <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-muted">
                            <CreditCard className="size-5 text-muted-foreground" />
                        </div>

                        <p className="mt-4 text-sm font-medium">
                            No subscription records are available
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            The merchant subscription collection endpoint
                            has not yet been exposed through the SDK/API.
                            This table will populate automatically once that
                            capability is added.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1200px]">
                        <thead>
                            <tr className="border-b bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Subscription
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Customer
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Plan
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Amount
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Next billing
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Total billed
                                </th>

                                <th className="px-4 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {subscriptions.map(
                                (subscription) => (
                                    <SubscriptionTableRow
                                        key={
                                            subscription.id
                                        }
                                        subscription={
                                            subscription
                                        }
                                    />
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}