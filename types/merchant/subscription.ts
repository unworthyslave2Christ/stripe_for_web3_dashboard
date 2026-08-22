import type { Address } from "viem";

////////////////////////////////////////////////////////////
// STATUS
////////////////////////////////////////////////////////////

export type MerchantSubscriptionStatus =
    | "ACTIVE"
    | "PAUSED"
    | "CANCELLED"
    | "PENDING";

////////////////////////////////////////////////////////////
// BILLING INTERVAL
////////////////////////////////////////////////////////////

export type MerchantSubscriptionInterval =
    | "DAY"
    | "WEEK"
    | "MONTH"
    | "YEAR";

////////////////////////////////////////////////////////////
// SUBSCRIPTION RECORD
////////////////////////////////////////////////////////////

export interface MerchantSubscriptionRecord {
    id: string;

    subscriptionId: number;

    customerId: string;

    customerName: string;

    customerWallet?:
        | Address
        | undefined;

    smartAccount: Address;

    planId: number;

    planName: string;

    amount: string;

    currency: string;

    interval: MerchantSubscriptionInterval;

    status: MerchantSubscriptionStatus;

    nextBilling:
        | string
        | null;

    createdAt: Date;

    totalBilled: string;

    successfulPayments?:
        | number
        | undefined;

    failedPayments?:
        | number
        | undefined;

    permissionId?:
        | string
        | null;
}