import { Badge } from "@/components/ui/badge";

import type { CustomerStatus } from "./customer.types";

type CustomerStatusBadgeProps = {
    status: CustomerStatus;
};

export function CustomerStatusBadge({
    status,
}: CustomerStatusBadgeProps) {
    if (status === "ACTIVE") {
        return (
            <Badge variant="secondary">
                Active
            </Badge>
        );
    }

    if (status === "SUSPENDED") {
        return (
            <Badge variant="destructive">
                Suspended
            </Badge>
        );
    }

    return (
        <Badge variant="outline">
            Inactive
        </Badge>
    );
}