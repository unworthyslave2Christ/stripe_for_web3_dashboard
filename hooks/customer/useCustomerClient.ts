"use client";

import { useMemo } from "react";

import {
    useAccount,
    usePublicClient,
    useWalletClient,
} from "wagmi";

import type {
    Address,
    PublicClient,
    WalletClient,
} from "viem";

import {
    CustomerClient,
} from "@stripe-for-web3/customer";

import {
    appConfig,
} from "@/app/config";

////////////////////////////////////////////////////////////
// FACTORY
////////////////////////////////////////////////////////////

function createCustomerClient({
    walletClient,
    publicClient,
}: {
    walletClient: WalletClient;
    publicClient: PublicClient;
}) {
    return new CustomerClient({
        walletClient,

        publicClient,

        contractAddress:
            appConfig.billingContractAddress,

        apiUrl:
            appConfig.apiUrl,
    });
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useCustomerClient() {
    const {
        address,
        isConnected,
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

    const ready =
        Boolean(
            connected &&
            walletClient &&
            publicClient,
        );

    const client =
        useMemo(() => {

            if (
                !ready ||
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
            ready,
            walletClient,
            publicClient,
        ]);

    return {
        client,

        walletClient,

        publicClient,

        connected,

        address:
            address as
                | Address
                | undefined,

        ready:
            Boolean(
                client &&
                ready,
            ),
    };
}