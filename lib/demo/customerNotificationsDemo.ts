import type {
    CustomerNotificationRecord,
    CustomerNotificationPreference,
    CustomerNotificationChannelState,
} from "@/types/customer-notification";

export const customerNotificationsDemo:
    CustomerNotificationRecord[] = [
        {
            id:
                "notification_001",

            notificationId:
                "notif_8f42",

            title:
                "Upcoming billing",

            description:
                "Your Pro subscription will be billed $19 on Jun 12, 2025.",

            type:
                "BILLING_UPCOMING",

            channel:
                "EMAIL",

            status:
                "DELIVERED",

            createdAt:
                "2 hours ago",

            readAt:
                null,

            relatedSubscriptionId:
                10021,

            relatedPlanName:
                "Pro",
        },

        {
            id:
                "notification_002",

            notificationId:
                "notif_7d28",

            title:
                "Billing succeeded",

            description:
                "Your Pro subscription was successfully billed $19.",

            type:
                "BILLING_SUCCEEDED",

            channel:
                "IN_APP",

            status:
                "READ",

            createdAt:
                "Yesterday",

            readAt:
                "Yesterday",

            relatedSubscriptionId:
                10021,

            relatedPlanName:
                "Pro",
        },

        {
            id:
                "notification_003",

            notificationId:
                "notif_52bc",

            title:
                "Subscription created",

            description:
                "Your Analytics subscription is now active.",

            type:
                "SUBSCRIPTION_CREATED",

            channel:
                "IN_APP",

            status:
                "READ",

            createdAt:
                "3 days ago",

            readAt:
                "3 days ago",

            relatedSubscriptionId:
                10031,

            relatedPlanName:
                "Analytics",
        },

        {
            id:
                "notification_004",

            notificationId:
                "notif_19a8",

            title:
                "Smart Account authorization updated",

            description:
                "Your Smart Account billing authorization was verified successfully.",

            type:
                "SMART_ACCOUNT_EVENT",

            channel:
                "EMAIL",

            status:
                "READ",

            createdAt:
                "5 days ago",

            readAt:
                "5 days ago",

            relatedSubscriptionId:
                null,

            relatedPlanName:
                null,
        },
    ];

export const customerNotificationPreferencesDemo:
    CustomerNotificationPreference[] = [
        {
            id:
                "billing-upcoming",

            category:
                "BILLING",

            title:
                "Upcoming billing",

            description:
                "Notify me before a scheduled subscription charge.",

            enabled:
                true,
        },

        {
            id:
                "billing-succeeded",

            category:
                "BILLING",

            title:
                "Successful billing",

            description:
                "Notify me when a recurring charge succeeds.",

            enabled:
                false,
        },

        {
            id:
                "billing-failed",

            category:
                "BILLING",

            title:
                "Failed billing",

            description:
                "Notify me when a recurring charge fails.",

            enabled:
                true,
        },

        {
            id:
                "subscription-created",

            category:
                "SUBSCRIPTIONS",

            title:
                "Subscription created",

            description:
                "Notify me when a new subscription becomes active.",

            enabled:
                true,
        },

        {
            id:
                "subscription-paused",

            category:
                "SUBSCRIPTIONS",

            title:
                "Subscription paused",

            description:
                "Notify me when a subscription is paused.",

            enabled:
                true,
        },

        {
            id:
                "subscription-cancelled",

            category:
                "SUBSCRIPTIONS",

            title:
                "Subscription cancelled",

            description:
                "Notify me when a subscription is cancelled.",

            enabled:
                true,
        },

        {
            id:
                "smart-account-event",

            category:
                "SMART_ACCOUNT",

            title:
                "Smart Account activity",

            description:
                "Notify me about important account or permission events.",

            enabled:
                true,
        },

        {
            id:
                "general-notifications",

            category:
                "GENERAL",

            title:
                "Important product notifications",

            description:
                "Receive important messages related to your Stripe for Web3 account.",

            enabled:
                true,
        },
    ];

export function buildCustomerNotificationChannels({
    email,
}: {
    email:
        | string
        | undefined;
}): CustomerNotificationChannelState[] {
    return [
        {
            channel:
                "EMAIL",

            title:
                "Email",

            description:
                "Receive customer notifications at your configured email destination.",

            destination:
                email ??
                "No customer email configured",

            status:
                email
                    ? "ACTIVE"
                    : "INACTIVE",
        },

        {
            channel:
                "IN_APP",

            title:
                "In-app",

            description:
                "Receive notifications directly inside your Stripe for Web3 portal.",

            destination:
                "This portal",

            status:
                "ACTIVE",
        },

        {
            channel:
                "WEBHOOK",

            title:
                "Webhook",

            description:
                "Receive supported customer events through your configured integration.",

            destination:
                "Not configured",

            status:
                "INACTIVE",
        },
    ];
}