"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    useCustomer,
} from "@/hooks/customer/useCustomer";

import {
    useSubscriptions,
} from "@/hooks/customer/useSubscriptions";

import {
    useSubscriptionPlans,
} from "@/hooks/customer/useSubscriptionPlans";

import {
    usePauseSubscription,
} from "@/hooks/customer/usePauseSubscription";

import {
    useResumeSubscription,
} from "@/hooks/customer/useResumeSubscription";

import {
    useCancelSubscription,
} from "@/hooks/customer/useCancelSubscription";

import type {
    CustomerSubscriptionStatus,
    CustomerSubscriptionView,
} from "@/types/customer-subscription";

////////////////////////////////////////////////////////////
// NORMALIZATION HELPERS
////////////////////////////////////////////////////////////

function formatInterval(
    interval: unknown,
) {
    switch (
        String(interval)
            .toUpperCase()
    ) {
        case "DAY":
            return "DAY";

        case "WEEK":
            return "WEEK";

        case "YEAR":
            return "YEAR";

        case "MONTH":
        default:
            return "MONTH";
    }
}

function normalizeStatus(
    status: unknown,
): CustomerSubscriptionStatus {

    switch (
        String(status)
            .toUpperCase()
    ) {
        case "PAUSED":
            return "PAUSED";

        case "PENDING":
            return "PENDING";

        case "CANCELLED":
            return "CANCELLED";

        case "ACTIVE":
        default:
            return "ACTIVE";
    }
}

