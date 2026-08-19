"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    useConnectedWallet,
} from "@/hooks/wallet/useConnectedWallet";

import {
    useCustomerClient,
} from "./useCustomerClient";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useCustomer() {

    const {
        authenticated,
        address,
    } =
        useConnectedWallet();

    const {
        client,
        ready:
            clientReady,
    } =
        useCustomerClient();

    const query =
        useQuery({
            queryKey:
                address
                    ? queryKeys.customer.byWallet(
                        address,
                    )
                    : queryKeys.customer.all,

            queryFn:
                async () => {

                    if (!client) {
                        throw new Error(
                            "Customer client is not ready.",
                        );
                    }

                    if (!address) {
                        throw new Error(
                            "Customer wallet is not connected.",
                        );
                    }

                    return client.getByWallet(
                        address as `0x${string}`,
                    );
                },

            enabled:
                Boolean(
                    authenticated &&
                    address &&
                    clientReady,
                ),

            retry:
                false,
        });

    ////////////////////////////////////////////////////////////
    // STATUS
    ////////////////////////////////////////////////////////////

    let status:
        | "disconnected"
        | "waiting"
        | "loading"
        | "ready"
        | "not-created"
        | "error";

    if (!authenticated) {

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
        customer:
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