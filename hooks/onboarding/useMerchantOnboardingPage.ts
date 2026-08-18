"use client";

import {
    useCallback,
    useState,
} from "react";

import type {
    Address,
} from "viem";

import {
    useConnectedWallet,
} from "@/hooks/wallet/useConnectedWallet";

import {
    useMerchantClient,
} from "@/hooks/merchant/useMerchantClient";

////////////////////////////////////////////////////////////
// STATUS
////////////////////////////////////////////////////////////

export type MerchantOnboardingStatus =
    | "idle"
    | "ready"
    | "creating"
    | "complete"
    | "error";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useMerchantOnboardingPage() {

    ////////////////////////////////////////////////////////////
    // CONNECTED WALLET
    ////////////////////////////////////////////////////////////

    const {
        ready: walletReady,
        authenticated,
        address,
    } =
        useConnectedWallet();

    ////////////////////////////////////////////////////////////
    // SDK
    ////////////////////////////////////////////////////////////

    const {
        client,
        ready: clientReady,
    } =
        useMerchantClient();

    ////////////////////////////////////////////////////////////
    // STATE
    ////////////////////////////////////////////////////////////

    const [
        creationLoading,
        setCreationLoading,
    ] = useState(false);

    const [
        creationError,
        setCreationError,
    ] =
        useState<Error | null>(null);

    const [
        merchant,
        setMerchant,
    ] =
        useState<unknown | null>(null);

    ////////////////////////////////////////////////////////////
    // CREATE MERCHANT
    ////////////////////////////////////////////////////////////

    const createMerchant =
        useCallback(
            async ({
                name,
                payoutWallet,
                metadataURI,
            }: {
                name: string;

                payoutWallet: Address;

                metadataURI: string;
            }) => {

                if (!client) {
                    throw new Error(
                        "Merchant client is not ready.",
                    );
                }

                if (!address) {
                    throw new Error(
                        "Connect your wallet first.",
                    );
                }

                setCreationLoading(true);

                setCreationError(null);

                try {

                    ////////////////////////////////////////////////////
                    // EXISTING SDK WORKFLOW
                    ////////////////////////////////////////////////////

                    const result =
                        await client.register({
                            name:
                                name.trim(),

                            payoutWallet,

                            metadataURI:
                                metadataURI.trim(),
                        });

                    setMerchant(result);

                    return result;

                } catch (cause) {

                    const normalized =
                        cause instanceof Error
                            ? cause
                            : new Error(
                                "Unable to create merchant.",
                            );

                    setCreationError(
                        normalized,
                    );

                    throw normalized;

                } finally {

                    setCreationLoading(false);

                }
            },
            [
                client,
                address,
            ],
        );

    ////////////////////////////////////////////////////////////
    // DERIVED STATUS
    ////////////////////////////////////////////////////////////

    let status:
        MerchantOnboardingStatus;

    if (
        !walletReady ||
        !authenticated
    ) {
        status = "idle";
    } else if (
        !clientReady
    ) {
        status = "ready";
    } else if (
        creationLoading
    ) {
        status = "creating";
    } else if (
        merchant
    ) {
        status = "complete";
    } else {
        status = "ready";
    }

    return {
        status,

        authenticated,

        address,

        clientReady,

        merchant,

        creationLoading,

        creationError,

        createMerchant,
    };
}