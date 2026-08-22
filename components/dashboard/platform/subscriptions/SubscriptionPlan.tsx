import Link from "next/link";

import type {
    MerchantSubscriptionRecord,
} from "@/types/merchant/subscription";

export function SubscriptionPlan({
    subscription,
}: {
    subscription: MerchantSubscriptionRecord;
}) {
    return (
        <div className="min-w-0">
            <Link
                href={`/dashboard/platform/plans/${subscription.planId}`}
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