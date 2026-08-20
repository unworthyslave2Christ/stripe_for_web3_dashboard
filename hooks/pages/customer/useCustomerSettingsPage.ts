"use client";

import {
    useCallback,
    useState,
} from "react";

import {
    useChainId,
} from "wagmi";

import {
    useTheme,
} from "next-themes";

import {
    useCustomer,
} from "@/hooks/customer/useCustomer";

import {
    useConnectedWallet,
} from "@/hooks/wallet/useConnectedWallet";

export function useCustomerSettingsPage() {

    ////////////////////////////////////////////////////////////
    // REAL CUSTOMER RESOURCE
    ////////////////////////////////////////////////////////////

    const customer =
        useCustomer();

    ////////////////////////////////////////////////////////////
    // REAL WALLET RESOURCE
    ////////////////////////////////////////////////////////////

    const wallet =
        useConnectedWallet();

    ////////////////////////////////////////////////////////////
    // REAL CHAIN STATE
    ////////////////////////////////////////////////////////////

    const chainId =
        useChainId();

    ////////////////////////////////////////////////////////////
    // REAL THEME STATE
    ////////////////////////////////////////////////////////////

    const {
        theme,
        setTheme,
    } = useTheme();

    ////////////////////////////////////////////////////////////
    // LOCAL SETTINGS STATE
    //
    // These become API-backed once the corresponding endpoint
    // exists.
    ////////////////////////////////////////////////////////////

    const [
        emailNotifications,
        setEmailNotifications,
    ] = useState(true);

    const [
        inAppNotifications,
        setInAppNotifications,
    ] = useState(true);

    const [
        securityNotifications,
        setSecurityNotifications,
    ] = useState(true);

    const [
        confirmSensitiveActions,
        setConfirmSensitiveActions,
    ] = useState(true);

    ////////////////////////////////////////////////////////////
    // DISPLAY NAME / EMAIL
    //
    // Initialize from the actual customer resource.
    ////////////////////////////////////////////////////////////

    const displayName =
        customer.customer
            ?.displayName ??
        "";

    const email =
        customer.customer
            ?.email ??
        "";

    ////////////////////////////////////////////////////////////
    // NETWORK
    ////////////////////////////////////////////////////////////

    const network =
        getNetworkName(
            chainId,
        );

    ////////////////////////////////////////////////////////////
    // DEMO ACTION BOUNDARY
    ////////////////////////////////////////////////////////////

    const saveProfile =
        useCallback(
            async ({
                displayName:
                    nextDisplayName,
                email:
                    nextEmail,
            }: {
                displayName: string;

                email: string;
            }) => {

                /*
                 * IMPORTANT:
                 *
                 * The current CustomerClient supplied earlier
                 * does not expose an updateCustomer() operation.
                 *
                 * Therefore we deliberately do not invent one here.
                 *
                 * When that SDK/API operation exists, this function
                 * becomes the single place that invokes it.
                 */

                if (
                    !nextDisplayName.trim()
                ) {
                    throw new Error(
                        "Display name is required.",
                    );
                }

                if (
                    !nextEmail.trim()
                ) {
                    throw new Error(
                        "Email address is required.",
                    );
                }

                return {
                    displayName:
                        nextDisplayName.trim(),

                    email:
                        nextEmail.trim(),
                };
            },
            [],
        );

    ////////////////////////////////////////////////////////////
    // RESULT
    ////////////////////////////////////////////////////////////

    return {
        customer,

        wallet,

        profile: {
            displayName,

            email,

            saveProfile,
        },

        walletInfo: {
            ownerWallet:
                wallet.address,

            smartAccount:
                customer.customer
                    ?.smartAccount,

            network,
        },

        notifications: {
            email:
                emailNotifications,

            inApp:
                inAppNotifications,

            security:
                securityNotifications,

            setEmail:
                setEmailNotifications,

            setInApp:
                setInAppNotifications,

            setSecurity:
                setSecurityNotifications,
        },

        security: {
            confirmSensitiveActions,

            setConfirmSensitiveActions,
        },

        appearance: {
            theme:
                theme ??
                "system",

            setTheme,
        },

        chainId,

        loading:
            customer.loading,

        refreshing:
            customer.refreshing,

        error:
            customer.error ??
            null,
    };
}

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
                : "Network unavailable";
    }
}