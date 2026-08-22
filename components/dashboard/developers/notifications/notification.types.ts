////////////////////////////////////////////////////////////
// CHANNEL
////////////////////////////////////////////////////////////

export type NotificationChannel =
    | "EMAIL"
    | "WEBHOOK"
    | "IN_APP";

////////////////////////////////////////////////////////////
// STATUS
////////////////////////////////////////////////////////////

export type NotificationStatus =
    | "ACTIVE"
    | "PAUSED"
    | "DRAFT";

////////////////////////////////////////////////////////////
// TRIGGER
////////////////////////////////////////////////////////////

export type NotificationTrigger =
    | "BILLING_SUCCEEDED"
    | "BILLING_FAILED"
    | "SUBSCRIPTION_CREATED"
    | "SUBSCRIPTION_PAUSED"
    | "SUBSCRIPTION_CANCELLED"
    | "SUBSCRIPTION_RENEWAL"
    | "PLAN_ARCHIVED"
    | "SMART_ACCOUNT_EVENT";

////////////////////////////////////////////////////////////
// DELIVERY
////////////////////////////////////////////////////////////

export type NotificationDeliveryStatus =
    | "SUCCEEDED"
    | "PENDING"
    | "FAILED";

////////////////////////////////////////////////////////////
// RECORD
////////////////////////////////////////////////////////////

export interface NotificationRecord {
    id: string;

    notificationId: string;

    name: string;

    description: string;

    channel: NotificationChannel;

    trigger: NotificationTrigger;

    status: NotificationStatus;

    audience: string;

    createdAt: Date;

    updatedAt: Date;

    lastSentAt: Date | null;

    deliveryStatus: NotificationDeliveryStatus;

    sentCount: number;

    failedCount: number;
}