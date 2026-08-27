"use client";

import { useQuery } from "@tanstack/react-query";

import {
    useAccount,
} from "wagmi";

import {
    useCustomerClient,
} from "@/hooks/customer/useCustomerClient";

import {
    queryKeys,
} from "@/lib/query/queryKeys";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useCustomer() {
    const {
        address,
        isConnected,
    } = useAccount();

    const {
        client,
        ready: clientReady,
    } = useCustomerClient();

    const walletConnected =
        Boolean(
            isConnected &&
            address,
        );

    const query =
        useQuery({
            queryKey:
                walletConnected &&
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
                        address,
                    );
                },

            enabled:
                Boolean(
                    walletConnected &&
                    clientReady,
                ),

            retry: false,
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

    if (!walletConnected) {

        status =
            "disconnected";

    } else if (!clientReady) {

        status =
            "waiting";

    } else if (query.isLoading) {

        status =
            "loading";

    } else if (query.isError) {

        status =
            "error";

    } else if (query.data) {

        status =
            "ready";

    } else {

        status =
            "not-created";
    }

    return {
        customer:
            walletConnected
                ? query.data ?? null
                : null,

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