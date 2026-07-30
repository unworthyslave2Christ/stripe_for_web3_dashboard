"use client";

import { useState } from "react";
import { usePublicClient, useWalletClient } from "wagmi";

import {
    registerMerchant,
    merchantExists,
    getMerchantIdBySmartAccount,
    getMerchantById
} from "@/services/merchant";

const CONTRACT_ADDRESS =
    process.env
        .NEXT_PUBLIC_BILLING_CONTRACT_ADDRESS! as `0x${string}`;

export function useMerchant() {
    const publicClient = usePublicClient();

    const { data: walletClient } =
        useWalletClient();

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string>();

    const [merchantId, setMerchantId] =
        useState<bigint>();

    async function createMerchant(
        merchantSmartAccount: `0x${string}`,
        payoutWallet: `0x${string}`,
        name: string,
        metadataURI = "",
    ) {
        if (!walletClient)
            throw new Error("Wallet not connected.");

        if (!publicClient)
            throw new Error("Public client unavailable.");

        setError(undefined);

        setLoading(true);

        try {
            /*
             * Already registered?
             */

            const exists =
                await merchantExists({
                    publicClient,
                    contractAddress: CONTRACT_ADDRESS,
                    smartAccount: merchantSmartAccount,
                });

            if (exists) {
                const id =
                    await getMerchantIdBySmartAccount({
                        publicClient,
                        contractAddress: CONTRACT_ADDRESS,
                        smartAccount: merchantSmartAccount,
                    });

                setMerchantId(id);

                const merchant =
                    await getMerchantById(id);

                return {
                    merchantId: id,
                    merchant,
                    alreadyRegistered: true,
                }
            }

            /*
             * Register new merchant.
             */

            const result =
                await registerMerchant({
                    walletClient,
                    publicClient,
                    contractAddress: CONTRACT_ADDRESS,
                    merchantSmartAccount,
                    payoutWallet,
                    name,
                    metadataURI,
                });

            setMerchantId(result.merchantId);

            return {
                ...result,
                alreadyRegistered: false,
            };
        
        } catch (err) {

            setError(

                err instanceof Error
                    ? err.message
                    : "Merchant registration failed.",

            );

            throw err;

            }

            finally {

                setLoading(false);

            }
        }

    return {

        loading,

        error,

        merchantId,

        createMerchant,

    };
}