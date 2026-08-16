import { Badge } from "@/components/ui/badge";

import type {
    SubscriptionStatus,
} from "./subscription.types";

interface SubscriptionStatusBadgeProps {
    status: SubscriptionStatus;
}

export function SubscriptionStatusBadge({
    status,
}: SubscriptionStatusBadgeProps) {
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

        case "CANCELLED":
            return (
                <Badge variant="destructive">
                    Cancelled
                </Badge>
            );

        case "PENDING":
            return (
                <Badge>
                    Pending
                </Badge>
            );

        default:
            return (
                <Badge variant="outline">
                    Unknown
                </Badge>
            );
    }
}