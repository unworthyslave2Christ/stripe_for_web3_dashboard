"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    usePrivy,
} from "@privy-io/react-auth";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

import {
    useMerchantClient,
} from "./useMerchantClient";

export type MerchantResourceStatus =
    | "disconnected"
    | "waiting"
    | "loading"
    | "ready"
    | "not-created"
    | "error";

export function useMerchant() {
    const {
        ready:
            privyReady,

        authenticated,

        user,
    } =
        usePrivy();

    const address =
        user?.wallet?.address;

    const {
        client,

        ready:
            clientReady,
    } =
        useMerchantClient();

    const query =
        useQuery({
            queryKey:
                address
                    ? queryKeys.merchant.byOwnerWallet(
                        address,
                    )
                    : queryKeys.merchant.all,

            queryFn:
                async () => {
                    if (!client) {
                        throw new Error(
                            "Merchant client is not ready.",
                        );
                    }

                    if (!address) {
                        throw new Error(
                            "Merchant wallet is not connected.",
                        );
                    }

                    return client.getByOwnerWallet(
                        address as `0x${string}`,
                    );
                },

            enabled:
                Boolean(
                    privyReady &&
                    authenticated &&
                    address &&
                    clientReady,
                ),

            retry:
                false,
        });

    let status:
        MerchantResourceStatus;

    if (
        !privyReady ||
        !authenticated
    ) {
        status =
            "disconnected";
    } else if (
        !address ||
        !clientReady
    ) {
        status =
            "waiting";
    } else if (
        query.isLoading
    ) {
        status =
            "loading";
    } else if (
        query.isError
    ) {
        status =
            "error";
    } else if (
        query.data
    ) {
        status =
            "ready";
    } else {
        status =
            "not-created";
    }

    return {
        merchant:
            query.data ??
            null,

        merchantStatus:
            status,

        ownerWallet:
            address,

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