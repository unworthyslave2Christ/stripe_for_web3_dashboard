import Link from "next/link";

import {
    Webhook,
} from "lucide-react";

import type {
    WebhookRecord,
} from "./webhook.types";

export function WebhookIdentity({
    webhook,
}: {
    webhook: WebhookRecord;
}) {
    return (
        <div className="flex min-w-0 items-center gap-3">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">

                <Webhook className="size-4 text-muted-foreground" />

            </div>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/webhooks/${webhook.id}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {webhook.name}
                </Link>

                <p className="truncate font-mono text-xs text-muted-foreground">
                    {webhook.webhookId}
                </p>

            </div>

        </div>
    );
}