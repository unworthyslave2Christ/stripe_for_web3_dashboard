"use client";

import {
    useMemo,
    useState,
} from "react";

import type {
    CustomerRecord,
} from "@stripe-for-web3/core";

export function useMerchantCustomersPage() {
    const [
        search,
        setSearch,
    ] = useState("");

    const [
        status,
        setStatus,
    ] = useState<
        "ALL" |
        "ACTIVE" |
        "SUSPENDED"
    >("ALL");

    const [
        page,
        setPage,
    ] = useState(1);

    /*
     * There is intentionally no merchant-wide
     * customer resource here yet.
     *
     * The current SDK does not expose:
     *
     *     merchant.getCustomers()
     *
     * so the live customer collection cannot
     * honestly be loaded yet.
     */

    const customers =
        useMemo<
            CustomerRecord[]
        >(() => {
            return [];
        }, []);

    const filteredCustomers =
        useMemo(() => {
            const normalized =
                search
                    .trim()
                    .toLowerCase();

            return customers.filter(
                customer => {

                    const matchesSearch =
                        !normalized ||
                        customer.displayName
                            .toLowerCase()
                            .includes(
                                normalized,
                            ) ||
                        customer.email
                            .toLowerCase()
                            .includes(
                                normalized,
                            ) ||
                        customer.customerId
                            .toLowerCase()
                            .includes(
                                normalized,
                            );

                    const matchesStatus =
                        status === "ALL" ||
                        customer.status ===
                            status;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                },
            );
        }, [
            customers,
            search,
            status,
        ]);

    return {
        search,
        setSearch,

        status,
        setStatus,

        page,
        setPage,

        customers:
            filteredCustomers,

        total:
            filteredCustomers.length,

        totalPages:
            0,

        available:
            false,
    };
}