"use client";

import {
    useCallback,
} from "react";

import {
    useMerchant,
} from "./useMerchant";

import type {
    PermissionRecord,
} from "@/types/merchant/permission.types";

////////////////////////////////////////////////////////////
// RESOURCE RESULT
////////////////////////////////////////////////////////////

export interface MerchantPermissionsResource {
    permissions: PermissionRecord[];

    available: boolean;

    loading: boolean;

    refreshing: boolean;

    error: Error | null;

    refresh: () => Promise<unknown>;
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useMerchantPermissions(): MerchantPermissionsResource {
    const merchant =
        useMerchant();

    /*
     * IMPORTANT
     *
     * Permission read operations are not yet exposed
     * by the merchant SDK/API surface.
     *
     * Therefore this hook must not:
     *
     *   - invent permission records
     *   - use demo records
     *   - call an undocumented endpoint
     *   - infer policies from unrelated merchant data
     *
     * It explicitly reports the capability as unavailable.
     */

    const refresh =
        useCallback(
            async () => {
                return undefined;
            },
            [],
        );

    if (
        merchant.merchantStatus !==
            "ready"
    ) {
        return {
            permissions: [],

            available: false,

            loading:
                merchant.loading,

            refreshing:
                merchant.refreshing,

            error:
                merchant.error,

            refresh,
        };
    }

    return {
        permissions: [],

        available: false,

        loading: false,

        refreshing: false,

        error: null,

        refresh,
    };
}