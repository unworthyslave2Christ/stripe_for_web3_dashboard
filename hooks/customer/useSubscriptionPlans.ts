"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    useCustomer,
} from "./useCustomer";

import {
    useCustomerClient,
} from "./useCustomerClient";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

export function useSubscriptionPlans() {
    const {
        customer,
        status:
            customerStatus,
    } = useCustomer();

    const {
        client,
    } = useCustomerClient();

    const customerId =
        customer?.customerId
            ? String(customer.customerId)
            : null;

    const query =
        useQuery({
            queryKey:
                customerId
                    ? [
                        "customer",
                        customerId,
                        "subscription-plans",
                    ]
                    : [
                        "customer",
                        "subscription-plans",
                        "none",
                    ],

            queryFn:
                async () => {

                    if (
                        !client ||
                        !customerId
                    ) {
                        return [];
                    }

                    const subscriptions =
                        await client.getSubscriptions(
                            customerId,
                        );

                    const planIds =
                        Array.from(
                            new Set(
                                subscriptions
                                    .map(
                                        (
                                            subscription: any,
                                        ) =>
                                            Number(
                                                subscription.planId,
                                            ),
                                    )
                                    .filter(
                                        (
                                            planId,
                                        ) =>
                                            Number.isFinite(
                                                planId,
                                            ),
                                    ),
                            ),
                        );

                    const plans =
                        await Promise.all(
                            planIds.map(
                                (
                                    planId,
                                ) =>
                                    client.getPlan(
                                        planId,
                                    ),
                            ),
                        );

                    return plans;
                },

            enabled:
                Boolean(
                    client &&
                    customerId &&
                    customerStatus ===
                        "ready",
                ),
        });

    const plans =
        new Map<number, any>();

    for (
        const plan of
            query.data ?? []
    ) {
        plans.set(
            Number(
                plan.planId,
            ),
            plan,
        );
    }

    return {
        plans,

        loading:
            query.isLoading,

        refreshing:
            query.isFetching &&
            !query.isLoading,

        error:
            query.error instanceof Error
                ? query.error
                : null,

        refresh:
            query.refetch,
    };
}