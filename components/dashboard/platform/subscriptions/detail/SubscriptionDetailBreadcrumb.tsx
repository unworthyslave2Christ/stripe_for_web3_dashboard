import {
    ChevronRight,
} from "lucide-react";

import Link from "next/link";

export function SubscriptionDetailBreadcrumb({
    subscriptionId,
}: {
    subscriptionId: number;
}) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm"
        >
            <Link
                href="/dashboard/platform/subscriptions"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Subscriptions
            </Link>

            <ChevronRight className="size-4 text-muted-foreground" />

            <span className="font-medium">
                Subscription #{subscriptionId}
            </span>
        </nav>
    );
}