"use client";

import { useEffect, useState } from "react";

export type MerchantCustomerDetailStatus =
    | "waiting"
    | "unavailable"
    | "error";

export interface MerchantCustomerDetailPageState {
    customerId: string;

    status: MerchantCustomerDetailStatus;

    customer: null;

    error: Error | null;

    refresh: () => Promise<void>;
}

/**
 * Merchant customer-detail boundary.
 *
 * Current SDK capability:
 *   - customer-facing getByWallet() exists
 *
 * Current missing capability:
 *   - merchant-side getCustomerById(customerId)
 *
 * Therefore this hook intentionally does not fabricate a
 * customer record or invoke a non-existent SDK method.
 *
 * Once merchant-side customer lookup is exposed, this is the
 * only layer that needs to change:
 *
 *   const customer =
 *       await merchantClient.getCustomerById(customerId);
 *
 * The page/component architecture can remain unchanged.
 */
export function useMerchantCustomerDetailPage(
    customerId: string,
): MerchantCustomerDetailPageState {
    const [status, setStatus] =
        useState<
            MerchantCustomerDetailStatus
        >("waiting");

    const [error, setError] =
        useState<Error | null>(null);

    async function refresh() {
        setError(null);

        /*
         * There is currently no supported merchant SDK operation
         * for customerId-based retrieval.
         */
        setStatus("unavailable");
    }

    useEffect(() => {
        void refresh();
    }, [customerId]);

    return {
        customerId,
        status,
        customer: null,
        error,
        refresh,
    };
}