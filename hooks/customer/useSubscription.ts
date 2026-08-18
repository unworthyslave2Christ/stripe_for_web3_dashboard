"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    useCustomerClient,
} from "./useCustomerClient";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

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
                subscriptionId
                    ? queryKeys.customer.subscription(
                        subscriptionId,
                    )
                    : [
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

        refreshing:
            query.isFetching &&
            !query.isLoading,

        error:
            query.error
                ? query.error instanceof Error
                    ? query.error
                    : new Error(
                        "Unable to load subscription.",
                    )
                : null,

        refresh:
            query.refetch,
    };
}