function formatCurrencyAmount(
    amount: unknown,
) {
    if (
        amount ===
        undefined ||
        amount === null
    ) {
        return "0";
    }

    return String(
        amount,
    );
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useCustomerSubscriptionsPage() {

    ////////////////////////////////////////////////////////////
    // CORE RESOURCES
    ////////////////////////////////////////////////////////////

    const customer =
        useCustomer();

    const subscriptions =
        useSubscriptions();

    const plans =
        useSubscriptionPlans();

    ////////////////////////////////////////////////////////////
    // ACTIONS
    ////////////////////////////////////////////////////////////

    const pause =
        usePauseSubscription();

    const resume =
        useResumeSubscription();

    const cancel =
        useCancelSubscription();

    ////////////////////////////////////////////////////////////
    // LOCAL UI STATE
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
            | "all"
            | "active"
            | "paused"
            | "pending"
            | "cancelled"
        >("all");

    const [
        page,
        setPage,
    ] = useState(1);

    const pageSize =
        10;

    ////////////////////////////////////////////////////////////
    // NORMALIZED SUBSCRIPTIONS
    ////////////////////////////////////////////////////////////

    const normalized =
        useMemo<CustomerSubscriptionView[]>(
            () => {

                return (
                    subscriptions.subscriptions
                        .map(
                            (
                                subscription: any,
                            ) => {

                                const subscriptionId =
                                    Number(
                                        subscription.subscriptionId ??
                                        subscription.id,
                                    );

                                const planId =
                                    Number(
                                        subscription.planId,
                                    );

                                const plan =
                                    plans.plans.get(
                                        planId,
                                    );

                                const status =
                                    normalizeStatus(
                                        subscription.status,
                                    );

                                const currency =
                                    String(
                                        subscription.currency ??
                                        plan?.currency ??
                                        "USDC",
                                    );

                                const amount =
                                    formatCurrencyAmount(
                                        subscription.amount ??
                                        plan?.amount,
                                    );

                                return {
                                    id:
                                        String(
                                            subscription.id ??
                                            subscription.subscriptionId,
                                        ),

                                    subscriptionId,

                                    planId,

                                    planName:
                                        String(
                                            subscription.planName ??
                                            plan?.name ??
                                            `Plan ${planId}`,
                                        ),

                                    planDescription:
                                        String(
                                            subscription.planDescription ??
                                            plan?.description ??
                                            "",
                                        ),

                                    amount,

                                    currency,

                                    interval:
                                        formatInterval(
                                            subscription.interval ??
                                            plan?.billingPeriodNamed ??
                                            plan?.interval,
                                        ),

                                    status,

                                    nextBilling:
                                        subscription.nextBilling ??
                                        subscription.nextBillingTime ??
                                        null,

                                    createdAt:
                                        String(
                                            subscription.createdAt ??
                                            "",
                                        ),

                                    totalBilled:
                                        subscription.totalBilled ??
                                        null,

                                    billingPermissionActive:
                                        Boolean(
                                            subscription.billingPermissionActive ??
                                            status === "ACTIVE",
                                        ),
                                };
                            },
                        )
                );
            },
            [
                subscriptions.subscriptions,
                plans.plans,
            ],
        );

    ////////////////////////////////////////////////////////////
    // FILTER
    ////////////////////////////////////////////////////////////

    const filtered =
        useMemo(
            () => {

                const normalizedSearch =
                    search
                        .trim()
                        .toLowerCase();

                return normalized.filter(
                    (
                        subscription,
                    ) => {

                        const matchesSearch =
                            !normalizedSearch ||
                            subscription.planName
                                .toLowerCase()
                                .includes(
                                    normalizedSearch,
                                ) ||
                            subscription.planDescription
                                .toLowerCase()
                                .includes(
                                    normalizedSearch,
                                );

                        const matchesStatus =
                            statusFilter ===
                                "all" ||
                            subscription.status
                                .toLowerCase() ===
                                statusFilter;

                        return (
                            matchesSearch &&
                            matchesStatus
                        );
                    },
                );

            },
            [
                normalized,
                search,
                statusFilter,
            ],
        );

    ////////////////////////////////////////////////////////////
    // PAGINATION
    ////////////////////////////////////////////////////////////

    const totalPages =
        Math.max(
            Math.ceil(
                filtered.length /
                    pageSize,
            ),
            1,
        );

    const safePage =
        Math.min(
            page,
            totalPages,
        );

    const visible =
        filtered.slice(
            (safePage - 1) *
                pageSize,
            safePage *
                pageSize,
        );

    ////////////////////////////////////////////////////////////
    // SUMMARY
    ////////////////////////////////////////////////////////////

    const summary =
        useMemo(
            () => {

                const active =
                    normalized.filter(
                        (
                            subscription,
                        ) =>
                            subscription.status ===
                            "ACTIVE",
                    );

                const inactive =
                    normalized.filter(
                        (
                            subscription,
                        ) =>
                            subscription.status ===
                                "PAUSED" ||
                            subscription.status ===
                                "CANCELLED",
                    );

                const recurring =
                    active.reduce(
                        (
                            total,
                            subscription,
                        ) => {

                            const numeric =
                                Number(
                                    subscription.amount,
                                );

                            return Number.isFinite(
                                numeric,
                            )
                                ? total +
                                    numeric
                                : total;
                        },
                        0,
                    );

                const next =
                    active.find(
                        (
                            subscription,
                        ) =>
                            Boolean(
                                subscription.nextBilling,
                            ),
                    );

                return {
                    total:
                        normalized.length,

                    active:
                        active.length,

                    recurringTotal:
                        recurring,

                    nextBilling:
                        next ??
                        null,

                    pausedOrCancelled:
                        inactive.length,
                };

            },
            [
                normalized,
            ],
        );

    ////////////////////////////////////////////////////////////
    // PAGE MODEL
    ////////////////////////////////////////////////////////////

    return {
        customer,

        subscriptions,

        plans,

        summary,

        list: {
            items:
                visible,

            filteredCount:
                filtered.length,

            totalCount:
                normalized.length,

            page:
                safePage,

            totalPages,

            pageSize,

            search,

            setSearch:
                (
                    value: string,
                ) => {

                    setSearch(
                        value,
                    );

                    setPage(
                        1,
                    );
                },

            statusFilter,

            setStatusFilter:
                (
                    value:
                        | "all"
                        | "active"
                        | "paused"
                        | "pending"
                        | "cancelled",
                ) => {

                    setStatusFilter(
                        value,
                    );

                    setPage(
                        1,
                    );
                },

            setPage,
        },

        actions: {
            pause:
                pause.pause,

            pauseLoading:
                pause.loading,

            resume:
                resume.resume,

            resumeLoading:
                resume.loading,

            cancel:
                cancel.cancel,

            cancelLoading:
                cancel.loading,
        },

        loading:
            customer.loading ||
            subscriptions.loading ||
            plans.loading,

        refreshing:
            customer.refreshing ||
            subscriptions.refreshing ||
            plans.refreshing,

        error:
            customer.error ??
            subscriptions.error ??
            plans.error ??
            pause.error ??
            resume.error ??
            cancel.error ??
            null,
    };
}