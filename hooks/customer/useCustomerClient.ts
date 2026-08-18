"use client";

import {
    useMemo,
} from "react";

import {
    usePublicClient,
    useWalletClient,
} from "wagmi";

import {
    createCustomerClient,
} from "@/lib/sdk/createCustomerClient";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useCustomerClient() {
    const {
        data: walletClient,
    } = useWalletClient();

    const publicClient =
        usePublicClient();

    const client =
        useMemo(() => {

            if (
                !walletClient ||
                !publicClient
            ) {
                return null;
            }

            return createCustomerClient({
                walletClient,

                publicClient,
            });

        }, [
            walletClient,

            publicClient,
        ]);

    return {
        client,

        walletClient,

        publicClient,

        ready:
            Boolean(
                walletClient &&
                publicClient,
            ),
    };
}