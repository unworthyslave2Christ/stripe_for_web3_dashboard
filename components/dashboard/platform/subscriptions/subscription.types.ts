// src/components/dashboard/subscriptions/subscription.types.ts

export type SubscriptionStatus =
    | "ACTIVE"
    | "PAUSED"
    | "CANCELLED"
    | "PENDING";

export type SubscriptionInterval =
    | "DAY"
    | "WEEK"
    | "MONTH"
    | "YEAR";

export interface SubscriptionRecord {
    id: string;

    subscriptionId: number;

    customerId: string;

    customerName: string;

    customerWallet?: string;

    smartAccount: string;

    planId: number;

    planName: string;

    amount: string;

    currency: string;

    interval: SubscriptionInterval;

    status: SubscriptionStatus;

    nextBilling: string;

    createdAt: string;

    totalBilled: string;

    successfulPayments?: number;

    failedPayments?: number;

    permissionId?: string | null;
}