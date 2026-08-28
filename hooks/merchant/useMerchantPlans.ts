"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

import {
    useMerchant,
} from "./useMerchant";

import {
    useMerchantClient,
} from "./useMerchantClient";

export function useMerchantPlans() {

    
    const {
        merchant,
        merchantStatus,
    } =
        useMerchant();

    const {
        client,
    } =
        useMerchantClient();

    const merchantId =
        merchant?.merchantId ??
        null;

    const query =
        useQuery({
            queryKey:
                merchantId !== null
                    ? queryKeys.merchant.plans(
                        merchantId,
                    )
                    : [
                        "merchant",
                        "plans",
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
                        merchantId ===
                        null
                    ) {
                        return [];
                    }

                    return client.getPlans(
                        merchantId,
                    );
                },

            enabled:
                Boolean(
                    client &&
                    merchantId !== null &&
                    merchantStatus ===
                        "ready",
                ),

            retry:
                false,
        });

    return {
        plans:
            query.data ??
            [],

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