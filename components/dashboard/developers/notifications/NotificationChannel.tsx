import {
    Badge,
} from "@/components/ui/badge";

import type {
    NotificationChannel as NotificationChannelType,
} from "./notification.types";

export function NotificationChannel({
    channel,
}: {
    channel: NotificationChannelType;
}) {
    const label = {
        EMAIL: "Email",
        WEBHOOK: "Webhook",
        IN_APP: "In-app",
    }[channel];

    return (
        <Badge variant="outline">
            {label}
        </Badge>
    );
}