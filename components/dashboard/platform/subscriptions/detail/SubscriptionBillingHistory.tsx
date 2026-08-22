"use client";

import {
    ReceiptText,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function SubscriptionBillingHistory() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Billing history
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 p-6 text-center">

                    <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <ReceiptText className="size-4 text-muted-foreground" />
                    </div>

                    <p className="mt-3 text-sm font-medium">
                        Billing events are not exposed yet
                    </p>

                    <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
                        Individual invoice and payment events will appear here
                        once the merchant billing-history API is exposed.
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}