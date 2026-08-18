import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerPermissionStatus,
} from "./customer-permission.types";

export function CustomerPermissionStatusBadge({
    status,
}: {
    status: CustomerPermissionStatus;
}) {
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

        case "REVOKED":
            return (
                <Badge variant="destructive">
                    Revoked
                </Badge>
            );
    }
}