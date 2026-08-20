export type CustomerNotificationChannel =
    | "EMAIL"
    | "IN_APP"
    | "WEBHOOK";

export type CustomerNotificationStatus =
    | "DELIVERED"
    | "PENDING"
    | "FAILED"
    | "READ";

export type CustomerNotificationType =
    | "BILLING_UPCOMING"
    | "BILLING_SUCCEEDED"
    | "BILLING_FAILED"
    | "SUBSCRIPTION_CREATED"
    | "SUBSCRIPTION_PAUSED"
    | "SUBSCRIPTION_RESUMED"
    | "SUBSCRIPTION_CANCELLED"
    | "SMART_ACCOUNT_EVENT";

export interface CustomerNotificationRecord {
    id: string;

    notificationId: string;

    title: string;

    description: string;

    type:
        CustomerNotificationType;

    channel:
        CustomerNotificationChannel;

    status:
        CustomerNotificationStatus;

    createdAt: string;

    readAt:
        | string
        | null;

    relatedSubscriptionId:
        | number
        | null;

    relatedPlanName:
        | string
        | null;
}

export interface CustomerNotificationPreference {
    id: string;

    category:
        | "BILLING"
        | "SUBSCRIPTIONS"
        | "SMART_ACCOUNT"
        | "GENERAL";

    title: string;

    description: string;

    enabled: boolean;
}

export interface CustomerNotificationChannelState {
    channel:
        CustomerNotificationChannel;

    title: string;

    description: string;

    destination: string;

    status:
        | "ACTIVE"
        | "INACTIVE";
}