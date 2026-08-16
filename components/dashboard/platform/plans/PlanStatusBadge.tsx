import {
    Badge,
} from "@/components/ui/badge";

import type {
    PlanStatus,
} from "./plan.types";

interface PlanStatusBadgeProps {
    status: PlanStatus;
}

export function PlanStatusBadge({
    status,
}: PlanStatusBadgeProps) {
    if (status === "ACTIVE") {
        return (
            <Badge variant="secondary">
                Active
            </Badge>
        );
    }

    if (status === "PAUSED") {
        return (
            <Badge variant="outline">
                Paused
            </Badge>
        );
    }

    return (
        <Badge variant="destructive">
            Archived
        </Badge>
    );
}