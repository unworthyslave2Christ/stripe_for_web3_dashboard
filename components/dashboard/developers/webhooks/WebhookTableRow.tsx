import {
    WebhookActions,
} from "./WebhookActions";

import {
    WebhookEnvironment,
} from "./WebhookEnvironment";

import {
    WebhookEvents,
} from "./WebhookEvents";

import {
    WebhookHealth,
} from "./WebhookHealth";

import {
    WebhookIdentity,
} from "./WebhookIdentity";

import {
    WebhookLastDelivery,
} from "./WebhookLastDelivery";

import {
    WebhookStatusBadge,
} from "./WebhookStatusBadge";

import type {
    WebhookRecord,
} from "./webhook.types";

export function WebhookTableRow({
    webhook,
}: {
    webhook: WebhookRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">
                <WebhookIdentity
                    webhook={webhook}
                />
            </td>

            <td className="px-4 py-4">
                <WebhookEnvironment
                    environment={
                        webhook.environment
                    }
                />
            </td>

            <td className="px-4 py-4">
                <WebhookEvents
                    events={webhook.events}
                />
            </td>

            <td className="px-4 py-4">
                <WebhookStatusBadge
                    status={webhook.status}
                />
            </td>

            <td className="px-4 py-4">
                <WebhookHealth
                    successfulDeliveries={
                        webhook.successfulDeliveries
                    }
                    failedDeliveries={
                        webhook.failedDeliveries
                    }
                />
            </td>

            <td className="px-4 py-4">
                <WebhookLastDelivery
                    value={
                        webhook.lastDeliveryAt
                    }
                />
            </td>

            <td className="px-4 py-4 text-right">
                <WebhookActions
                    webhookId={
                        webhook.webhookId
                    }
                />
            </td>

        </tr>
    );
}