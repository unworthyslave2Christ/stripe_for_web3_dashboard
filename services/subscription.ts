"use client";

import type { Address } from "viem";
import type { Subscription } from "@/types/dashboard";

export interface MirrorSubscriptionParams {
    subscriptionId: number;

    customerId: string;

    merchantId: number;

    planId: number;

    planBillingIntervalSeconds: number;

    smartAccount: Address;

    transactionHash: `0x${string}`;

    permissionId: `0x${string}`
}

export interface SubscriptionRecord extends Subscription {
    transactionHash: `0x${string}`;
}

/* -------------------------------------------------------------------------- */
/* Mirror Subscription                                                         */
/* -------------------------------------------------------------------------- */

// 0xA6B0921999d8D862B87eaCb3DDA1eb8805a096cD MockERC20 
// 0xb5161Ce568ab94eF2AD55BBd823d5d3F3eEBbdCE MockERC20_2

export async function mirrorSubscription(
    payload: MirrorSubscriptionParams,
): Promise<SubscriptionRecord> {

    const response = await fetch(
        "/api/customers/subscriptions",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(payload),
        },
    );

    if (!response.ok) {

        const error = await response.json();

        throw new Error(
            error.error ??
            "Unable to mirror subscription.",
        );

    }

    return await response.json();

}

/* -------------------------------------------------------------------------- */
/* Customer Subscriptions                                                      */
/* -------------------------------------------------------------------------- */

export async function getCustomerSubscriptions(
    customerId: string,
): Promise<SubscriptionRecord[]> {

    const response = await fetch(
        `/api/customers/${customerId}/subscriptions`,
        {
            cache: "no-store",
        },
    );

    if (!response.ok) {

        throw new Error(
            "Unable to fetch subscriptions.",
        );

    }

    return await response.json();

}

/* -------------------------------------------------------------------------- */
/* Subscription                                                                */
/* -------------------------------------------------------------------------- */

export async function getSubscription(
    subscriptionId: number,
): Promise<SubscriptionRecord | null> {

    const response = await fetch(
        `/api/subscriptions/${subscriptionId}`,
        {
            cache: "no-store",
        },
    );

    if (response.status === 404) {

        return null;

    }

    if (!response.ok) {

        throw new Error(
            "Unable to load subscription.",
        );

    }

    return await response.json();

}

/* -------------------------------------------------------------------------- */
/* Pause                                                                       */
/* -------------------------------------------------------------------------- */

export async function pauseSubscriptionRecord(
    subscriptionId: number,
): Promise<void> {

    const response = await fetch(
        `/api/subscriptions/${subscriptionId}/pause`,
        {
            method: "PATCH",
        },
    );

    if (!response.ok) {

        throw new Error(
            "Unable to pause subscription.",
        );

    }

}

/* -------------------------------------------------------------------------- */
/* Resume                                                                      */
/* -------------------------------------------------------------------------- */

export async function resumeSubscriptionRecord(
    subscriptionId: number,
): Promise<void> {

    const response = await fetch(
        `/api/subscriptions/${subscriptionId}/resume`,
        {
            method: "PATCH",
        },
    );

    if (!response.ok) {

        throw new Error(
            "Unable to resume subscription.",
        );

    }

}

/* -------------------------------------------------------------------------- */
/* Cancel                                                                      */
/* -------------------------------------------------------------------------- */

export async function cancelSubscriptionRecord(
    subscriptionId: number,
): Promise<void> {

    const response = await fetch(
        `/api/subscriptions/${subscriptionId}/cancel`,
        {
            method: "PATCH",
        },
    );

    if (!response.ok) {

        throw new Error(
            "Unable to cancel subscription.",
        );

    }

}

/* -------------------------------------------------------------------------- */
/* Billing Update                                                              */
/* -------------------------------------------------------------------------- */

export async function updateBillingInformation(
    subscriptionId: number,
    nextBillingTime: string,
): Promise<void> {

    const response = await fetch(
        `/api/subscriptions/${subscriptionId}/billing`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                nextBillingTime,
            }),
        },
    );

    if (!response.ok) {

        throw new Error(
            "Unable to update billing.",
        );

    }

}