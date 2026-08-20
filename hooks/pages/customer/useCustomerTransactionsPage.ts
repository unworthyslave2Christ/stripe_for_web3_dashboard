"use client";

import {
    useMemo,
} from "react";

import {
    useChainId,
} from "wagmi";

import {
    useCustomer,
} from "@/hooks/customer/useCustomer";

import {
    useSmartAccountTransactions,
} from "@/hooks/transactions/useSmartAccountTransactions";

function getNetworkName(
    chainId:
        | number
        | undefined,
) {
    switch (
        chainId
    ) {
        case 421614:
            return "Arbitrum Sepolia";

        case 42161:
            return "Arbitrum One";

        default:
            return chainId
                ? `Chain ${chainId}`
                : undefined;
    }
}

export function useCustomerTransactionsPage() {

    const customer =
        useCustomer();

    const chainId =
        useChainId();

    const smartAccount =
        customer.customer
            ?.smartAccount;

    const transactions =
        useSmartAccountTransactions({
            smartAccount,
        });

    const latestTransaction =
        useMemo(
            () =>
                transactions.records
                    .slice()
                    .sort(
                        (
                            a,
                            b,
                        ) =>
                            b.timestamp.localeCompare(
                                a.timestamp,
                            ),
                    )[0] ??
                null,
            [
                transactions.records,
            ],
        );

    return {
        mode:
            transactions.mode,

        customer,

        smartAccount,

        network:
            getNetworkName(
                chainId,
            ),

        latestTransaction,

        transactions,

        loading:
            customer.loading ||
            transactions.loading,

        refreshing:
            customer.refreshing ||
            transactions.refreshing,

        error:
            customer.error ??
            transactions.error ??
            null,
    };
}