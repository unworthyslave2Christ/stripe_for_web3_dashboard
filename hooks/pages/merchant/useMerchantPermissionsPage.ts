"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

import {
    useMerchantPermissions,
} from "@/hooks/merchant/useMerchantPermissions";

import {
    useMerchantPermissionActions,
} from "@/hooks/merchant/useMerchantPermissionActions";

////////////////////////////////////////////////////////////
// PAGE STATUS
////////////////////////////////////////////////////////////

export type MerchantPermissionsPageStatus =
    | "waiting"
    | "loading"
    | "ready"
    | "unsupported"
    | "error";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useMerchantPermissionsPage() {
    ////////////////////////////////////////////////////////////
    // RESOURCE HOOKS
    ////////////////////////////////////////////////////////////

    const merchant =
        useMerchant();

    const permissions =
        useMerchantPermissions();

    ////////////////////////////////////////////////////////////
    // ACTION HOOKS
    ////////////////////////////////////////////////////////////

    const actions =
        useMerchantPermissionActions();

    ////////////////////////////////////////////////////////////
    // TABLE STATE
    ////////////////////////////////////////////////////////////

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        statusFilter,
        setStatusFilter,
    ] = useState<
        | "all"
        | "ACTIVE"
        | "PENDING"
        | "REVOKED"
        | "EXPIRED"
    >("all");

    const [
        scopeFilter,
        setScopeFilter,
    ] = useState<
        | "all"
        | "CHARGE"
        | "REFUND"
        | "PAUSE"
        | "RESUME"
        | "CANCEL"
        | "RECONCILE"
    >("all");

    ////////////////////////////////////////////////////////////
    // FILTERED RECORDS
    ////////////////////////////////////////////////////////////

    const filteredPermissions =
        useMemo(() => {
            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return permissions.permissions.filter(
                (permission) => {
                    const matchesSearch =
                        !normalizedSearch ||
                        permission.name
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        permission.permissionId
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        permission.operatorName
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            );

                    const matchesStatus =
                        statusFilter ===
                            "all" ||
                        permission.status ===
                            statusFilter;

                    const matchesScope =
                        scopeFilter ===
                            "all" ||
                        permission.scope.includes(
                            scopeFilter,
                        );

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesScope
                    );
                },
            );
        }, [
            permissions.permissions,
            search,
            statusFilter,
            scopeFilter,
        ]);

    ////////////////////////////////////////////////////////////
    // SUMMARY
    ////////////////////////////////////////////////////////////

    const overview =
        useMemo(() => {
            const items =
                permissions.permissions;

            const active =
                items.filter(
                    (item) =>
                        item.status ===
                        "ACTIVE",
                ).length;

            const pending =
                items.filter(
                    (item) =>
                        item.status ===
                        "PENDING",
                ).length;

            const attention =
                items.filter(
                    (item) =>
                        item.status ===
                            "EXPIRED" ||
                        item.status ===
                            "PENDING",
                ).length;

            const operators =
                new Set(
                    items.map(
                        (item) =>
                            item.operatorId,
                    ),
                ).size;

            return {
                total:
                    items.length,

                active,

                operators,

                needsAttention:
                    attention,
            };
        }, [
            permissions.permissions,
        ]);

    ////////////////////////////////////////////////////////////
    // PAGE STATUS
    ////////////////////////////////////////////////////////////

    let status:
        MerchantPermissionsPageStatus;

    if (
        merchant.merchantStatus ===
            "waiting" ||
        merchant.merchantStatus ===
            "disconnected"
    ) {
        status = "waiting";
    } else if (
        merchant.loading
    ) {
        status = "loading";
    } else if (
        merchant.error &&
        !merchant.merchant
    ) {
        status = "error";
    } else if (
        !permissions.available
    ) {
        status = "unsupported";
    } else {
        status = "ready";
    }

    ////////////////////////////////////////////////////////////
    // RETURN PAGE VIEW MODEL
    ////////////////////////////////////////////////////////////

    return {
        status,

        merchant: {
            data:
                merchant.merchant,

            loading:
                merchant.loading,

            refreshing:
                merchant.refreshing,

            error:
                merchant.error,

            refresh:
                merchant.refresh,
        },

        overview,

        table: {
            items:
                filteredPermissions,

            total:
                filteredPermissions.length,

            search,

            setSearch,

            status:
                statusFilter,

            setStatus:
                setStatusFilter,

            scope:
                scopeFilter,

            setScope:
                setScopeFilter,
        },

        permissions: {
            available:
                permissions.available,

            loading:
                permissions.loading,

            refreshing:
                permissions.refreshing,

            error:
                permissions.error,

            refresh:
                permissions.refresh,
        },

        pagination: {
            page: 1,

            pageSize:
                filteredPermissions.length,

            total:
                filteredPermissions.length,

            hasPreviousPage:
                false,

            hasNextPage:
                false,
        },

        actions,
    };
}