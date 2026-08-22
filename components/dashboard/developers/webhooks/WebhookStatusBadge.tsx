import {
    Badge,
} from "@/components/ui/badge";

import type {
    WebhookStatus,
} from "./webhook.types";

export function WebhookStatusBadge({
    status,
}: {
    status: WebhookStatus;
}) {
    switch (status) {
        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    Active
                </Badge>
            );

        case "DISABLED":
            return (
                <Badge variant="outline">
                    Disabled
                </Badge>
            );

        case "FAILING":
            return (
                <Badge variant="destructive">
                    Failing
                </Badge>
            );
    }
}