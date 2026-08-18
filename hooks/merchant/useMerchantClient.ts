"use client";

import {
    useMemo,
} from "react";

import {
    usePublicClient,
    useWalletClient,
} from "wagmi";

import {
    createMerchantClient,
} from "@/lib/sdk/createMerchantClient";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useMerchantClient() {
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

            return createMerchantClient({
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