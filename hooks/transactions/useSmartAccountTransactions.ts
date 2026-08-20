"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    appConfig,
} from "@/app/config";

import {
    customerTransactionsDemo,
} from "@/lib/demo/customerTransactionsDemo";

import type {
    CustomerTransactionRecord,
    CustomerTransactionStatus,
    CustomerTransactionType,
} from "@/types/customer-transaction";

export type TransactionTypeFilter =
    | "all"
    | "billing"
    | "permission"
    | "account"
    | "refund";

export type TransactionStatusFilter =
    | "all"
    | "success"
    | "pending"
    | "failed";

function matchesType(
    transaction:
        CustomerTransactionRecord,
    filter:
        TransactionTypeFilter,
) {
    if (
        filter ===
        "all"
    ) {
        return true;
    }

    switch (
        filter
    ) {
        case "billing":
            return (
                transaction.type ===
                "SUBSCRIPTION_BILLING"
            );

        case "permission":
            return (
                transaction.type ===
                "PERMISSION_UPDATE"
            );

        case "account":
            return (
                transaction.type ===
                "ACCOUNT_OPERATION"
            );

        case "refund":
            return (
                transaction.type ===
                "REFUND"
            );
    }
}

function matchesStatus(
    transaction:
        CustomerTransactionRecord,
    filter:
        TransactionStatusFilter,
) {
    if (
        filter ===
        "all"
    ) {
        return true;
    }

    return (
        transaction.status.toLowerCase() ===
        filter
    );
}

export function useSmartAccountTransactions({
    smartAccount,
}: {
    smartAccount:
        | string
        | undefined;
}) {
    const [
        search,
        setSearchState,
    ] = useState("");

    const [
        type,
        setType,
    ] =
        useState<TransactionTypeFilter>(
            "all",
        );

    const [
        status,
        setStatus,
    ] =
        useState<TransactionStatusFilter>(
            "all",
        );

    const [
        page,
        setPage,
    ] = useState(1);

    const pageSize =
        10;

    const records =
        useMemo<
            CustomerTransactionRecord[]
        >(() => {

            if (
                !appConfig.demoMode
            ) {
                return [];
            }

            return customerTransactionsDemo.map(
                (
                    transaction,
                ) => ({
                    ...transaction,

                    smartAccount:
                        smartAccount ??
                        "",
                }),
            );

        }, [
            smartAccount,
        ]);

    const filtered =
        useMemo(() => {

            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return records.filter(
                (
                    transaction,
                ) => {

                    const matchesSearch =
                        !normalizedSearch ||
                        transaction.title
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        transaction.description
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        transaction.transactionHash
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            );

                    return (
                        matchesSearch &&
                        matchesType(
                            transaction,
                            type,
                        ) &&
                        matchesStatus(
                            transaction,
                            status,
                        )
                    );
                },
            );

        }, [
            records,
            search,
            type,
            status,
        ]);

    const totalPages =
        Math.max(
            Math.ceil(
                filtered.length /
                    pageSize,
            ),
            1,
        );

    const safePage =
        Math.min(
            page,
            totalPages,
        );

    const items =
        filtered.slice(
            (
                safePage -
                1
            ) *
                pageSize,
            safePage *
                pageSize,
        );

    const counts =
        useMemo(() => {

            const success =
                records.filter(
                    (
                        transaction,
                    ) =>
                        transaction.status ===
                        "SUCCESS",
                ).length;

            const pending =
                records.filter(
                    (
                        transaction,
                    ) =>
                        transaction.status ===
                        "PENDING",
                ).length;

            const failed =
                records.filter(
                    (
                        transaction,
                    ) =>
                        transaction.status ===
                        "FAILED",
                ).length;

            return {
                total:
                    records.length,

                success,

                pending,

                failed,
            };

        }, [
            records,
        ]);

    function setSearch(
        value: string,
    ) {
        setSearchState(
            value,
        );

        setPage(1);
    }

    function setTypeFilter(
        value:
            TransactionTypeFilter,
    ) {
        setType(
            value,
        );

        setPage(1);
    }

    function setStatusFilter(
        value:
            TransactionStatusFilter,
    ) {
        setStatus(
            value,
        );

        setPage(1);
    }

    return {
        records,

        items,

        counts,

        search,

        setSearch,

        type,

        setTypeFilter,

        status,

        setStatusFilter,

        page:
            safePage,

        pageSize,

        totalCount:
            filtered.length,

        totalPages,

        setPage,

        loading:
            false,

        refreshing:
            false,

        error:
            null,

        mode:
            appConfig.demoMode
                ? "demo"
                : "live",
    };
}