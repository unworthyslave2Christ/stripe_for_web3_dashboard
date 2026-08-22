"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

import {
    useMerchantClient,
} from "./useMerchantClient";

export type MerchantPlanResourceStatus =
    | "waiting"
    | "loading"
    | "ready"
    | "not-found"
    | "error";

export function useMerchantPlan(
    planId: number | null,
) {
    const {
        client,
        ready: clientReady,
    } = useMerchantClient();

    const query =
        useQuery({
            queryKey:
                planId !== null
                    ? queryKeys.merchant.plan(
                        planId,
                    )
                    : [
                        "merchant",
                        "plan",
                        "none",
                    ],

            queryFn:
                async () => {
                    if (!client) {
                        throw new Error(
                            "Merchant client is not ready.",
                        );
                    }

                    if (
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
                    clientReady &&
                    client &&
                    planId !== null,
                ),

            retry: false,
        });

    let status:
        MerchantPlanResourceStatus;

    if (
        planId === null ||
        !clientReady
    ) {
        status = "waiting";
    } else if (
        query.isLoading
    ) {
        status = "loading";
    } else if (
        query.isError
    ) {
        status = "error";
    } else if (
        query.data
    ) {
        status = "ready";
    } else {
        status = "not-found";
    }

    return {
        plan:
            query.data ??
            null,

        status,

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