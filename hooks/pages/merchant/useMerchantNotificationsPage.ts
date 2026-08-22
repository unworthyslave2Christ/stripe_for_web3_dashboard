"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    appConfig,
} from "@/app/config";

import {
    useMerchantNotifications,
} from "@/hooks/merchant/useMerchantNotifications";

import type {
    NotificationChannel,
    NotificationStatus,
} from "@/components/dashboard/developers/notifications/notification.types";

export type NotificationPageStatus =
    | "waiting"
    | "loading"
    | "ready"
    | "unavailable"
    | "error";

export function useMerchantNotificationsPage() {
    const resource =
        useMerchantNotifications();

    const [
        search,
        setSearch,
    ] =
        useState("");

    const [
        status,
        setStatus,
    ] =
        useState<
            | "all"
            | NotificationStatus
        >("all");

    const [
        channel,
        setChannel,
    ] =
        useState<
            | "all"
            | NotificationChannel
        >("all");

    const filtered =
        useMemo(() => {
            const normalized =
                search
                    .trim()
                    .toLowerCase();

            return resource.notifications.filter(
                (notification) => {
                    const matchesSearch =
                        !normalized ||
                        notification.name
                            .toLowerCase()
                            .includes(
                                normalized,
                            ) ||
                        notification.notificationId
                            .toLowerCase()
                            .includes(
                                normalized,
                            ) ||
                        notification.description
                            .toLowerCase()
                            .includes(
                                normalized,
                            );

                    const matchesStatus =
                        status ===
                            "all" ||
                        notification.status ===
                            status;

                    const matchesChannel =
                        channel ===
                            "all" ||
                        notification.channel ===
                            channel;

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesChannel
                    );
                },
            );
        }, [
            resource.notifications,
            search,
            status,
            channel,
        ]);

    const summary =
        useMemo(() => {
            const items =
                resource.notifications;

            const active =
                items.filter(
                    (item) =>
                        item.status ===
                        "ACTIVE",
                );

            const sent =
                items.reduce(
                    (
                        total,
                        item,
                    ) =>
                        total +
                        item.sentCount,
                    0,
                );

            const failed =
                items.reduce(
                    (
                        total,
                        item,
                    ) =>
                        total +
                        item.failedCount,
                    0,
                );

            const deliveries =
                sent +
                failed;

            const successRate =
                deliveries ===
                0
                    ? 100
                    :
                    Math.round(
                        (
                            sent /
                            deliveries
                        ) *
                            1000,
                    ) / 10;

            const needsAttention =
                items.filter(
                    (item) =>
                        item.deliveryStatus ===
                        "FAILED",
                ).length;

            return {
                total:
                    items.length,

                active:
                    active.length,

                sent,

                failed,

                successRate,

                needsAttention,
            };
        }, [
            resource.notifications,
        ]);

    return {
        mode:
            appConfig.demoMode
                ? "demo"
                : "live",

        status:
            resource.status,

        notifications:
            resource.notifications,

        filteredNotifications:
            filtered,

        summary,

        table: {
            search,
            setSearch,

            status,
            setStatus,

            channel,
            setChannel,
        },

        actions: {
            refresh: {
                run:
                    resource.refresh,

                loading:
                    resource.refreshing,

                available:
                    resource.status ===
                    "ready",
            },
        },

        error:
            resource.error,
    };
}