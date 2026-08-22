"use client";

import { BillingOperatorRecord } from "@/components/dashboard/platform/billing-operators/billing-operator.types";
import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

export type MerchantBillingOperatorsPageStatus =
    | "disconnected"
    | "waiting"
    | "loading"
    | "ready"
    | "not-created"
    | "unavailable"
    | "error";

export function useMerchantBillingOperatorsPage() {
    const merchant =
        useMerchant();

    /*
     * The current MerchantClient surface is not yet the
     * source of truth for billing-operator collection data.
     *
     * Do not invent:
     *   - getBillingOperators()
     *   - createBillingOperator()
     *   - revokeBillingOperator()
     *   - updateBillingOperator()
     *
     * Those operations can be wired here once they are actually
     * exposed by the merchant SDK/API.
     */

    let status:
        MerchantBillingOperatorsPageStatus;

    switch (merchant.merchantStatus) {
        case "disconnected":
            status = "disconnected";
            break;

        case "waiting":
            status = "waiting";
            break;

        case "loading":
            status = "loading";
            break;

        case "error":
            status = "error";
            break;

        case "not-created":
            status = "not-created";
            break;

        case "ready":
            status = "unavailable";
            break;

        default:
            status = "unavailable";
    }

    return {
        status,

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

        operators: {
            data:
                [] as BillingOperatorRecord[],

            loading:
                false,

            refreshing:
                false,

            error:
                null,

            refresh:
                async () => undefined,
        },
    };
}