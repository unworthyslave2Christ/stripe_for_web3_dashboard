import {
    CheckCircle2,
    PauseCircle,
    ShieldAlert,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerPermissionStatus,
} from "@/types/customer-permission";

export function CustomerPermissionStatusBadge({
    status,
}: {
    status:
        CustomerPermissionStatus;
}) {
    switch (
        status
    ) {
        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    <CheckCircle2 />
                    Active
                </Badge>
            );

        case "PAUSED":
            return (
                <Badge variant="outline">
                    <PauseCircle />
                    Paused
                </Badge>
            );

        case "REVOKED":
            return (
                <Badge variant="destructive">
                    <ShieldAlert />
                    Revoked
                </Badge>
            );
    }
}