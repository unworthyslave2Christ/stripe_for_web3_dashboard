import { Badge } from "@/components/ui/badge";

import type {
    BillingStatus,
} from "./billing.types";

interface BillingStatusBadgeProps {
    status: BillingStatus;
}

export function BillingStatusBadge({
    status,
}: BillingStatusBadgeProps) {
    switch (status) {
        case "SUCCEEDED":
            return (
                <Badge variant="secondary">
                    Succeeded
                </Badge>
            );

        case "PENDING":
            return (
                <Badge>
                    Pending
                </Badge>
            );

        case "FAILED":
            return (
                <Badge variant="destructive">
                    Failed
                </Badge>
            );

        case "REFUNDED":
            return (
                <Badge variant="outline">
                    Refunded
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