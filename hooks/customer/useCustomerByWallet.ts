"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import type {
    Address,
} from "viem";

import type {
    CustomerClient,
} from "@stripe-for-web3/customer";

////////////////////////////////////////////////////////////
// RESULT
////////////////////////////////////////////////////////////

export type CustomerLookupStatus =
    | "disconnected"
    | "loading"
    | "ready"
    | "not-created"
    | "error";

export interface CustomerLookupState {
    status: CustomerLookupStatus;

    customer:
        | Awaited<
            ReturnType<
                CustomerClient["getByWallet"]
            >
        >
        | null;

    error:
        | Error
        | null;

    refresh:
        () => Promise<void>;
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useCustomerByWallet({
    client,
    address,
}: {
    client:
        | CustomerClient
        | null;

    address:
        | Address
        | undefined;
}): CustomerLookupState {

    const [
        status,
        setStatus,
    ] =
        useState<CustomerLookupStatus>(
            "disconnected",
        );

    const [
        customer,
        setCustomer,
    ] = 
        useState<
            Awaited<
                ReturnType<
                    CustomerClient["getByWallet"]
                >
            >
            | null
        >(null);

    const [
        error,
        setError,
    ] =
        useState<Error | null>(
            null,
        );

    const load =  
        useCallback(
            async () => {

                if (
                    !client ||
                    !address
                ) {
                    setStatus(
                        "disconnected",
                    );

                    setCustomer(
                        null,
                    );

                    return;
                }

                setStatus(
                    "loading",
                );

                setError(
                    null,
                );

                try {

                    const result =
                        await client.getByWallet(
                            address,
                        );

                    setCustomer(
                        result ?? null,
                    );

                    setStatus(
                        result
                            ? "ready"
                            : "not-created",
                    );

                } catch (
                    cause
                ) {

                    const normalized =
                        cause instanceof Error
                            ? cause
                            : new Error(
                                "Unable to load customer.",
                            );

                    setError(
                        normalized,
                    );

                    setStatus(
                        "error",
                    );
                }

            },
            [
                client,
                address,
            ],
        );

    useEffect(() => {
        void load();
    }, [load]);

    return {
        status,

        customer,

        error,

        refresh:
            load,
    };
}