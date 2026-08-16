import {
    Badge,
} from "@/components/ui/badge";

import type {
    PermissionStatus,
} from "./permission.types";

interface PermissionStatusBadgeProps {
    status: PermissionStatus;
}

export function PermissionStatusBadge({
    status,
}: PermissionStatusBadgeProps) {
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