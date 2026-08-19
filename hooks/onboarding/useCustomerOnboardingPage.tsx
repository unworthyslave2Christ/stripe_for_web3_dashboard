"use client";

import {
    useCallback,
    useState,
} from "react";

import {
    useConnectedWallet,
} from "@/hooks/wallet/useConnectedWallet";

import {
    useCustomerClient,
} from "@/hooks/customer/useCustomerClient";

import {
    useCustomer,
} from "@/hooks/customer/useCustomer";

////////////////////////////////////////////////////////////
// STATUS
////////////////////////////////////////////////////////////

export type CustomerOnboardingStatus =
    | "disconnected"
    | "checking"
    | "not-created"
    | "existing"
    | "registering"
    | "complete"
    | "error";
    

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useCustomerOnboardingPage() {

    ////////////////////////////////////////////////////////////
    // WALLET
    ////////////////////////////////////////////////////////////

    const {
        ready:
            walletReady,

        authenticated,

        address,
    } =
        useConnectedWallet();

    ////////////////////////////////////////////////////////////
    // SDK
    ////////////////////////////////////////////////////////////

    const {
        client,

        ready:
            clientReady,
    } =
        useCustomerClient();

    ////////////////////////////////////////////////////////////
    // CUSTOMER RESOURCE
    ////////////////////////////////////////////////////////////

    const {
        customer,

        status:
            customerStatus,

        loading:
            customerLoading,

        error:
            customerError,

        refresh:
            refreshCustomer,
    } =
        useCustomer();

    ////////////////////////////////////////////////////////////
    // REGISTRATION
    ////////////////////////////////////////////////////////////

    const [
        registrationLoading,
        setRegistrationLoading,
    ] =
        useState(false);

    const [
        registrationError,
        setRegistrationError,
    ] =
        useState<Error | null>(
            null,
        );

    ////////////////////////////////////////////////////////////
    // REGISTER
    ////////////////////////////////////////////////////////////

    const register =
        useCallback(
            async ({
                displayName,
                email,
            }: {
                displayName: string;

                email: string;
            }) => {

                if (!client) {
                    const error =
                        new Error(
                            "Customer client is not ready.",
                        );

                    setRegistrationError(
                        error,
                    );

                    throw error;
                }

                if (!address) {
                    const error =
                        new Error(
                            "Connect your wallet first.",
                        );

                    setRegistrationError(
                        error,
                    );

                    throw error;
                }

                setRegistrationLoading(
                    true,
                );

                setRegistrationError(
                    null,
                );

                try {

                    const result =
                        await client.register({
                            displayName:
                                displayName.trim(),

                            email:
                                email.trim(),
                        });

                    ////////////////////////////////////////////////////
                    // IMPORTANT
                    // Re-read canonical customer state from the API.
                    ////////////////////////////////////////////////////

                    await refreshCustomer();

                    return result;

                } catch (cause) {

                    const error =
                        cause instanceof Error
                            ? cause
                            : new Error(
                                "Unable to create customer.",
                            );

                    setRegistrationError(
                        error,
                    );

                    throw error;

                } finally {

                    setRegistrationLoading(
                        false,
                    );
                }
            },
            [
                client,

                address,

                refreshCustomer,
            ],
        );

    ////////////////////////////////////////////////////////////
    // DERIVED STATUS
    ////////////////////////////////////////////////////////////

    let status:
        CustomerOnboardingStatus;

    if (
        !walletReady ||
        !authenticated
    ) {

        status =
            "disconnected";

    } else if (
        !clientReady ||
        customerLoading
    ) {

        status =
            "checking";

    } else if (
        registrationLoading
    ) {

        status =
            "registering";

    } else if (
        customerStatus ===
        "ready"
    ) {

        status =
            "existing";

    } else if (
        customerStatus ===
        "not-created"
    ) {

        status =
            "not-created";

    } else if (
        customerStatus ===
        "error"
    ) {

        status =
            "error";

    } else {

        status =
            "checking";
    }

    return {
        status,

        walletReady,

        authenticated,

        address,

        clientReady,

        customer,

        customerStatus,

        customerLoading,

        customerError,

        registrationLoading,

        registrationError,

        register,

        refreshCustomer,
    };
}