// components/dashboard/platform/billing/billing.types.ts

export type BillingStatus =
    | "SUCCEEDED"
    | "PENDING"
    | "FAILED"
    | "REFUNDED";

export type BillingInterval =
    | "DAY"
    | "WEEK"
    | "MONTH"
    | "YEAR";

export interface BillingRecord {
    id: string;

    billingId: string;

    customerId: string;

    customerName: string;

    subscriptionId: number;

    planName: string;

    amount: string;

    currency: string;

    status: BillingStatus;

    interval: BillingInterval;

    processedAt: string;

    smartAccount: string;

    transactionHash: string | null;
}

export interface BillingOverviewData {
    grossVolume: string;
    successfulVolume: string;
    failedVolume: string;
    refunds: string;

    successfulRate: string;
    pendingRate: string;
    failedRate: string;
}

export interface BillingReconciliationData {
    settled: number;
    pending: number;
    exceptions: number;

    lastReconciledAt: string;
}