"use client";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

export type MerchantBillingPageStatus =
    | "disconnected"
    | "waiting"
    | "loading"
    | "ready"
    | "not-created"
    | "unavailable"
    | "error";

export function useMerchantBillingPage() {
    const merchant =
        useMerchant();

    /*
     * Billing data is intentionally not queried here yet.
     *
     * The merchant SDK currently does not expose the billing
     * collection/reconciliation operations required by this page.
     *
     * Once those operations are added to the SDK/API layer,
     * this hook becomes the single place where they are wired in.
     */

    let status:
        MerchantBillingPageStatus;

    if (
        merchant.merchantStatus ===
        "disconnected"
    ) {
        status = "disconnected";

    } else if (
        merchant.merchantStatus ===
        "waiting"
    ) {
        status = "waiting";

    } else if (
        merchant.merchantStatus ===
        "loading"
    ) {
        status = "loading";

    } else if (
        merchant.merchantStatus ===
        "error"
    ) {
        status = "error";

    } else if (
        merchant.merchantStatus ===
        "not-created"
    ) {
        status = "not-created";

    } else {
        status = "unavailable";
    }

    return {
        merchant: {
            data:
                merchant.merchant,

            status:
                merchant.merchantStatus,

            loading:
                merchant.loading,

            refreshing:
                merchant.refreshing,

            error:
                merchant.error,

            refresh:
                merchant.refresh,
        },

        status,

        billing: {
            data: null,
            loading: false,
            refreshing: false,
            error: null,
        },
    };
}