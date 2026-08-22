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

export function WebhooksTable({
    webhooks,
}: {
    webhooks: WebhookRecord[];
}) {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                {webhooks.length === 0 ? (
                    <div className="px-6 py-12 text-center">

                        <p className="text-sm font-medium">
                            No webhook endpoints
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            No webhook endpoints are available for this merchant.
                        </p>

                    </div>
                ) : (
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
                )}

            </CardContent>

        </Card>
    );
}