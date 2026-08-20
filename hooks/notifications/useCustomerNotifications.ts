"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    appConfig,
} from "@/app/config";

import {
    customerNotificationsDemo,
} from "@/lib/demo/customerNotificationsDemo";

import type {
    CustomerNotificationRecord,
    CustomerNotificationStatus,
    CustomerNotificationType,
} from "@/types/customer-notification";

export type NotificationTypeFilter =
    | "all"
    | "billing"
    | "subscription"
    | "smart-account";

export type NotificationStatusFilter =
    | "all"
    | "read"
    | "delivered"
    | "pending"
    | "failed";

function matchesType(
    notification:
        CustomerNotificationRecord,
    filter:
        NotificationTypeFilter,
) {
    if (
        filter ===
        "all"
    ) {
        return true;
    }

    switch (
        filter
    ) {
        case "billing":
            return (
                notification.type.startsWith(
                    "BILLING_",
                )
            );

        case "subscription":
            return (
                notification.type.startsWith(
                    "SUBSCRIPTION_",
                )
            );

        case "smart-account":
            return (
                notification.type ===
                "SMART_ACCOUNT_EVENT"
            );
    }
}

function matchesStatus(
    notification:
        CustomerNotificationRecord,
    filter:
        NotificationStatusFilter,
) {
    if (
        filter ===
        "all"
    ) {
        return true;
    }

    return (
        notification.status.toLowerCase() ===
        filter
    );
}

export function useCustomerNotifications() {
    const [
        records,
        setRecords,
    ] = useState<
        CustomerNotificationRecord[]
    >(
        () =>
            appConfig.demoMode
                ? customerNotificationsDemo
                : [],
    );

    const [
        search,
        setSearchState,
    ] = useState("");

    const [
        type,
        setType,
    ] =
        useState<NotificationTypeFilter>(
            "all",
        );

    const [
        status,
        setStatus,
    ] =
        useState<NotificationStatusFilter>(
            "all",
        );

    const [
        page,
        setPage,
    ] = useState(1);

    const pageSize =
        10;

    ////////////////////////////////////////////////////////////
    // FILTER
    ////////////////////////////////////////////////////////////

    const filtered =
        useMemo(() => {

            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return records.filter(
                (
                    notification,
                ) => {

                    const matchesSearch =
                        !normalizedSearch ||
                        notification.title
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        notification.description
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        notification.notificationId
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            );

                    return (
                        matchesSearch &&
                        matchesType(
                            notification,
                            type,
                        ) &&
                        matchesStatus(
                            notification,
                            status,
                        )
                    );
                },
            );

        }, [
            records,
            search,
            type,
            status,
        ]);

    ////////////////////////////////////////////////////////////
    // PAGINATION
    ////////////////////////////////////////////////////////////

    const totalPages =
        Math.max(
            Math.ceil(
                filtered.length /
                    pageSize,
            ),
            1,
        );

    const safePage =
        Math.min(
            page,
            totalPages,
        );

    const items =
        filtered.slice(
            (
                safePage -
                1
            ) *
                pageSize,
            safePage *
                pageSize,
        );

    ////////////////////////////////////////////////////////////
    // SUMMARY
    ////////////////////////////////////////////////////////////

    const summary =
        useMemo(() => {

            const unread =
                records.filter(
                    (
                        notification,
                    ) =>
                        notification.status !==
                        "READ",
                ).length;

            const delivered =
                records.filter(
                    (
                        notification,
                    ) =>
                        notification.status ===
                            "DELIVERED" ||
                        notification.status ===
                            "READ",
                ).length;

            const failed =
                records.filter(
                    (
                        notification,
                    ) =>
                        notification.status ===
                        "FAILED",
                ).length;

            const deliverySuccess =
                records.length === 0
                    ? 0
                    : (
                        (
                            delivered
                        ) /
                        records.length
                    ) *
                        100;

            const activeChannels =
                new Set(
                    records
                        .filter(
                            (
                                notification,
                            ) =>
                                notification.status !==
                                "FAILED",
                        )
                        .map(
                            (
                                notification,
                            ) =>
                                notification.channel,
                        ),
                ).size;

            return {
                received:
                    records.length,

                delivered,

                failed,

                deliverySuccess,

                activeChannels,

                unread,
            };

        }, [
            records,
        ]);

    ////////////////////////////////////////////////////////////
    // CONTROLS
    ////////////////////////////////////////////////////////////

    function setSearch(
        value: string,
    ) {
        setSearchState(
            value,
        );

        setPage(1);
    }

    function setTypeFilter(
        value:
            NotificationTypeFilter,
    ) {
        setType(
            value,
        );

        setPage(1);
    }

    function setStatusFilter(
        value:
            NotificationStatusFilter,
    ) {
        setStatus(
            value,
        );

        setPage(1);
    }

    ////////////////////////////////////////////////////////////
    // MARK READ
    ////////////////////////////////////////////////////////////

    function markAsRead(
        notificationId: string,
    ) {
        setRecords(
            (
                current,
            ) =>
                current.map(
                    (
                        notification,
                    ) => {

                        if (
                            notification.id !==
                            notificationId
                        ) {
                            return notification;
                        }

                        return {
                            ...notification,

                            status:
                                "READ" as CustomerNotificationStatus,

                            readAt:
                                "Just now",
                        };
                    },
                ),
        );
    }

    return {
        records,

        items,

        summary,

        search,

        setSearch,

        type,

        setTypeFilter,

        status,

        setStatusFilter,

        page:
            safePage,

        pageSize,

        totalCount:
            filtered.length,

        totalPages,

        setPage,

        markAsRead,

        loading:
            false,

        refreshing:
            false,

        error:
            null,

        mode:
            appConfig.demoMode
                ? "demo"
                : "live",
    };
}