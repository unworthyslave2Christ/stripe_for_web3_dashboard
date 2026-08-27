"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

import {
    useMerchantPlans,
} from "@/hooks/merchant/useMerchantPlans";

import type {
    BillingInterval,
    PlanStatus,
} from "@/components/dashboard/platform/plans/plan.types";

const PAGE_SIZE = 10;

export function useMerchantPlansPage() {
    ////////////////////////////////////////////////////////////
    // RESOURCES
    ////////////////////////////////////////////////////////////

    const merchant =
        useMerchant();

    const plans =
        useMerchantPlans();

    ////////////////////////////////////////////////////////////
    // UI STATE
    ////////////////////////////////////////////////////////////

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        statusFilter,
        setStatusFilter,
    ] =
        useState<
            "ALL" |
            PlanStatus
        >("ALL");

    const [
        intervalFilter,
        setIntervalFilter,
    ] =
        useState<
            "ALL" |
            BillingInterval
        >("ALL");

    const [
        page,
        setPage,
    ] = useState(1);

    ////////////////////////////////////////////////////////////
    // FILTERING
    ////////////////////////////////////////////////////////////

    const filteredPlans =
        useMemo(() => {
            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return plans.plans.filter(
                (plan) => {

                    const matchesSearch =
                        !normalizedSearch ||
                        plan.name
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        // plan.description
                        //     .toLowerCase()
                        //     .includes(
                        //         normalizedSearch,
                        //     ) ||
                        String(
                            plan.planId,
                        ).includes(
                            normalizedSearch,
                        ); // TODO: To remove searching by plan Ids to prevent merchants from having read-only unauthorized access to other merchant's plans, perhaps this Gating is to be achieved via API keys

                    const matchesStatus =
                        statusFilter ===
                            "ALL" ||
                        plan.status ===
                            statusFilter;

                    const matchesInterval =
                        intervalFilter ===
                            "ALL" ||
                        plan.billingPeriodNamed as string ===
                            intervalFilter;

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesInterval
                    );
                },
            );
        }, [
            plans.plans,
            search,
            statusFilter,
            intervalFilter,
        ]);

    ////////////////////////////////////////////////////////////
    // RESET PAGE WHEN FILTER CHANGES
    ////////////////////////////////////////////////////////////

    const setSearchValue =
        (
            value: string,
        ) => {
            setSearch(
                value,
            );
            setPage(1);
        };

    const setStatus =
        (
            value:
                | "ALL"
                | PlanStatus,
        ) => {
            setStatusFilter(
                value,
            );
            setPage(1);
        };

    const setInterval =
        (
            value:
                | "ALL"
                | BillingInterval,
        ) => {
            setIntervalFilter(
                value,
            );
            setPage(1);
        };

    ////////////////////////////////////////////////////////////
    // PAGINATION
    ////////////////////////////////////////////////////////////

    const paginatedPlans =
        useMemo(() => {
            const start =
                (
                    page -
                    1
                ) *
                    PAGE_SIZE;
        
            return filteredPlans.slice(
                start,
                start +
                    PAGE_SIZE,
            );
        }, [
            filteredPlans,
            page,
        ]);

    ////////////////////////////////////////////////////////////
    // KEEP CURRENT PAGE VALID
    ////////////////////////////////////////////////////////////

    const pageCount =
        Math.max(
            Math.ceil(
                filteredPlans.length /
                    PAGE_SIZE,
            ),
            1,
        );

    useEffect(() => {
        if (
            page >
            pageCount
        ) {
            setPage(
                pageCount,
            );
        }
    }, [
        page,
        pageCount,
    ]);

    ////////////////////////////////////////////////////////////
    // SUMMARY
    ////////////////////////////////////////////////////////////

    const summary =
        useMemo(() => {
            const items =
                plans.plans;

            return {
                total:
                    items.length,

                active:
                    items.filter(
                        (plan) =>
                            plan.status ===
                            "ACTIVE",
                    ).length,

                paused:
                    items.filter(
                        (plan) =>
                            plan.status ===
                            "PAUSED",
                    ).length,

                archived:
                    items.filter(
                        (plan) =>
                            plan.status ===
                            "ARCHIVED",
                    ).length,

                monthlyRevenue:
                    items.reduce(
                        (
                            total,
                            plan,
                        ) =>
                            total +
                            Number(
                                // plan.monthlyRevenue.replace(
                                //     /[^0-9.-]+/g,
                                //     "",
                                // ) ||
                                0,
                            ),

                            // TODO: Every time a charge is executed(during billing),  a monthlyRevenue column (yet unadded) has on each plan an automated increment during billing
                        0,
                    ),
            };
        }, [
            plans.plans,
        ]);

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

        plans: {
            data:
                paginatedPlans,

            filteredCount:
                filteredPlans.length,

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

        filters: {
            search,

            status:
                statusFilter,

            interval:
                intervalFilter,

            page,

            pageSize:
                PAGE_SIZE,

            setSearch:
                setSearchValue,

            setStatus,

            setInterval,

            setPage,
        },

        loading:
            merchant.loading ||
            (
                merchant.merchantStatus ===
                    "ready" &&
                plans.loading
            ),

        refreshing:
            merchant.refreshing ||
            plans.refreshing,

        error:
            merchant.error ??
            plans.error,
    };
}