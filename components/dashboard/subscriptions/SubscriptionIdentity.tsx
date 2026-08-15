import Link from "next/link";

import {
    CreditCard,
} from "lucide-react";

import type {
    SubscriptionRecord,
} from "./subscription.types";

interface SubscriptionIdentityProps {
    subscription: SubscriptionRecord;
}

export function SubscriptionIdentity({
    subscription,
}: SubscriptionIdentityProps) {
    return (
        <div className="flex min-w-0 items-center gap-3">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                <CreditCard className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/subscriptions/${subscription.id}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    Subscription #{subscription.subscriptionId}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    {subscription.id}
                </p>

            </div>

        </div>
    );
}