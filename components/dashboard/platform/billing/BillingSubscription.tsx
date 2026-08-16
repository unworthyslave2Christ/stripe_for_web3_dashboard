import Link from "next/link";

import type {
    BillingRecord,
} from "./billing.types";

export function BillingSubscription({
    billing,
}: {
    billing: BillingRecord;
}) {
    return (
        <div className="min-w-0">

            <Link
                href={`/dashboard/subscriptions/${billing.subscriptionId}`}
                className="block truncate text-sm font-medium hover:underline"
            >
                {billing.planName}
            </Link>

            <p className="text-xs text-muted-foreground">
                Subscription #{billing.subscriptionId}
            </p>

        </div>
    );
}