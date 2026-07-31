// types/dashboard.ts

import type { Address } from "viem";

/* -------------------------------------------------------------------------- */
/* Merchant                                                                    */
/* -------------------------------------------------------------------------- */

export interface Merchant {

    merchantId: number;

    smartAccount: Address;

    payoutWallet: Address;

    name: string;

    ownerWallet: Address;

    metadataURI: string;

    status:
        | "ACTIVE"
        | "INACTIVE";

    createdAt: string;

    updatedAt: string;

}

/* -------------------------------------------------------------------------- */
/* Dashboard Statistics                                                        */
/* -------------------------------------------------------------------------- */

export interface DashboardStats {

    totalPlans: number;

    activePlans: number;

    totalCustomers: number;

    totalSubscriptions: number;

    activeSubscriptions: number;

    monthlyRevenue: number;

    totalRevenue: number;

    successfulBillings: number;

    failedBillings: number;

}

/* -------------------------------------------------------------------------- */
/* Billing Plan                                                                */
/* -------------------------------------------------------------------------- */

export interface BillingPlan {

    planId: number;

    name: string;

    paymentToken: Address;

    amount: string;

    billingIntervalSeconds: number;

    subscriberCount: number;      // derived

    status:
        | "ACTIVE"
        | "INACTIVE";

    createdAt: string;

    updatedAt: string;

}

/* -------------------------------------------------------------------------- */
/* Customer                                                                    */
/* -------------------------------------------------------------------------- */

export interface Customer {

    customerId: string;

    displayName: string | null;

    email: string | null;

    walletAddress: Address;

    smartAccount: Address | null;

    status:
        | "ACTIVE"
        | "INACTIVE";

    createdAt: string;

    updatedAt: string;

}

/* -------------------------------------------------------------------------- */
/* Subscription                                                                */
/* -------------------------------------------------------------------------- */

export interface Subscription {

    subscriptionId: number;

    merchantId: number;

    planId: number;

    customerId: string;

    customerName: string;          // derived

    smartAccount: Address;

    status:
        | "ACTIVE"
        | "PAUSED"
        | "CANCELLED";

    nextBillingTime: string;

    lastChargedAt: string | null;

    cancelledAt: string | null;

    createdAt: string;

}

/* -------------------------------------------------------------------------- */
/* Billing Attempt                                                             */
/* -------------------------------------------------------------------------- */

export interface BillingAttempt {

    billingAttemptId: number;

    merchantId: number;

    subscriptionId: number;

    planId: number;

    customerId: string;

    amount: string;

    protocolFee: string;

    billingResult:
        | "SUCCESS"
        | "FAILED";

    transactionHash: string | null;

    userOperationHash: string | null;

    errorMessage: string | null;

    attemptedAt: string;

}

/* -------------------------------------------------------------------------- */
/* Billing Worker                                                              */
/* -------------------------------------------------------------------------- */

export interface Worker {

    workerId: string;

    workerName: string;

    version: string;

    status:
        | "RUNNING"
        | "PAUSED"
        | "OFFLINE";

    /*
     * Direct database fields
     */

    currentBatchSize: number;

    successfulBillings: number;

    failedBillings: number;

    skippedBillings: number;

    lastHeartbeat: string | null;

    lastStartedAt: string | null;

    lastStoppedAt: string | null;

    lastError: string | null;

    createdAt: string;

    updatedAt: string;

    /*
     * Derived dashboard metrics
     */

    planCount: number;

    customerCount: number;

    subscriptionCount: number;

}

/* -------------------------------------------------------------------------- */
/* Complete Dashboard                                                          */
/* -------------------------------------------------------------------------- */

export interface DashboardData {

    merchant: Merchant;

    stats: DashboardStats;

    plans: BillingPlan[];

    customers: Customer[];

    subscriptions: Subscription[];

    billingAttempts: BillingAttempt[];

    worker: Worker;

}