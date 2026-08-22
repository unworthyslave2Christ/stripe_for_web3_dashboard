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
    const label: Record<
        NotificationChannelType,
        string
    > = {
        EMAIL: "Email",
        WEBHOOK: "Webhook",
        IN_APP: "In-app",
    };

    return (
        <Badge variant="outline">
            {label[channel]}
        </Badge>
    );
}