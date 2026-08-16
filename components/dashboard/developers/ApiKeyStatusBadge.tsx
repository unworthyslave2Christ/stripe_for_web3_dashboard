import {
    Badge,
} from "@/components/ui/badge";

import type {
    ApiKeyStatus,
} from "./developer.types";

export function ApiKeyStatusBadge({
    status,
}: {
    status: ApiKeyStatus;
}) {
    switch (status) {
        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    Active
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