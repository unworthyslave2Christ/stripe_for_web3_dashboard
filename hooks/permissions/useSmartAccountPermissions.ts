"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    appConfig,
} from "@/app/config";

import {
    customerPermissionsDemo,
} from "@/lib/demo/customerPermissionsDemo";

import type {
    CustomerPermissionRecord,
    CustomerPermissionStatus,
} from "@/types/customer-permission";

export type PermissionStatusFilter =
    | "all"
    | "active"
    | "paused"
    | "revoked";

export function useSmartAccountPermissions({
    smartAccount,
}: {
    smartAccount:
        | string
        | undefined;
}) {
    const [
        search,
        setSearchState,
    ] = useState("");

    const [
        status,
        setStatus,
    ] =
        useState<PermissionStatusFilter>(
            "all",
        );

    const [
        page,
        setPage,
    ] = useState(1);

    const pageSize =
        10;

    ////////////////////////////////////////////////////////////
    // SOURCE
    ////////////////////////////////////////////////////////////

    const records =
        useMemo<
            CustomerPermissionRecord[]
        >(() => {

            if (
                !appConfig.demoMode
            ) {
                return [];
            }

            return customerPermissionsDemo.map(
                (
                    permission,
                ) => ({
                    ...permission,

                    smartAccount:
                        smartAccount ??
                        "",
                }),
            );

        }, [
            smartAccount,
        ]);

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
                    permission,
                ) => {

                    const matchesSearch =
                        !normalizedSearch ||
                        permission.name
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        permission.description
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        permission.permissionId
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            );

                    const matchesStatus =
                        status ===
                            "all" ||
                        permission.status
                            .toLowerCase() ===
                            status;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                },
            );

        }, [
            records,
            search,
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

            const active =
                records.filter(
                    (
                        permission,
                    ) =>
                        permission.status ===
                        "ACTIVE",
                );

            const paused =
                records.filter(
                    (
                        permission,
                    ) =>
                        permission.status ===
                        "PAUSED",
                );

            const revoked =
                records.filter(
                    (
                        permission,
                    ) =>
                        permission.status ===
                        "REVOKED",
                );

            const scopes =
                new Set(
                    active.flatMap(
                        (
                            permission,
                        ) =>
                            permission.scope,
                    ),
                );

            const authorizedSubscriptions =
                new Set(
                    active.flatMap(
                        (
                            permission,
                        ) =>
                            permission.subscriptionIds,
                    ),
                );

            return {
                active:
                    active.length,

                paused:
                    paused.length,

                revoked:
                    revoked.length,

                total:
                    records.length,

                capabilityCount:
                    scopes.size,

                authorizedSubscriptionCount:
                    authorizedSubscriptions.size,

                needsAttention:
                    paused.length +
                    revoked.length,
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

    function setStatusFilter(
        value:
            PermissionStatusFilter,
    ) {
        setStatus(
            value,
        );

        setPage(1);
    }

    ////////////////////////////////////////////////////////////
    // RESULT
    ////////////////////////////////////////////////////////////

    return {
        records,

        items,

        summary,

        search,

        setSearch,

        status,

        setStatusFilter,

        page:
            safePage,

        pageSize,

        totalCount:
            filtered.length,

        totalPages,

        setPage,

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