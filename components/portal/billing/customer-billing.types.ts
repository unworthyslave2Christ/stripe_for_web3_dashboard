export type CustomerBillingStatus =
    | "SUCCEEDED"
    | "PENDING"
    | "FAILED"
    | "REFUNDED";

export type CustomerBillingInterval =
    | "DAY"
    | "WEEK"
    | "MONTH"
    | "YEAR";

export interface CustomerBillingRecord {
    id: string;

    billingId: string;

    subscriptionId: number;

    planName: string;

    amount: string;

    currency: string;

    status: CustomerBillingStatus;

    interval: CustomerBillingInterval;

    processedAt: string;

    smartAccount: string;

    transactionHash: string | null;

    refundAmount: string | null;
}