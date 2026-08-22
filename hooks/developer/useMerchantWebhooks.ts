"use client";

import {
    useMemo,
} from "react";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

import {
    appConfig,
} from "@/app/config";

import {
    merchantWebhooksDemo,
} from "@/lib/demo/merchantWebhooksDemo";

import type {
    WebhookRecord,
} from "@/components/dashboard/developers/webhooks/webhook.types";

export type MerchantWebhooksStatus =
    | "disconnected"
    | "waiting"
    | "not-implemented"
    | "ready"
    | "error";

export function useMerchantWebhooks() {
    const merchant =
        useMerchant();

    const liveSupported =
        false;

    const data =
        appConfig.demoMode
            ? merchantWebhooksDemo
            : [];

    const status:
        MerchantWebhooksStatus =
            merchant.merchantStatus ===
                "disconnected"
                ? "disconnected"
                : merchant.merchantStatus ===
                      "waiting"
                  ? "waiting"
                  : liveSupported
                    ? "ready"
                    : "not-implemented";

    const error =
        (status === "not-implemented" || status !== "ready" )
            ? new Error(
                  "Unable to load webhook endpoints.",
              )
            : null;

    const summary =
        useMemo(() => {
            const active =
                data.filter(
                    (webhook) =>
                        webhook.status ===
                        "ACTIVE",
                ).length;

            const failing =
                data.filter(
                    (webhook) =>
                        webhook.status ===
                        "FAILING",
                ).length;

            const successful =
                data.reduce(
                    (
                        total,
                        webhook,
                    ) =>
                        total +
                        webhook.successfulDeliveries,
                    0,
                );

            const failed =
                data.reduce(
                    (
                        total,
                        webhook,
                    ) =>
                        total +
                        webhook.failedDeliveries,
                    0,
                );

            const deliveries =
                successful +
                failed;

            const successRate =
                deliveries === 0
                    ? 100
                    : Math.round(
                          (
                              successful /
                              deliveries
                          ) *
                              1000,
                      ) / 10;

            return {
                total:
                    data.length,

                active,

                failing,

                successRate,
            };
        }, [data]);

    return {
        webhooks:
            data as WebhookRecord[],

        status,

        available:
            status === "ready",

        loading:
            status === "waiting",

        refreshing:
            false,

        error,

        summary,

        refresh:
            async () => undefined,
    };
}