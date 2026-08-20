"use client";

import {
    useCallback,
    useMemo,
    useState,
} from "react";

import type {
    Address,
} from "viem";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

import {
    useMerchantClient,
} from "@/hooks/merchant/useMerchantClient";

import type {
    MerchantRecord,
} from "@stripe-for-web3/core";

export type MerchantOnboardingStatus =
    | "disconnected"
    | "checking"
    | "not-created"
    | "existing"
    | "creating"
    | "complete"
    | "error";

export function useMerchantOnboardingPage() {

    ////////////////////////////////////////////////////////////
    // MERCHANT RESOURCE
    ////////////////////////////////////////////////////////////

    const merchant =
        useMerchant();

    ////////////////////////////////////////////////////////////
    // SDK
    ////////////////////////////////////////////////////////////

    const {
        client,

        ready:
            clientReady,
    } =
        useMerchantClient();

    ////////////////////////////////////////////////////////////
    // CREATION STATE
    ////////////////////////////////////////////////////////////

    const [
        creationLoading,
        setCreationLoading,
    ] = useState(false);

    const [
        creationError,
        setCreationError,
    ] =
        useState<Error | null>(
            null,
        );

    const [
        createdMerchant,
        setCreatedMerchant,
    ] =
        useState<MerchantRecord | null>(
            null,
        );

    ////////////////////////////////////////////////////////////
    // CREATE
    ////////////////////////////////////////////////////////////

    const createMerchant =
        useCallback(
            async ({
                name,
                payoutWallet,
                metadataURI,
            }: {
                name: string;

                payoutWallet:
                    Address;

                metadataURI:
                    string;
            }) => {

                if (
                    !client
                ) {
                    const error =
                        new Error(
                            "Merchant client is not ready.",
                        );

                    setCreationError(
                        error,
                    );

                    throw error;
                }

                if (
                    !merchant.ownerWallet
                ) {
                    const error =
                        new Error(
                            "Connect your merchant wallet first.",
                        );

                    setCreationError(
                        error,
                    );

                    throw error;
                }

                setCreationLoading(
                    true,
                );

                setCreationError(
                    null,
                );

                try {

                    const result =
                        await client.register({
                            name:
                                name.trim(),

                            payoutWallet,

                            metadataURI:
                                metadataURI.trim(),
                        });

                    /*
                     * Preserve the SDK's canonical result.
                     *
                     * If CreateMerchantResult has a direct merchant
                     * property, use that exact type when available.
                     */
                    const record =
                        extractMerchantRecord(
                            result,
                        );

                    if (
                        record
                    ) {
                        setCreatedMerchant(
                            record,
                        );
                    }

                    /*
                     * Re-read the canonical API resource.
                     *
                     * This is the same principle used by the customer
                     * onboarding flow.
                     */
                    await merchant.refresh();

                    return result;

                } catch (
                    cause
                ) {

                    const error =
                        cause instanceof Error
                            ? cause
                            : new Error(
                                "Unable to create merchant.",
                            );

                    setCreationError(
                        error,
                    );

                    throw error;

                } finally {

                    setCreationLoading(
                        false,
                    );
                }
            },
            [
                client,
                merchant,
            ],
        );

    ////////////////////////////////////////////////////////////
    // STATUS
    ////////////////////////////////////////////////////////////

    const status:
        MerchantOnboardingStatus =
        !merchant.ownerWallet
            ? "disconnected"
            : merchant.merchantStatus ===
                "loading" ||
                merchant.merchantStatus ===
                    "waiting" ||
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
            merchant.ownerWallet,

        merchant:
            merchant.merchant,

        merchantStatus:
            merchant.merchantStatus,

        loading:
            merchant.loading,

        refreshing:
            merchant.refreshing,

        customerError:
            merchant.error,

        clientReady,

        creationLoading,

        creationError,

        createMerchant,

        refreshMerchant:
            merchant.refresh,
    };
}

/*
 * Temporary compatibility helper.
 *
 * Once CreateMerchantResult is confirmed from the merchant SDK package,
 * replace this with the exact typed property.
 */
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