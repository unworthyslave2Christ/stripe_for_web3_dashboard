import { Badge } from "@/components/ui/badge";

import type {
    NotificationStatus,
} from "./notification.types";

interface NotificationStatusBadgeProps {
    status: NotificationStatus;
}

export function NotificationStatusBadge({
    status,
}: NotificationStatusBadgeProps) {
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

        case "DRAFT":
            return (
                <Badge>
                    Draft
                </Badge>
            );
    }
}