"use client";

import {
    useCallback,
    useState,
} from "react";

import type {
    MerchantClient,
} from "@stripe-for-web3/merchant";

////////////////////////////////////////////////////////////
// STATUS
////////////////////////////////////////////////////////////

export type MerchantLookupStatus =
    | "idle"
    | "loading"
    | "ready"
    | "not-created"
    | "error";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useMerchantByWallet({
    client,
}: {
    client:
        | MerchantClient
        | null;
}) {
    const [
        status,
        setStatus,
    ] =
        useState<MerchantLookupStatus>(
            "idle",
        );

    const [
        merchant,
        setMerchant,
    ] =
        useState<unknown | null>(
            null,
        );

    const [
        error,
        setError,
    ] =
        useState<Error | null>(
            null,
        );

    const refresh =
        useCallback(
            async () => {

                if (!client) {
                    setStatus("idle");
                    setMerchant(null);
                    return;
                }

                setStatus("loading");
                setError(null);

                try {

                    // Do not invent a wallet lookup
                    // operation here.
                    //
                    // Wire this to the exact existing
                    // MerchantClient lookup method when
                    // we confirm its signature.

                    setMerchant(null);
                    setStatus("not-created");

                } catch (cause) {

                    const normalized =
                        cause instanceof Error
                            ? cause
                            : new Error(
                                "Unable to load merchant.",
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
            ],
        );

    return {
        status,

        merchant,

        error,

        refresh,
    };
}