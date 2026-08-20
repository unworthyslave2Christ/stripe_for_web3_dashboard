import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerNotificationType,
} from "@/types/customer-notification";

export function CustomerNotificationTypeBadge({
    type,
}: {
    type:
        CustomerNotificationType;
}) {
    return (
        <Badge
            variant="outline"
            className="text-[10px]"
        >
            {
                formatType(
                    type,
                )
            }
        </Badge>
    );
}

function formatType(
    type:
        CustomerNotificationType,
) {
    switch (
        type
    ) {
        case "BILLING_UPCOMING":
            return "Upcoming billing";

        case "BILLING_SUCCEEDED":
            return "Billing succeeded";

        case "BILLING_FAILED":
            return "Billing failed";

        case "SUBSCRIPTION_CREATED":
            return "Subscription created";

        case "SUBSCRIPTION_PAUSED":
            return "Subscription paused";

        case "SUBSCRIPTION_RESUMED":
            return "Subscription resumed";

        case "SUBSCRIPTION_CANCELLED":
            return "Subscription cancelled";

        case "SMART_ACCOUNT_EVENT":
            return "Smart Account";
    }
}