import {
    Badge,
} from "@/components/ui/badge";

import type {
    SmartAccountStatus,
} from "./smart-account.types";

export function SmartAccountStatusBadge({
    status,
}: {
    status: SmartAccountStatus;
}) {
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

        case "SUSPENDED":
            return (
                <Badge variant="destructive">
                    Suspended
                </Badge>
            );
    }
}