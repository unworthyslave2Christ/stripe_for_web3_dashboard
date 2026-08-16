import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    WebhookTableRow,
} from "./WebhookTableRow";

import type {
    WebhookRecord,
} from "./webhook.types";

const webhooks: WebhookRecord[] = [
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
        lastDeliveryStatus: "SUCCEEDED",
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
        lastDeliveryStatus: "SUCCEEDED",
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
        lastDeliveryStatus: "SUCCEEDED",
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
        lastDeliveryStatus: "FAILED",
        successfulDeliveries: 812,
        failedDeliveries: 147,
        signingSecretConfigured: true,
    },
];

export function WebhooksTable() {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1200px]">

                        <thead>

                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Endpoint
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Environment
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Events
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Health
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Last delivery
                                </th>

                                <th className="px-4 py-3" />

                            </tr>

                        </thead>

                        <tbody>

                            {webhooks.map(
                                (webhook) => (
                                    <WebhookTableRow
                                        key={
                                            webhook.id
                                        }
                                        webhook={
                                            webhook
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