import Link from "next/link";

import type {
    SubscriptionRecord,
} from "./subscription.types";

export function SubscriptionPlan({
    subscription,
}: {
    subscription: SubscriptionRecord;
}) {
    return (
        <div className="min-w-0">

            <Link
                href={`/dashboard/plans/${subscription.planId}`}
                className="block truncate text-sm font-medium hover:underline"
            >
                {subscription.planName}
            </Link>

            <p className="text-xs text-muted-foreground">
                Plan #{subscription.planId}
            </p>

        </div>
    );
}