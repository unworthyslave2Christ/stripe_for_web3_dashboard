export type PlanStatus =
    | "ACTIVE"
    | "PAUSED"
    | "ARCHIVED";

export type BillingInterval =
    | "DAY"
    | "WEEK"
    | "MONTH"
    | "YEAR";

export interface PlanRecord {
    id: string;

    planId: number;

    name: string;

    description: string;

    amount: string;

    currency: string;

    billingInterval: BillingInterval;

    merchantId: number;

    paymentToken: string;

    status: PlanStatus;

    activeSubscribers: number;

    totalSubscribers: number;

    cancelledSubscriptions?: number;

    monthlyRevenue: string;

    lifetimeRevenue?: string;

    createdAt: string;
}