import type {
    WebhookRecord,
} from "@/components/dashboard/developers/webhooks/webhook.types";

export const merchantWebhooksDemo: WebhookRecord[] = [
    {
        id: "webhook_001",

        webhookId: "wh_live_primary",

        name: "Production backend",

        endpointUrl:
            "https://api.acmeflow.com/webhooks/stripe-for-web3",

        environment: "LIVE",

        status: "ACTIVE",

        events: [
            "customer.created",
            "customer.updated",
            "subscription.created",
            "subscription.updated",
            "billing.succeeded",
            "billing.failed",
        ],

        createdAt: "Jun 01, 2025",

        lastDeliveryAt: "2 minutes ago",

        lastDeliveryStatus:
            "SUCCEEDED",

        successfulDeliveries: 9872,

        failedDeliveries: 34,

        signingSecretConfigured: true,
    },

    {
        id: "webhook_002",

        webhookId: "wh_live_worker",

        name: "Billing worker",

        endpointUrl:
            "https://worker.acmeflow.com/events",

        environment: "LIVE",

        status: "ACTIVE",

        events: [
            "subscription.created",
            "subscription.paused",
            "subscription.cancelled",
            "billing.succeeded",
        ],

        createdAt: "May 27, 2025",

        lastDeliveryAt: "8 minutes ago",

        lastDeliveryStatus:
            "SUCCEEDED",

        successfulDeliveries: 6231,

        failedDeliveries: 21,

        signingSecretConfigured: true,
    },

    {
        id: "webhook_003",

        webhookId: "wh_test_frontend",

        name: "Test integration",

        endpointUrl:
            "https://test.acmeflow.com/webhooks/events",

        environment: "TEST",

        status: "ACTIVE",

        events: [
            "customer.created",
            "subscription.created",
        ],

        createdAt: "May 21, 2025",

        lastDeliveryAt: "42 minutes ago",

        lastDeliveryStatus:
            "SUCCEEDED",

        successfulDeliveries: 1321,

        failedDeliveries: 8,

        signingSecretConfigured: true,
    },

    {
        id: "webhook_004",

        webhookId: "wh_test_legacy",

        name: "Legacy endpoint",

        endpointUrl:
            "https://legacy.acmeflow.com/events",

        environment: "TEST",

        status: "FAILING",

        events: [
            "billing.succeeded",
            "billing.failed",
        ],

        createdAt: "Apr 12, 2025",

        lastDeliveryAt: "3 days ago",

        lastDeliveryStatus:
            "FAILED",

        successfulDeliveries: 812,

        failedDeliveries: 147,

        signingSecretConfigured: true,
    },
];