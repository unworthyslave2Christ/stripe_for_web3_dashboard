"use client";

import {
    useMemo,
} from "react";

import { appConfig } from "@/app/config";

import { useMerchant } from "@/hooks/merchant/useMerchant";
import { useMerchantPlans } from "@/hooks/merchant/useMerchantPlans";

export function useMerchantPlansPage() {
    /*
     * Production:
     *
     * merchantId should come from the authenticated
     * merchant session/context.
     *
     * Local sandbox:
     *
     * NEXT_PUBLIC_SANDBOX_MERCHANT_ID provides the
     * known test merchant identity until the
     * authenticated merchant-session resource exists.
     */
    const merchantId =
        appConfig.sandboxMerchantId;

    const merchant =
        useMerchant(
            merchantId,
        );

    const plans =
        useMerchantPlans(
            merchantId,
        );

    const summary =
        useMemo(() => {
            const items =
                plans.plans;

            const active =
                items.filter(
                    (plan) =>
                        plan.status ===
                        "ACTIVE",
                );

            const paused =
                items.filter(
                    (plan) =>
                        plan.status ===
                        "PAUSED",
                );

            const archived =
                items.filter(
                    (plan) =>
                        plan.status ===
                        "ARCHIVED",
                );

            return {
                total:
                    items.length,

                active:
                    active.length,

                paused:
                    paused.length,

                archived:
                    archived.length,
            };
        }, [
            plans.plans,
        ]);

    return {
        merchantId,

        merchant: {
            data:
                merchant.merchant,

            status:
                merchant.status,

            loading:
                merchant.loading,

            refreshing:
                merchant.refreshing,

            error:
                merchant.error,

            refresh:
                merchant.refresh,
        },

        plans: {
            data:
                plans.plans,

            loading:
                plans.loading,

            refreshing:
                plans.refreshing,

            error:
                plans.error,

            refresh:
                plans.refresh,
        },

        summary,

        mode:
            appConfig.demoMode
                ? "demo"
                : "live",
    };
}