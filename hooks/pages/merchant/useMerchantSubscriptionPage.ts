"use client";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

import type {
    MerchantSubscriptionRecord,
} from "@/types/merchant/subscription";

////////////////////////////////////////////////////////////
// STATUS
////////////////////////////////////////////////////////////

export type MerchantSubscriptionPageStatus =
    | "waiting"
    | "loading"
    | "not-exposed"
    | "ready"
    | "not-found"
    | "error";

////////////////////////////////////////////////////////////
// RESULT
////////////////////////////////////////////////////////////

export interface MerchantSubscriptionPageResult {
    merchantId:
        | number
        | null;

    data:
        | MerchantSubscriptionRecord
        | null;

    status:
        MerchantSubscriptionPageStatus;

    loading: boolean;

    refreshing: boolean;

    error:
        | Error
        | null;

    refresh: () => unknown;
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useMerchantSubscriptionPage(
    subscriptionId:
        | number
        | null,
): MerchantSubscriptionPageResult {
    const merchant =
        useMerchant();

    ////////////////////////////////////////////////////////////
    // INVALID ID
    ////////////////////////////////////////////////////////////

    if (
        subscriptionId ===
        null
    ) {
        return {
            merchantId:
                merchant.merchant?.merchantId ??
                null,

            data:
                null,

            status:
                "not-found",

            loading:
                false,

            refreshing:
                false,

            error:
                new Error(
                    "Invalid subscription identifier.",
                ),

            refresh:
                merchant.refresh,
        };
    }

    ////////////////////////////////////////////////////////////
    // MERCHANT AUTH WAIT
    ////////////////////////////////////////////////////////////

    if (
        merchant.merchantStatus ===
        "disconnected"
    ) {
        return {
            merchantId:
                null,

            data:
                null,

            status:
                "waiting",

            loading:
                false,

            refreshing:
                false,

            error:
                null,

            refresh:
                merchant.refresh,
        };
    }

    if (
        merchant.merchantStatus ===
        "waiting"
    ) {
        return {
            merchantId:
                null,

            data:
                null,

            status:
                "waiting",

            loading:
                false,

            refreshing:
                false,

            error:
                null,

            refresh:
                merchant.refresh,
        };
    }

    ////////////////////////////////////////////////////////////
    // MERCHANT LOADING
    ////////////////////////////////////////////////////////////

    if (
        merchant.merchantStatus ===
        "loading"
    ) {
        return {
            merchantId:
                null,

            data:
                null,

            status:
                "loading",

            loading:
                true,

            refreshing:
                false,

            error:
                null,

            refresh:
                merchant.refresh,
        };
    }

    ////////////////////////////////////////////////////////////
    // MERCHANT ERROR
    ////////////////////////////////////////////////////////////

    if (
        merchant.merchantStatus ===
        "error"
    ) {
        return {
            merchantId:
                null,

            data:
                null,

            status:
                "error",

            loading:
                false,

            refreshing:
                false,

            error:
                merchant.error,

            refresh:
                merchant.refresh,
        };
    }

    ////////////////////////////////////////////////////////////
    // MERCHANT DOES NOT EXIST
    ////////////////////////////////////////////////////////////

    if (
        merchant.merchantStatus ===
            "not-created" ||
        !merchant.merchant
    ) {
        return {
            merchantId:
                null,

            data:
                null,

            status:
                "not-found",

            loading:
                false,

            refreshing:
                false,

            error:
                null,

            refresh:
                merchant.refresh,
        };
    }

    ////////////////////////////////////////////////////////////
    // CURRENT SDK LIMIT
    //
    // getSubscription(subscriptionId) does not exist yet.
    ////////////////////////////////////////////////////////////

    return {
        merchantId:
            merchant.merchant.merchantId,

        data:
            null,

        status:
            "not-exposed",

        loading:
            false,

        refreshing:
            merchant.refreshing,

        error:
            null,

        refresh:
            merchant.refresh,
    };
}