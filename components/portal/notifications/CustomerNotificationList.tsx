import {
    CustomerNotificationListItem,
} from "./CustomerNotificationListItem";

import type {
    CustomerNotificationRecord,
} from "./customer-notification.types";

const notifications: CustomerNotificationRecord[] = [
    {
        id: "notification_001",
        notificationId: "notif_8f42",
        title: "Upcoming billing",
        description:
            "Your Pro subscription will be billed $19 on Jun 12, 2025.",
        type: "BILLING_UPCOMING",
        channel: "EMAIL",
        status: "DELIVERED",
        createdAt: "2 hours ago",
        readAt: null,
        relatedSubscriptionId: 10021,
        relatedPlanName: "Pro",
    },
    {
        id: "notification_002",
        notificationId: "notif_7d28",
        title: "Billing succeeded",
        description:
            "Your Pro subscription was successfully billed $19.",
        type: "BILLING_SUCCEEDED",
        channel: "IN_APP",
        status: "READ",
        createdAt: "Yesterday",
        readAt: "Yesterday",
        relatedSubscriptionId: 10021,
        relatedPlanName: "Pro",
    },
    {
        id: "notification_003",
        notificationId: "notif_52bc",
        title: "Subscription created",
        description:
            "Your Analytics subscription is now active.",
        type: "SUBSCRIPTION_CREATED",
        channel: "IN_APP",
        status: "READ",
        createdAt: "3 days ago",
        readAt: "3 days ago",
        relatedSubscriptionId: 10031,
        relatedPlanName: "Analytics",
    },
    {
        id: "notification_004",
        notificationId: "notif_19a8",
        title: "Smart Account authorization updated",
        description:
            "Your Smart Account billing authorization was verified successfully.",
        type: "SMART_ACCOUNT_EVENT",
        channel: "EMAIL",
        status: "READ",
        createdAt: "5 days ago",
        readAt: "5 days ago",
        relatedSubscriptionId: null,
        relatedPlanName: null,
    },
];

export function CustomerNotificationList() {
    return (
        <div className="space-y-3">

            {notifications.map(
                (notification) => (
                    <CustomerNotificationListItem
                        key={
                            notification.id
                        }
                        notification={
                            notification
                        }
                    />
                ),
            )}

        </div>
    );
}