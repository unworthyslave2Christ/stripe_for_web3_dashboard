import type { PlanRecord } from "@stripe-for-web3/core";

import { Badge } from "@/components/ui/badge";

interface PlanStatusBadgeProps {
    status: PlanRecord["status"];
}

export function PlanStatusBadge({
    status,
}: PlanStatusBadgeProps) {
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

        case "ARCHIVED":
            return (
                <Badge variant="destructive">
                    Archived
                </Badge>
            );

        default:
            return (
                <Badge variant="outline">
                    {String(status)}
                </Badge>
            );
    }
}