"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    appConfig,
} from "@/app/config";

import {
    customerBillingDemo,
} from "@/lib/demo/customerBillingDemo";

import type {
    CustomerBillingRecord,
} from "@/types/customer-billing";

export type BillingHistoryStatusFilter =
    | "all"
    | "succeeded"
    | "pending"
    | "failed"
    | "refunded";

export function useCustomerBillingHistory({
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
        status,
        setStatus,
    ] =
        useState<BillingHistoryStatusFilter>(
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
            CustomerBillingRecord[]
        >(() => {

            if (
                !appConfig.demoMode
            ) {
                return [];
            }

            return customerBillingDemo.map(
                (
                    record,
                ) => ({
                    ...record,
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
                    record,
                ) => {

                    const matchesSearch =
                        !normalizedSearch ||
                        record.billingId
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        record.planName
                            .toLowerCase()
                            .includes(
                                normalizedSearch,
                            ) ||
                        record.subscriptionId
                            .toString()
                            .includes(
                                normalizedSearch,
                            );

                    const matchesStatus =
                        status ===
                            "all" ||
                        record.status
                            .toLowerCase() ===
                            status;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                },
            );

        }, [
            records,
            search,
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
            (safePage - 1) *
                pageSize,
            safePage *
                pageSize,
        );

    function setSearch(
        value: string,
    ) {
        setSearchState(
            value,
        );

        setPage(1);
    }

    function setStatusFilter(
        value:
            BillingHistoryStatusFilter,
    ) {
        setStatus(
            value,
        );

        setPage(1);
    }

    return {
        records,

        items,

        search,

        setSearch,

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
    };
}