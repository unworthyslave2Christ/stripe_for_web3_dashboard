"use client";

import {
    useCallback,
    useState,
} from "react";

import {
    useAccount,
} from "wagmi";

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
        address,
        isConnected,
    } = useAccount();

    const walletConnected =
        Boolean(
            isConnected &&
            address,
        );

    ////////////////////////////////////////////////////////////
    // CUSTOMER
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
    // CLIENT
    ////////////////////////////////////////////////////////////

    const {
        client,

        ready:
            clientReady,
    } =
        useCustomerClient();

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

                if (
                    !walletConnected ||
                    !address
                ) {
                    const error =
                        new Error(
                            "Connect your customer wallet first.",
                        );

                    setRegistrationError(
                        error,
                    );

                    throw error;
                }

                if (
                    !clientReady ||
                    !client
                ) {
                    const error =
                        new Error(
                            "Customer client is not ready.",
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
                walletConnected,
                address,
                client,
                clientReady,
                refreshCustomer,
            ],
        );

    ////////////////////////////////////////////////////////////
    // STATUS
    ////////////////////////////////////////////////////////////

    let status:
        CustomerOnboardingStatus;

    if (!walletConnected) {

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

        address,

        walletConnected,

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