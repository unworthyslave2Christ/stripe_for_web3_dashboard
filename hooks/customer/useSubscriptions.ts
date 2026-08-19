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

import {
    useCustomer,
} from "./useCustomer";

export function useSubscriptions() {
    const {
        customer,
        status:
            customerStatus,
    } =
        useCustomer();

    const {
        client,
    } =
        useCustomerClient();

    const customerId =
        customer?.customerId
            ? String(
                customer.customerId,
            )
            : null;

    const query =
        useQuery({
            queryKey:
                customerId
                    ? queryKeys.customer.subscriptions(
                        customerId,
                    )
                    : [
                        "customer",
                        "subscriptions",
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

                    return client.getSubscriptions(
                        customerId,
                    );
                },

            enabled:
                Boolean(
                    client &&
                    customerId &&
                    customerStatus ===
                        "ready",
                ),
        });

    return {
        subscriptions:
            query.data ?? [],

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