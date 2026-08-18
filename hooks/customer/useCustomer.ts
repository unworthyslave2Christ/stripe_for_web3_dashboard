"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import type {
    Address,
} from "viem";

import {
    useCustomerClient,
} from "./useCustomerClient";

import {
    useConnectedWallet,
} from "@/hooks/wallet/useConnectedWallet";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

export function useCustomer() {
    const {
        address,
        authenticated,
    } =
        useConnectedWallet();

    const {
        client,
    } =
        useCustomerClient();

    const walletAddress =
        address as
            | Address
            | undefined;

    const query =
        useQuery({
            queryKey:
                walletAddress
                    ? queryKeys.customer.byWallet(
                        walletAddress,
                    )
                    : queryKeys.customer.all,

            queryFn:
                async () => {

                    if (
                        !client ||
                        !walletAddress
                    ) {
                        return null;
                    }

                    return client.getByWallet(
                        walletAddress,
                    );
                },

            enabled:
                Boolean(
                    authenticated &&
                    client &&
                    walletAddress,
                ),

            retry: false,
        });

    const customer =
        query.data ?? null;

    return {
        customer,

        status:
            !authenticated
                ? "disconnected"
                : query.isLoading
                    ? "loading"
                    : query.isError
                        ? "error"
                        : customer
                            ? "ready"
                            : "not-created",

        error:
            query.error
                ? query.error instanceof Error
                    ? query.error
                    : new Error(
                        "Unable to load customer.",
                    )
                : null,

        loading:
            query.isLoading,

        refreshing:
            query.isFetching &&
            !query.isLoading,

        refresh:
            query.refetch,
    };
}