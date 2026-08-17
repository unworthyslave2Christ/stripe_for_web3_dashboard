import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerSubscriptionStatus,
} from "./customer-subscription.types";

export function CustomerSubscriptionStatusBadge({
    status,
}: {
    status: CustomerSubscriptionStatus;
}) {
    switch (status) {
        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    Active
                </Badge>
            );

        case "PAUSED":
            return (
                <Badge variant="outline">
                    Paused
                </Badge>
            );

        case "PENDING":
            return (
                <Badge>
                    Pending
                </Badge>
            );

        case "CANCELLED":
            return (
                <Badge variant="destructive">
                    Cancelled
                </Badge>
            );
    }
}