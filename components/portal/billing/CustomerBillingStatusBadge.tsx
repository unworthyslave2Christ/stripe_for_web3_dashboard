import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerBillingStatus,
} from "./customer-billing.types";

export function CustomerBillingStatusBadge({
    status,
}: {
    status: CustomerBillingStatus;
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