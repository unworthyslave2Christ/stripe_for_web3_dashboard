"use client";

import {
    useMemo,
} from "react";

import {
    useMerchantWebhooks,
} from "@/hooks/developer/useMerchantWebhooks";

import {
    useCreateWebhook,
} from "@/hooks/developer/useCreateWebhook";

import type {
    WebhookEnvironment,
    WebhookEvent,
    WebhookStatus,
} from "@/components/dashboard/developers/webhooks/webhook.types";

export function useWebhooksPage() {
    const webhooks =
        useMerchantWebhooks();

    const create =
        useCreateWebhook();

    const summary =
        webhooks.summary;

    const table =
        useMemo(
            () => ({
                items:
                    webhooks.webhooks,

                search: "",

                environment:
                    "all" as
                        | "all"
                        | WebhookEnvironment,

                status:
                    "all" as
                        | "all"
                        | WebhookStatus,

                event:
                    "all" as
                        | "all"
                        | WebhookEvent,
            }),
            [webhooks.webhooks],
        );

    const filtered =
        useMemo(() => {
            let items =
                webhooks.webhooks;

            if (
                table.environment !==
                "all"
            ) {
                items =
                    items.filter(
                        (webhook) =>
                            webhook.environment ===
                            table.environment,
                    );
            }

            if (
                table.status !==
                "all"
            ) {
                items =
                    items.filter(
                        (webhook) =>
                            webhook.status ===
                            table.status,
                    );
            }

            if (
                table.event !==
                "all"
            ) {
                items =
                    items.filter(
                        (webhook) =>
                            webhook.events.includes(
                                table.event as WebhookEvent,
                            ),
                    );
            }

            return items;
        }, [
            table.environment,
            table.status,
            table.event,
            webhooks.webhooks,
        ]);

    return {
        merchant: {
            status:
                webhooks.status,

            error:
                webhooks.error,
        },

        overview: {
            data:
                summary,
        },

        health: {
            data:
                summary,

            refreshing:
                webhooks.refreshing,
        },

        table: {
            data:
                filtered,

            loading:
                webhooks.loading,

            refreshing:
                webhooks.refreshing,

            available:
                webhooks.available,
        },

        actions: {
            refresh: {
                available:
                    webhooks.status ===
                    "ready" ||
                    webhooks.status ===
                    "not-implemented",

                loading:
                    webhooks.refreshing,

                run:
                    webhooks.refresh,
            },

            create: {
                available:
                    create.available,

                loading:
                    create.loading,

                error:
                    create.error,

                run:
                    create.createWebhook,
            },
        },
    };
}