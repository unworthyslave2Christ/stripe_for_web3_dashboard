export type CustomerTransactionStatus =
    | "SUCCESS"
    | "PENDING"
    | "FAILED";

export type CustomerTransactionType =
    | "SUBSCRIPTION_BILLING"
    | "REFUND"
    | "PERMISSION_UPDATE"
    | "ACCOUNT_OPERATION"
    | "OTHER";

export interface CustomerTransactionRecord {
    id: string;

    transactionHash: string;

    type: CustomerTransactionType;

    title: string;

    description: string;

    amount: string | null;

    currency: string | null;

    status: CustomerTransactionStatus;

    timestamp: string;

    smartAccount: string;

    blockNumber: number | null;

    explorerUrl: string | null;

    subscriptionId: number | null;

    planName: string | null;
}