import {
    Badge,
} from "@/components/ui/badge";

import type {
    ActivityStatus,
} from "./activity.types";

export function ActivityStatusBadge({
    status,
}: {
    status: ActivityStatus;
}) {
    switch (status) {
        case "COMPLETED":
            return (
                <Badge variant="secondary">
                    Completed
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
                <Badge variant="destructive">
                    Failed
                </Badge>
            );
    }
}