import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    NotificationTableRow,
} from "./NotificationTableRow";

import type {
    NotificationRecord,
} from "./notification.types";

const notifications: NotificationRecord[] = [
    {
        id: "notification_001",
        notificationId: "notif_billing_failed",
        name: "Failed billing alert",
        description:
            "Notify the merchant when a recurring billing attempt fails.",
        channel: "EMAIL",
        trigger: "BILLING_FAILED",
        status: "ACTIVE",
        audience: "Merchant billing administrators",
        createdAt: "Jun 01, 2025",
        lastSentAt: "18 minutes ago",
        deliveryStatus: "SUCCEEDED",
        sentCount: 423,
        failedCount: 2,
    },
    {
        id: "notification_002",
        notificationId: "notif_subscription_created",
        name: "New subscription",
        description:
            "Notify the merchant when a customer creates a subscription.",
        channel: "WEBHOOK",
        trigger: "SUBSCRIPTION_CREATED",
        status: "ACTIVE",
        audience: "Merchant backend",
        createdAt: "May 27, 2025",
        lastSentAt: "5 minutes ago",
        deliveryStatus: "SUCCEEDED",
        sentCount: 1842,
        failedCount: 4,
    },
    {
        id: "notification_003",
        notificationId: "notif_renewal",
        name: "Upcoming renewal",
        description:
            "Notify customers before their subscription renews.",
        channel: "EMAIL",
        trigger: "SUBSCRIPTION_RENEWAL",
        status: "ACTIVE",
        audience: "Customers",
        createdAt: "May 21, 2025",
        lastSentAt: "1 hour ago",
        deliveryStatus: "SUCCEEDED",
        sentCount: 7921,
        failedCount: 33,
    },
    {
        id: "notification_004",
        notificationId: "notif_plan_archived",
        name: "Plan archived",
        description:
            "Notify merchant administrators when a plan is archived.",
        channel: "IN_APP",
        trigger: "PLAN_ARCHIVED",
        status: "PAUSED",
        audience: "Merchant administrators",
        createdAt: "Apr 12, 2025",
        lastSentAt: "May 10, 2025",
        deliveryStatus: "FAILED",
        sentCount: 17,
        failedCount: 3,
    },
];

export function NotificationsTable() {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1200px]">

                        <thead>

                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Notification
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Channel
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Trigger
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Delivery
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Last sent
                                </th>

                                <th className="px-4 py-3" />

                            </tr>

                        </thead>

                        <tbody>

                            {notifications.map(
                                (notification) => (
                                    <NotificationTableRow
                                        key={
                                            notification.id
                                        }
                                        notification={
                                            notification
                                        }
                                    />
                                ),
                            )}

                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}