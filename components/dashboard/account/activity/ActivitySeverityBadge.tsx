import {
    Badge,
} from "@/components/ui/badge";

import type {
    ActivitySeverity,
} from "./activity.types";

export function ActivitySeverityBadge({
    severity,
}: {
    severity: ActivitySeverity;
}) {
    switch (severity) {
        case "SUCCESS":
            return (
                <Badge variant="secondary">
                    Success
                </Badge>
            );

        case "WARNING":
            return (
                <Badge variant="outline">
                    Warning
                </Badge>
            );

        case "ERROR":
            return (
                <Badge variant="destructive">
                    Error
                </Badge>
            );

        default:
            return (
                <Badge variant="outline">
                    Info
                </Badge>
            );
    }
}