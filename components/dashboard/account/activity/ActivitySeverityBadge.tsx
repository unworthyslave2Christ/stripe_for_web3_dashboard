import { Badge } from "@/components/ui/badge";

import type {
    ActivitySeverity,
} from "./activity.types";

interface ActivitySeverityBadgeProps {
    severity: ActivitySeverity;
}

export function ActivitySeverityBadge({
    severity,
}: ActivitySeverityBadgeProps) {
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

        case "INFO":
        default:
            return (
                <Badge variant="outline">
                    Info
                </Badge>
            );
    }
}