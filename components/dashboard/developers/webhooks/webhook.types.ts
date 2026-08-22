export type WebhookEnvironment =
    | "TEST"
    | "LIVE";

export type WebhookStatus =
    | "ACTIVE"
    | "DISABLED"
    | "FAILING";

export type WebhookEvent =
    | "customer.created"
    | "customer.updated"
    | "subscription.created"
    | "subscription.updated"
    | "subscription.paused"
    | "subscription.cancelled"
    | "billing.succeeded"
    | "billing.failed"
    | "refund.created";

export type WebhookDeliveryStatus =
    | "SUCCEEDED"
    | "FAILED"
    | "PENDING";

export interface WebhookRecord {
    id: string;

    webhookId: string;

    name: string;

    endpointUrl: string;

    environment: WebhookEnvironment;

    status: WebhookStatus;

    events: WebhookEvent[];

    createdAt: string;

    lastDeliveryAt: string | null;

    lastDeliveryStatus:
        | WebhookDeliveryStatus
        | null;

    successfulDeliveries: number;

    failedDeliveries: number;

    signingSecretConfigured: boolean;
}