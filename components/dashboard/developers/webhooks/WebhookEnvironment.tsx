import {
    Badge,
} from "@/components/ui/badge";

import type {
    WebhookEnvironment as WebhookEnvironmentType,
} from "./webhook.types";

export function WebhookEnvironment({
    environment,
}: {
    environment: WebhookEnvironmentType;
}) {
    if (environment === "LIVE") {
        return (
            <Badge variant="outline">
                Live
            </Badge>
        );
    }

    return (
        <Badge variant="secondary">
            Test
        </Badge>
    );
}