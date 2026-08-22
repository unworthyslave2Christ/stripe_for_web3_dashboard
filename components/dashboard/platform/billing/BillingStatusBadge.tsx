import {
    Badge,
} from "@/components/ui/badge";

import type {
    BillingStatus,
} from "./billing.types";

export function BillingStatusBadge({
    status,
}: {
    status: BillingStatus;
}) {
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
    }
}