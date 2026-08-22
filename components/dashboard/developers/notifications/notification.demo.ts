import type {
    NotificationRecord,
} from "./notification.types";

export const notificationDemoRecords:
    NotificationRecord[] = [
        {
            id: "notification_001",
            notificationId:
                "notif_billing_failed",
            name:
                "Failed billing alert",
            description:
                "Notify the merchant when a recurring billing attempt fails.",
            channel:
                "EMAIL",
            trigger:
                "BILLING_FAILED",
            status:
                "ACTIVE",
            audience:
                "Merchant billing administrators",
            createdAt:
                new Date("2025-06-01T09:00:00Z"),
            updatedAt:
                new Date("2025-06-01T09:00:00Z"),
            lastSentAt:
                new Date("2025-06-12T10:42:00Z"),
            deliveryStatus:
                "SUCCEEDED",
            sentCount:
                423,
            failedCount:
                2,
        },

        {
            id: "notification_002",
            notificationId:
                "notif_subscription_created",
            name:
                "New subscription",
            description:
                "Notify the merchant when a customer creates a subscription.",
            channel:
                "WEBHOOK",
            trigger:
                "SUBSCRIPTION_CREATED",
            status:
                "ACTIVE",
            audience:
                "Merchant backend",
            createdAt:
                new Date("2025-05-27T09:00:00Z"),
            updatedAt:
                new Date("2025-05-27T09:00:00Z"),
            lastSentAt:
                new Date("2025-06-12T10:55:00Z"),
            deliveryStatus:
                "SUCCEEDED",
            sentCount:
                1842,
            failedCount:
                4,
        },

        {
            id: "notification_003",
            notificationId:
                "notif_renewal",
            name:
                "Upcoming renewal",
            description:
                "Notify customers before their subscription renews.",
            channel:
                "EMAIL",
            trigger:
                "SUBSCRIPTION_RENEWAL",
            status:
                "ACTIVE",
            audience:
                "Customers",
            createdAt:
                new Date("2025-05-21T09:00:00Z"),
            updatedAt:
                new Date("2025-05-21T09:00:00Z"),
            lastSentAt:
                new Date("2025-06-12T09:55:00Z"),
            deliveryStatus:
                "SUCCEEDED",
            sentCount:
                7921,
            failedCount:
                33,
        },

        {
            id: "notification_004",
            notificationId:
                "notif_plan_archived",
            name:
                "Plan archived",
            description:
                "Notify merchant administrators when a plan is archived.",
            channel:
                "IN_APP",
            trigger:
                "PLAN_ARCHIVED",
            status:
                "PAUSED",
            audience:
                "Merchant administrators",
            createdAt:
                new Date("2025-04-12T09:00:00Z"),
            updatedAt:
                new Date("2025-05-10T09:00:00Z"),
            lastSentAt:
                new Date("2025-05-10T11:00:00Z"),
            deliveryStatus:
                "FAILED",
            sentCount:
                17,
            failedCount:
                3,
        },
    ];