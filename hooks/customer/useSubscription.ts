"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

import {
    useCustomerClient,
} from "./useCustomerClient";

export function useSubscription(
    subscriptionId:
        | number
        | null,
) {
    const {
        client,
    } =
        useCustomerClient();

    const query =
        useQuery({
            queryKey:
                subscriptionId !== null
                    ? queryKeys.customer.subscription(
                        subscriptionId,
                    )
                    : [
                        "customer",
                        "subscription",
                        "none",
                    ],

            queryFn:
                async () => {

                    if (
                        !client ||
                        subscriptionId === null
                    ) {
                        return null;
                    }

                    return client.getSubscription(
                        subscriptionId,
                    );
                },

            enabled:
                Boolean(
                    client &&
                    subscriptionId !== null,
                ),
        });

    return {
        subscription:
            query.data ?? null,

        loading:
            query.isLoading,

        error:
            query.error instanceof Error
                ? query.error
                : null,

        refresh:
            query.refetch,
    };
}