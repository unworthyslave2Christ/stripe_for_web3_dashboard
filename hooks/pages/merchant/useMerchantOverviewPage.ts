"use client";

import {
    useMemo,
} from "react";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

import {
    useMerchantPlans,
} from "@/hooks/merchant/useMerchantPlans";

import {
    appConfig,
} from "@/app/config";

import {
    merchantOverviewDemo,
} from "@/lib/demo/merchantOverviewDemo";

export function useMerchantOverviewPage() {
    const merchant =
        useMerchant();

    const plans =
        useMerchantPlans();

    const demo =
        appConfig.demoMode
            ? merchantOverviewDemo
            : null;

    const planSummary =
        useMemo(() => {
            const total =
                plans.plans.length;

            return {
                total,
            };
        }, [
            plans.plans,
        ]);

    const status =
        merchant.merchantStatus;

    return {
        mode:
            appConfig.demoMode
                ? "demo"
                : "live",

        merchant: {
            data:
                merchant.merchant,

            status,

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

        planSummary,

        demo,
    };
}