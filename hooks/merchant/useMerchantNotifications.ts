"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    useMerchant,
} from "./useMerchant";

import {
    useMerchantClient,
} from "./useMerchantClient";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

import {
    appConfig,
} from "@/app/config";

import {
    notificationDemoRecords,
} from "@/components/dashboard/developers/notifications/notification.demo";

import type {
    NotificationRecord,
} from "@/components/dashboard/developers/notifications/notification.types";

export type MerchantNotificationsResourceStatus =
    | "waiting"
    | "loading"
    | "ready"
    | "unavailable"
    | "error";

export function useMerchantNotifications() {
    const {
        merchant,
        merchantStatus,
    } =
        useMerchant();

    const {
        client,
        ready:
            clientReady,
    } =
        useMerchantClient();

    const merchantId =
        merchant?.merchantId ??
        null;

    const demoQuery = useQuery({
        queryKey: [
            "merchant",
            "notifications",
            "demo",
        ],

        queryFn:
            async () =>
                notificationDemoRecords,

        enabled:
            appConfig.demoMode,
    });

    const query = useQuery({
        queryKey:
            merchantId !== null
                ? queryKeys.merchant.notifications(
                    merchantId,
                )
                : [
                    "merchant",
                    "notifications",
                    "none",
                ],

        queryFn:
            async (): Promise<
                NotificationRecord[]
            > => {
                if (!client) {
                    throw new Error(
                        "Merchant client is not ready.",
                    );
                }

                if (
                    merchantId === null
                ) {
                    return [];
                }

                /*
                 * Future SDK boundary.
                 *
                 * This should become:
                 *
                 * return client.getNotifications(
                 *     merchantId,
                 * );
                 *
                 * once the operation is actually
                 * implemented and exposed by the SDK.
                 */
                throw new Error(
                    "Notification retrieval is not yet implemented by the merchant SDK.",
                );
            },

        enabled:
            Boolean(
                !appConfig.demoMode &&
                client &&
                clientReady &&
                merchantId !== null &&
                merchantStatus ===
                    "ready",
            ),

        retry:
            false,
    });

    if (
        appConfig.demoMode
    ) {
        return {
            notifications:
                demoQuery.data ??
                [],

            status:
                demoQuery.isLoading
                    ? "loading"
                    : "ready" as const,

            loading:
                demoQuery.isLoading,

            refreshing:
                demoQuery.isFetching &&
                !demoQuery.isLoading,

            error:
                null,

            refresh:
                demoQuery.refetch,
        };
    }

    if (
        merchantStatus ===
            "waiting"
        ||
        merchantStatus ===
            "disconnected"
    ) {
        return {
            notifications:
                [] as NotificationRecord[],

            status:
                "waiting" as const,

            loading:
                false,

            refreshing:
                false,

            error:
                null,

            refresh:
                query.refetch,
        };
    }

    if (
        query.isLoading
    ) {
        return {
            notifications:
                [] as NotificationRecord[],

            status:
                "loading" as const,

            loading:
                true,

            refreshing:
                false,

            error:
                null,

            refresh:
                query.refetch,
        };
    }

    if (
        query.isError
    ) {
        const message =
            query.error instanceof
            Error
                ? query.error.message
                : "";

        return {
            notifications:
                [] as NotificationRecord[],

            status:
                message.includes(
                    "not yet implemented",
                )
                    ? "unavailable" as const
                    : "error" as const,

            loading:
                false,

            refreshing:
                false,

            error:
                query.error instanceof
                Error
                    ? query.error
                    : null,

            refresh:
                query.refetch,
        };
    }

    return {
        notifications:
            query.data ?? [],

        status:
            "ready" as const,

        loading:
            false,

        refreshing:
            query.isFetching,

        error:
            null,

        refresh:
            query.refetch,
    };
}