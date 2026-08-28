"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/queryKeys";
import { useMerchant } from "@/hooks/merchant/useMerchant";
import { useMerchantClient } from "@/hooks/merchant/useMerchantClient";

export function useMerchantPlanActions(
    planId: number,
) {
    const queryClient =
        useQueryClient();

    const {
        merchant,
    } = useMerchant();

    const {
        client,
        ready,
    } =
        useMerchantClient();

    const merchantId =
        merchant?.merchantId ?? null;

    const mutation =
        useMutation({
            mutationFn:
                async (
                    action:
                        | "activate"
                        | "pause"
                        | "archive",
                ) => {
                    if (!ready || !client) {
                        throw new Error(
                            "Merchant client is not ready.",
                        );
                    }

                    if (
                        merchantId === null
                    ) {
                        throw new Error(
                            "Merchant account is not available.",
                        );
                    }

                    switch (action) {
                        case "activate":
                            return client.activatePlan(
                                planId,
                            );

                        case "pause":
                            return client.pausePlan(
                                planId,
                            );

                        case "archive":
                            return client.archivePlan(
                                planId,
                            );
                    }
                },

            onSuccess:
                async () => {
                    if (
                        merchantId ===
                        null
                    ) {
                        return;
                    }

                    await Promise.all([
                        queryClient.invalidateQueries({
                            queryKey:
                                queryKeys.merchant.plans(
                                    merchantId,
                                ),
                        }),

                        queryClient.invalidateQueries({
                            queryKey:
                                queryKeys.merchant.plan(
                                    planId,
                                ),
                        }),
                    ]);
                },
        });

    return {
        activate:
            () =>
                mutation.mutateAsync(
                    "activate",
                ),

        pause:
            () =>
                mutation.mutateAsync(
                    "pause",
                ),

        archive:
            () =>
                mutation.mutateAsync(
                    "archive",
                ),

        pending:
            mutation.isPending,

        error:
            mutation.error instanceof Error
                ? mutation.error
                : null,

        reset:
            mutation.reset,
    };
}