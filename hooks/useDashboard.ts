// hooks/useDashboard.ts

"use client";

import {

    useCallback,

    useEffect,

    useState,

} from "react";

import {

    useAccount,

    usePublicClient,

} from "wagmi";

import type { Address } from "viem";

import {

    merchantExists,

    getMerchantBySmartAccount,

    getDashboard,

} from "@/services/dashboard";

import type {

    DashboardData,

} from "@/types/dashboard";

/* -------------------------------------------------------------------------- */
/* Contract                                                                    */
/* -------------------------------------------------------------------------- */

const CONTRACT_ADDRESS =
    process.env
        .NEXT_PUBLIC_BILLING_CONTRACT_ADDRESS! as Address;

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

export function useDashboard() {

    const publicClient =
        usePublicClient();

    const {

        address,

        isConnected,

    } = useAccount();

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState<string>();

    const [registered, setRegistered] =
        useState(false);

    const [dashboard, setDashboard] =
        useState<DashboardData | null>(null);

    /* ---------------------------------------------------------------------- */
    /* Refresh                                                                 */
    /* ---------------------------------------------------------------------- */

    const refresh = useCallback(async () => {

        if (!publicClient || !address)
            return;

        try {

            setRefreshing(true);

            setError(undefined);

            /*
            ------------------------------------------------------------------
            Check merchant registration
            ------------------------------------------------------------------
            */

            const exists =
                await merchantExists(

                    {

                        publicClient,

                        contractAddress:
                            CONTRACT_ADDRESS,

                    },

                    address,

                );

            setRegistered(exists);

            if (!exists) {

                setDashboard(null);

                return;

            }

            /*
            ------------------------------------------------------------------
            Merchant lookup
            ------------------------------------------------------------------
            */

            const merchant =

                await getMerchantBySmartAccount(

                    address,

                );

            /*
            ------------------------------------------------------------------
            Dashboard aggregation
            ------------------------------------------------------------------
            */

            const data =

                await getDashboard(

                    {

                        publicClient,

                        contractAddress:
                            CONTRACT_ADDRESS,

                    },

                    merchant.merchantId,

                );

            setDashboard(data);

        }

        catch (err) {

            console.error(err);

            setError(

                err instanceof Error

                    ? err.message

                    : "Unable to load dashboard.",

            );

        }

        finally {

            setRefreshing(false);

            setLoading(false);

        }

    }, [

        address,

        publicClient,

    ]);

    /* ---------------------------------------------------------------------- */
    /* Initial Load                                                            */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {

        if (!isConnected) {

            setLoading(false);

            setDashboard(null);

            return;

        }

        refresh();

    }, [

        isConnected,

        refresh,

    ]);

    /* ---------------------------------------------------------------------- */
    /* API                                                                     */
    /* ---------------------------------------------------------------------- */

    return {

        loading,

        refreshing,

        error,

        refresh,

        registered,

        dashboard,

        merchant:
            dashboard?.merchant,

        stats:
            dashboard?.stats,

        plans:
            dashboard?.plans ?? [],

        customers:
            dashboard?.customers ?? [],

        subscriptions:
            dashboard?.subscriptions ?? [],

        billingAttempts:
            dashboard?.billingAttempts ?? [],

        worker:
            dashboard?.worker,

    };

}