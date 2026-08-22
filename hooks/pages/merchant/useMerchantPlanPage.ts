"use client";

import {
    useMemo,
} from "react";

import type {
    PlanRecord,
} from "@stripe-for-web3/core";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

import {
    useMerchantPlan,
} from "@/hooks/merchant/useMerchantPlan";

export function useMerchantPlanPage(
    planId: number | null,
) {
    const merchant =
        useMerchant();

    const plan =
        useMerchantPlan(
            planId,
        );

    const isReady =
        merchant.merchantStatus ===
            "ready" &&
        plan.status ===
            "ready";

    const formatted =
        useMemo(() => {
            const record =
                plan.plan as
                    | PlanRecord
                    | null;

            if (!record) {
                return null;
            }

            return {
                ...record,

                createdAtLabel:
                    formatDate(
                        record.createdAt,
                    ),

                updatedAtLabel:
                    "updatedAt" in record &&
                    record.updatedAt
                        ? formatDate(
                            record.updatedAt,
                        )
                        : "—",

                priceLabel:
                    formatPlanPrice(
                        record,
                    ),

                intervalLabel:
                    formatBillingInterval(
                        record.billingPeriodNamed,
                    ),
            };
        }, [
            plan.plan,
        ]);

    return {
        planId,

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

        plan: {
            data:
                plan.plan,

            formatted,

            status:
                plan.status,

            loading:
                plan.loading,

            refreshing:
                plan.refreshing,

            error:
                plan.error,

            refresh:
                plan.refresh,
        },

        ready:
            isReady,
    };
}

function formatDate(
    value:
        | Date
        | string
        | number,
) {
    const date =
        value instanceof Date
            ? value
            : new Date(value);

    if (
        Number.isNaN(
            date.getTime(),
        )
    ) {
        return "—";
    }

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric",
        },
    ).format(date);
}

function formatBillingInterval(
    interval:
        | string
        | undefined,
) {
    switch (
        interval
    ) {
        case "DAY":
            return "day";

        case "WEEK":
            return "week";

        case "YEAR":
            return "year";

        case "MONTH":
        default:
            return "month";
    }
}

function formatPlanPrice(
    plan: PlanRecord,
) {
    const amount =
        plan.amount;

    // const currency =
    //     plan.currency;

    // return `${currency} ${amount}`;
  

    return `$ ${amount}`;
}