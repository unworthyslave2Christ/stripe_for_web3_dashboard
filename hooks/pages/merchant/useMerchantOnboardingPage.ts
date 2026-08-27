"use client";

import {
    useCallback,
    useState,
} from "react";

import type {
    Address,
} from "viem";

import type {
    MerchantRecord,
} from "@stripe-for-web3/core";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

import {
    useMerchantClient,
} from "@/hooks/merchant/useMerchantClient";
import { useAccount } from "wagmi";



////////////////////////////////////////////////////////////
// STATUS
////////////////////////////////////////////////////////////

export type MerchantOnboardingStatus =
    | "disconnected"
    | "checking"
    | "not-created"
    | "existing"
    | "creating"
    | "complete"
    | "error";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useMerchantOnboardingPage() {
    const merchant = useMerchant();

    const {
        address,
        isConnected,
    } = useAccount();

    const {
        client,
        ready: clientReady,
    } = useMerchantClient();


    const walletConnected =
        Boolean(
            isConnected &&
            address,
        );

    const [
        creationLoading,
        setCreationLoading,
    ] = useState(false);

    const [
        creationError,
        setCreationError,
    ] = useState<Error | null>(null);

    const [
        createdMerchant,
        setCreatedMerchant,
    ] = useState<MerchantRecord | null>(null);

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

                /*
                 * IMPORTANT:
                 * Use the current wagmi address directly.
                 * Do not depend on merchant.ownerWallet here.
                 */
                if (!walletConnected || !address) {
                    const error =
                        new Error(
                            "Connect your merchant wallet first.",
                        );

                    setCreationError(error);

                    throw error;
                }

                if (!client) {
                    const error =
                        new Error(
                            "Merchant client is not ready.",
                        );

                    setCreationError(error);

                    throw error;
                }

                setCreationLoading(true);
                setCreationError(null);

                try {
                    const result =
                        await client.register({
                            name: name.trim(),
                            payoutWallet,
                            metadataURI:
                                metadataURI.trim(),
                        });

                    const record =
                        extractMerchantRecord(result);

                    if (record) {
                        setCreatedMerchant(record);
                    }

                    await merchant.refresh();

                    return result;

                } catch (cause) {
                    const error =
                        cause instanceof Error
                            ? cause
                            : new Error(
                                "Unable to create merchant.",
                            );

                    setCreationError(error);

                    throw error;

                } finally {
                    setCreationLoading(false);
                }
            },
            [
                address,
                walletConnected,
                client,
                merchant.refresh,
            ],
        );

    ////////////////////////////////////////////////////////////
    // DERIVED STATUS
    ////////////////////////////////////////////////////////////

    const status: MerchantOnboardingStatus =
    merchant.merchantStatus ===
        "disconnected"
        ? "disconnected"
        : merchant.merchantStatus ===
              "waiting" ||
          merchant.merchantStatus ===
              "loading" ||
          !clientReady
        ? "checking"
        : creationLoading
        ? "creating"
        : createdMerchant
        ? "complete"
        : merchant.merchantStatus ===
              "ready"
        ? "existing"
        : merchant.merchantStatus ===
              "not-created"
        ? "not-created"
        : merchant.merchantStatus ===
              "error"
        ? "error"
        : "checking";

    
    return {
        status,

        ownerWallet:
            walletConnected
                ? address
                : undefined,

        merchant:
            merchant.merchant,

        merchantStatus:
            merchant.merchantStatus,

        loading:
            merchant.loading,

        refreshing:
            merchant.refreshing,

        error:
            merchant.error,

        clientReady,

        creationLoading,

        creationError,

        createMerchant,

        refreshMerchant:
            merchant.refresh,
    };
}

////////////////////////////////////////////////////////////
// TEMPORARY RESULT NORMALIZATION
////////////////////////////////////////////////////////////

function extractMerchantRecord(
    result: unknown,
): MerchantRecord | null {
    if (
        !result ||
        typeof result !==
            "object"
    ) {
        return null;
    }

    const value =
        result as Record<
            string,
            unknown
        >;

    if (
        value.merchant &&
        typeof value.merchant ===
            "object"
    ) {
        return value.merchant as MerchantRecord;
    }

    return null;
}