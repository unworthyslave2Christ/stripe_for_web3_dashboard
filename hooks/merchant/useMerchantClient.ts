"use client";

import { useMemo } from "react";

import {
    useAccount,
    usePublicClient,
    useWalletClient,
} from "wagmi";

import type {
    PublicClient,
    WalletClient,
} from "viem";

import {
    MerchantClient,
} from "@stripe-for-web3/merchant";

import {
    appConfig,
} from "@/app/config";

function createMerchantClient({
    walletClient,
    publicClient,
}: {
    walletClient: WalletClient;
    publicClient: PublicClient;
}) {
    return new MerchantClient({
        walletClient,
        publicClient,
        contractAddress:
            appConfig.billingContractAddress,
        apiUrl:
            appConfig.apiUrl,
    });
}

export function useMerchantClient() {
    const {
        isConnected,
        address,
    } = useAccount();

    const {
        data: walletClient,
    } = useWalletClient();

    const publicClient =
        usePublicClient();

    const connected =
        Boolean(
            isConnected &&
            address,
        );

    const client =
        useMemo(() => {
            if (
                !connected ||
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
            connected,
            walletClient,
            publicClient,
        ]);

    return {
        client,

        walletClient,

        publicClient,

        connected,

        ready:
            Boolean(
                connected &&
                walletClient &&
                publicClient,
            ),
    };
}