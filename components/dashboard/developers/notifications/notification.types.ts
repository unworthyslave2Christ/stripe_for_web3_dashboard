export type NotificationChannel =
    | "EMAIL"
    | "WEBHOOK"
    | "IN_APP";

export type NotificationStatus =
    | "ACTIVE"
    | "PAUSED"
    | "DRAFT";

export type NotificationTrigger =
    | "BILLING_SUCCEEDED"
    | "BILLING_FAILED"
    | "SUBSCRIPTION_CREATED"
    | "SUBSCRIPTION_PAUSED"
    | "SUBSCRIPTION_CANCELLED"
    | "SUBSCRIPTION_RENEWAL"
    | "PLAN_ARCHIVED"
    | "SMART_ACCOUNT_EVENT";

export type NotificationDeliveryStatus =
    | "SUCCEEDED"
    | "PENDING"
    | "FAILED";

export interface NotificationRecord {
    id: string;

    notificationId: string;

    name: string;

    description: string;

    channel: NotificationChannel;

    trigger: NotificationTrigger;

    status: NotificationStatus;

    audience: string;

    createdAt: string;

    lastSentAt: string | null;

    deliveryStatus: NotificationDeliveryStatus;

    sentCount: number;

    failedCount: number;
}