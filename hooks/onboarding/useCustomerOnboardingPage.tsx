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
    useCustomerClient,
} from "@/hooks/customer/useCustomerClient";

import {
    useCustomerByWallet,
} from "@/hooks/customer/useCustomerByWallet";

////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////

type OnboardingStatus =
    | "idle"
    | "checking"
    | "ready"
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
        status:
            customerStatus,

        customer,

        error:
            customerError,

        refresh:
            refreshCustomer,
    } =
        useCustomerByWallet({
            client,

            address:
                address as
                    | Address
                    | undefined,
        });

    ////////////////////////////////////////////////////////////
    // REGISTRATION STATE
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
                    throw new Error(
                        "Customer client is not ready.",
                    );
                }

                if (!address) {
                    throw new Error(
                        "Connect your wallet first.",
                    );
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
                    // REFRESH THE RESOURCE
                    ////////////////////////////////////////////////////

                    await refreshCustomer();

                    return result;

                } catch (
                    cause
                ) {

                    const normalized =
                        cause instanceof Error
                            ? cause
                            : new Error(
                                "Unable to create customer.",
                            );

                    setRegistrationError(
                        normalized,
                    );

                    throw normalized;

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

    const status: OnboardingStatus =
        !walletReady ||
        !authenticated
            ? "idle"
            : !clientReady
                ? "checking"
                : customerStatus === "loading"
                    ? "checking"
                    : registrationLoading
                        ? "registering"
                        : customerStatus === "ready"
                            ? "ready"
                            : customerStatus === "not-created"
                                ? "idle"
                                : customerStatus === "error"
                                    ? "error"
                                    : "idle";

    return {
        status,

        walletReady,

        authenticated,

        address,

        clientReady,

        customer,

        customerStatus,

        customerError,

        registrationLoading,

        registrationError,

        register,

        refreshCustomer,
    };
}