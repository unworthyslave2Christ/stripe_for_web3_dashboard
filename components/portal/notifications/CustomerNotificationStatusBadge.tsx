import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerNotificationStatus,
} from "./customer-notification.types";

export function CustomerNotificationStatusBadge({
    status,
}: {
    status: CustomerNotificationStatus;
}) {
    switch (status) {
        case "DELIVERED":
            return (
                <Badge variant="secondary">
                    Delivered
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

        case "READ":
            return (
                <Badge variant="outline">
                    Read
                </Badge>
            );
    }
}