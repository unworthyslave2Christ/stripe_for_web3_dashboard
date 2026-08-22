import {
    Badge,
} from "@/components/ui/badge";

import type {
    BillingOperatorStatus,
} from "./billing-operator.types";

export function BillingOperatorStatusBadge({
    status,
}: {
    status: BillingOperatorStatus;
}) {
    switch (status) {
        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    Active
                </Badge>
            );

        case "PENDING":
            return (
                <Badge>
                    Pending
                </Badge>
            );

        case "REVOKED":
            return (
                <Badge variant="destructive">
                    Revoked
                </Badge>
            );

        case "EXPIRED":
            return (
                <Badge variant="outline">
                    Expired
                </Badge>
            );
    }
}