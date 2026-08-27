"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    usePrivy,
} from "@privy-io/react-auth";

import {
    useAccount,
} from "wagmi";

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

function isNotFoundError(error: unknown) {
    if (!error) {
        return false;
    }

    if (
        typeof error === "object" &&
        error !== null &&
        "status" in error
    ) {
        return (
            (error as { status?: number }).status === 404
        );
    }

    return false;
}

export function useMerchant() {
    const {
        ready: privyReady,
        authenticated,
    } = usePrivy();

    const {
        address,
        isConnected,
    } = useAccount();

    const {
        client,
        ready: clientReady,
    } = useMerchantClient();

    // const walletConnected =
    //     Boolean(
    //         privyReady &&
    //         authenticated &&
    //         isConnected &&
    //         address,
    //     );

    const walletConnected =
        Boolean(
            privyReady &&
            isConnected &&
            address,
        );

    const query =
        useQuery({
            queryKey:
                walletConnected && address
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

    let merchantStatus:
        MerchantResourceStatus;

    console.log("!walletConnected: ", !walletConnected);
    console.log("privyReady: ", privyReady);
    console.log("authenticated: ", authenticated);

    if (!walletConnected) {
        merchantStatus =
            "disconnected";
    } else if (!clientReady) {
        merchantStatus =
            "waiting";
    } else if (query.isLoading) {
        merchantStatus =
            "loading";
    } else if (
        query.isError &&
        isNotFoundError(query.error)
    ) {
        merchantStatus = "not-created";
    } else if (query.isError) {
        merchantStatus = "error";
    } else if (query.data) {
        merchantStatus = "ready";
    } else {
        merchantStatus = "not-created";
    }

    return {
        merchant:
            walletConnected
                ? query.data ?? null
                : null,

        merchantStatus,

        ownerWallet:
            walletConnected
                ? address
                : undefined,

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