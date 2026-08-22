"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

import type {
    ApiKeyRecord,
    ApiKeyActionAvailability,
} from "@/components/dashboard/developers/developer.types";

export type DeveloperEnvironmentFilter =
    | "all"
    | "test"
    | "live";

export type ApiKeyStatusFilter =
    | "all"
    | "active"
    | "revoked"
    | "expired";

export function useMerchantApiKeysPage() {
    const merchant =
        useMerchant();

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        environment,
        setEnvironment,
    ] =
        useState<DeveloperEnvironmentFilter>(
            "all",
        );

    const [
        status,
        setStatus,
    ] =
        useState<ApiKeyStatusFilter>(
            "all",
        );

    /*
     * API-key resource operations are intentionally
     * not called here yet.
     *
     * The SDK surface supplied so far does not expose
     * a canonical merchant API-key resource.
     */
    const apiKeys: ApiKeyRecord[] = [];

    const filteredApiKeys =
        useMemo(() => {
            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return apiKeys.filter(
                (apiKey) => {

                    const matchesSearch =
                        !normalizedSearch ||
                        apiKey.name
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        apiKey.keyId
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        apiKey.prefix
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            );

                    const matchesEnvironment =
                        environment ===
                            "all" ||
                        (
                            environment ===
                                "test" &&
                            apiKey.environment ===
                                "TEST"
                        ) ||
                        (
                            environment ===
                                "live" &&
                            apiKey.environment ===
                                "LIVE"
                        );

                    const matchesStatus =
                        status ===
                            "all" ||
                        (
                            status ===
                                "active" &&
                            apiKey.status ===
                                "ACTIVE"
                        ) ||
                        (
                            status ===
                                "revoked" &&
                            apiKey.status ===
                                "REVOKED"
                        ) ||
                        (
                            status ===
                                "expired" &&
                            apiKey.status ===
                                "EXPIRED"
                        );

                    return (
                        matchesSearch &&
                        matchesEnvironment &&
                        matchesStatus
                    );
                },
            );
        }, [
            apiKeys,
            search,
            environment,
            status,
        ]);

    const summary =
        useMemo(() => {
            const total =
                apiKeys.length;

            const active =
                apiKeys.filter(
                    (item) =>
                        item.status ===
                        "ACTIVE",
                ).length;

            const live =
                apiKeys.filter(
                    (item) =>
                        item.environment ===
                        "LIVE",
                ).length;

            const attention =
                apiKeys.filter(
                    (item) =>
                        item.status ===
                            "EXPIRED" ||
                        Boolean(
                            item.expiresAt,
                        ),
                ).length;

            return {
                total,
                active,
                live,
                attention,
            };
        }, [
            apiKeys,
        ]);

    const actions:
        ApiKeyActionAvailability = {
        /*
         * These remain false until the corresponding
         * SDK/API operations are implemented.
         */
        create:
            false,

        revoke:
            false,

        rotate:
            false,

        reveal:
            false,

        export:
            false,
    };

    const apiKeysAvailable =
        false;

    return {
        merchant: {
            data:
                merchant.merchant,

            status:
                merchant.merchantStatus,

            ownerWallet:
                merchant.ownerWallet,

            loading:
                merchant.loading,

            refreshing:
                merchant.refreshing,

            error:
                merchant.error,

            refresh:
                merchant.refresh,
        },

        apiKeys: {
            data:
                filteredApiKeys,

            available:
                apiKeysAvailable,

            loading:
                false,

            refreshing:
                false,

            error:
                null,
        },

        summary,

        filters: {
            search,
            environment,
            status,

            setSearch,
            setEnvironment,
            setStatus,
        },

        actions,
    };
}