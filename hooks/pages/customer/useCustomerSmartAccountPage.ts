"use client";

import {
    useMemo,
} from "react";

import {
    useChainId,
} from "wagmi";

import {
    useConnectedWallet,
} from "@/hooks/wallet/useConnectedWallet";

import {
    useCustomer,
} from "@/hooks/customer/useCustomer";

import {
    appConfig,
} from "@/app/config";

import {
    smartAccountDemo,
} from "@/lib/demo/smartAccountDemo";

import type {
    SmartAccountStatus,
    SmartAccountViewModel,
} from "@/types/smart-account";

////////////////////////////////////////////////////////////
// NETWORK
////////////////////////////////////////////////////////////

function getNetworkName(
    chainId:
        | number
        | undefined,
): string | undefined {

    if (
        chainId ===
        421614
    ) {
        return "Arbitrum Sepolia";
    }

    if (
        chainId ===
        42161
    ) {
        return "Arbitrum One";
    }

    if (
        chainId ===
        undefined
    ) {
        return undefined;
    }

    return `Chain ${chainId}`;
}

////////////////////////////////////////////////////////////
// CUSTOMER RECORD ACCESS
//
// Keep this tolerant because the exact CustomerRecord
// shape can evolve inside @stripe-for-web3/core.
// The SDK remains the source of truth.
// ////////////////////////////////////////////////////////////

function readCustomerField(
    customer: unknown,
    field: string,
): unknown {

    if (
        !customer ||
        typeof customer !==
            "object"
    ) {
        return undefined;
    }

    return (
        customer as Record<
            string,
            unknown
        >
    )[field];
}

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useCustomerSmartAccountPage() {

    const customer =
        useCustomer();

    const wallet =
        useConnectedWallet();

    const chainId =
        useChainId();

    ////////////////////////////////////////////////////////////
    // CUSTOMER DATA
    ////////////////////////////////////////////////////////////

    const smartAccount =
        useMemo<SmartAccountViewModel>(
            () => {

                const customerRecord =
                    customer.customer;

                const customerSmartAccount =
                    readCustomerField(
                        customerRecord,
                        "smartAccount",
                    );

                const customerOwnerWallet =
                    readCustomerField(
                        customerRecord,
                        "ownerWallet",
                    );

                const address =
                    typeof customerSmartAccount ===
                    "string"
                        ? customerSmartAccount
                        : undefined;

                const ownerWallet =
                    typeof customerOwnerWallet ===
                    "string"
                        ? customerOwnerWallet
                        : wallet.address;

                const networkId =
                    chainId;

                const network =
                    getNetworkName(
                        networkId,
                    );

                let status:
                    | SmartAccountStatus
                    | "NOT_CREATED";

                if (!address) {

                    status =
                        "NOT_CREATED";

                } else {

                    status =
                        "ACTIVE";
                }

                const explorerUrl =
                    address &&
                    networkId ===
                        421614
                        ? `https://sepolia.arbiscan.io/address/${address}`
                        : undefined;

                return {
                    address,

                    ownerWallet,

                    status,

                    network,

                    networkId,

                    createdAt:
                        address
                            ? smartAccountDemo.createdAt
                            : undefined,

                    activePermissions:
                        address &&
                        appConfig.demoMode
                            ? smartAccountDemo.activePermissions
                            : undefined,

                    billingAuthorization:
                        address &&
                        appConfig.demoMode
                            ? smartAccountDemo.billingAuthorization
                            : "UNKNOWN",

                    supportedAssets:
                        address &&
                        appConfig.demoMode
                            ? smartAccountDemo.supportedAssets
                            : [],

                    explorerUrl,
                };

            },
            [
                customer.customer,

                wallet.address,

                chainId,
            ],
        );

    ////////////////////////////////////////////////////////////
    // RETURN PAGE VIEW MODEL
    ////////////////////////////////////////////////////////////

    return {
        customer: {
            data:
                customer.customer,

            status:
                customer.status,

            loading:
                customer.loading,

            error:
                customer.error,
        },

        wallet: {
            address:
                wallet.address,

            authenticated:
                wallet.authenticated,
        },

        smartAccount,

        activity:
            appConfig.demoMode
                ? smartAccountDemo.activity
                : [],

        mode:
            appConfig.demoMode
                ? "demo"
                : "live",
    };
}