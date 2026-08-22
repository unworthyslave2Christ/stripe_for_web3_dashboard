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
    return environment === "LIVE" ? (
        <Badge variant="outline">
            Live
        </Badge>
    ) : (
        <Badge variant="secondary">
            Test
        </Badge>
    );
}