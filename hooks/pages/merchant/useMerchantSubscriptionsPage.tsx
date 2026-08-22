"use client";

import { useMerchant } from "@/hooks/merchant/useMerchant";

export type MerchantSubscriptionsPageStatus =
    | "disconnected"
    | "waiting"
    | "merchant-loading"
    | "unsupported"
    | "error";

export function useMerchantSubscriptionsPage() {
    const {
        merchant,
        merchantStatus,
        loading: merchantLoading,
        error: merchantError,
        refresh: refreshMerchant,
    } = useMerchant();

    /*
     * CURRENT SDK CAPABILITY
     *
     * The merchant SDK currently exposed in this project gives us:
     *
     *   getByOwnerWallet(...)
     *   getPlans(...)
     *
     * The supplied SDK surface does not establish a merchant-side
     * subscription collection operation yet.
     *
     * Do NOT invent:
     *
     *   client.getSubscriptions(...)
     *   client.listSubscriptions(...)
     *   client.getSubscriptionsByMerchant(...)
     *
     * until that operation is actually exposed by the SDK/API.
     */

    let status: MerchantSubscriptionsPageStatus;

    if (merchantStatus === "disconnected") {
        status = "disconnected";
    } else if (
        merchantStatus === "waiting"
    ) {
        status = "waiting";
    } else if (
        merchantLoading
    ) {
        status = "merchant-loading";
    } else if (
        merchantStatus === "error"
    ) {
        status = "error";
    } else if (
        merchantStatus === "ready" &&
        merchant
    ) {
        status = "unsupported";
    } else if (
        merchantStatus === "not-created"
    ) {
        status = "waiting";
    } else {
        status = "unsupported";
    }

    return {
        merchant,

        merchantId:
            merchant?.merchantId ?? null,

        status,

        subscriptions:
            [] as never[],

        loading:
            merchantLoading,

        refreshing:
            false,

        error:
            merchantError,

        refresh:
            refreshMerchant,
    };
}