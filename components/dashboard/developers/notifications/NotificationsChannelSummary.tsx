import {
    Mail,
    Webhook,
    Monitor,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type {
    NotificationRecord,
} from "./notification.types";

export function NotificationsChannelSummary({
    notifications,
}: {
    notifications: NotificationRecord[];
}) {
    const total =
        notifications.reduce(
            (sum, item) =>
                sum + item.sentCount,
            0,
        );

    const counts =
        notifications.reduce(
            (result, item) => {
                result[item.channel] +=
                    item.sentCount;

                return result;
            },
            {
                EMAIL: 0,
                WEBHOOK: 0,
                IN_APP: 0,
            },
        );

    const rows = [
        {
            label: "Email",
            count:
                counts.EMAIL,
            icon:
                Mail,
        },
        {
            label: "Webhook",
            count:
                counts.WEBHOOK,
            icon:
                Webhook,
        },
        {
            label: "In-app",
            count:
                counts.IN_APP,
            icon:
                Monitor,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Channels
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
                {rows.map(
                    ({
                        label,
                        count,
                        icon: Icon,
                    }) => (
                        <div
                            key={label}
                            className="flex items-center gap-3"
                        >
                            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                                <Icon className="size-4 text-muted-foreground" />
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-medium">
                                    {label}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {count.toLocaleString()} sent
                                </p>
                            </div>

                            <p className="text-sm font-medium">
                                {total === 0
                                    ? "0%"
                                    : `${(
                                          (count /
                                              total) *
                                          100
                                      ).toFixed(1)}%`}
                            </p>
                        </div>
                    ),
                )}

                <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="text-xs text-muted-foreground">
                        Total notifications
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                        {total.toLocaleString()}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}