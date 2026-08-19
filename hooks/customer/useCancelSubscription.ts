"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    useCustomerClient,
} from "./useCustomerClient";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

export function useCancelSubscription() {
    const {
        client,
    } = useCustomerClient();

    const queryClient =
        useQueryClient();

    const mutation =
        useMutation({
            mutationFn:
                async (
                    subscriptionId: number,
                ) => {

                    if (!client) {
                        throw new Error(
                            "Customer client is not ready.",
                        );
                    }

                    return client.cancelSubscription(
                        subscriptionId,
                    );
                },

            onSuccess:
                async () => {

                    await queryClient.invalidateQueries({
                        queryKey:
                            queryKeys.customer.all,
                    });
                },
        });

    return {
        cancel:
            mutation.mutateAsync,

        loading:
            mutation.isPending,

        error:
            mutation.error instanceof Error
                ? mutation.error
                : null,
    };
}