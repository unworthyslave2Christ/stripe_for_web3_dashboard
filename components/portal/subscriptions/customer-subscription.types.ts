export type CustomerSubscriptionStatus =
    | "ACTIVE"
    | "PAUSED"
    | "PENDING"
    | "CANCELLED";

export type CustomerSubscriptionInterval =
    | "DAY"
    | "WEEK"
    | "MONTH"
    | "YEAR";

export interface CustomerSubscriptionRecord {
    id: string;

    subscriptionId: number;

    planId: number;

    planName: string;

    planDescription: string;

    amount: string;

    currency: string;

    interval: CustomerSubscriptionInterval;

    status: CustomerSubscriptionStatus;

    nextBilling: string | null;

    createdAt: string;

    totalBilled: string;

    billingPermissionActive: boolean;
}