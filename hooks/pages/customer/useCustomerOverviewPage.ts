"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    useCustomerClient,
} from "@/hooks/customer/useCustomerClient";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

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
            query.error
                ? query.error instanceof Error
                    ? query.error
                    : new Error(
                        "Unable to load plan.",
                    )
                : null,

        refresh:
            query.refetch,
    };
}