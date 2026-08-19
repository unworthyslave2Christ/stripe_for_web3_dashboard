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

export function usePlan(
    planId:
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
                planId !== null
                    ? queryKeys.customer.plan(
                        planId,
                    )
                    : [
                        "customer",
                        "plan",
                        "none",
                    ],

            queryFn:
                async () => {

                    if (
                        !client ||
                        planId === null
                    ) {
                        return null;
                    }

                    return client.getPlan(
                        planId,
                    );
                },

            enabled:
                Boolean(
                    client &&
                    planId !== null,
                ),
        });

    return {
        plan:
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