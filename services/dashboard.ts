// services/dashboard.ts

// -----------------------------------------------------------------------------
// Dashboard Service
// -----------------------------------------------------------------------------
//
// Responsible for:
//
// • Merchant existence lookup (on-chain)
// • Merchant retrieval
// • Dashboard aggregation
// • Supabase access
//
// No React.
// No Hooks.
// No UI.
//
// -----------------------------------------------------------------------------

import { createClient } from "@supabase/supabase-js";

import {
    getContract,
    type Address,
    type PublicClient,
} from "viem";

import protocolAbi from "@/abi/Web3BillingProtocol.json";

import type {
    DashboardData,
    Merchant,
    DashboardStats,
    BillingPlan,
    Customer,
    Subscription,
    BillingAttempt,
    Worker,
} from "@/types/dashboard";

/* -------------------------------------------------------------------------- */
/* Supabase                                                                    */
/* -------------------------------------------------------------------------- */

const supabase = createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,

    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

);

/* -------------------------------------------------------------------------- */
/* Contract Context                                                            */
/* -------------------------------------------------------------------------- */

export interface DashboardContext {

    publicClient: PublicClient;

    contractAddress: Address;

}

/* -------------------------------------------------------------------------- */
/* Merchant Exists (On-chain)                                                  */
/* -------------------------------------------------------------------------- */

export async function merchantExists(

    context: DashboardContext,

    smartAccount: Address,

): Promise<boolean> {

    const protocol = getContract({

        address: context.contractAddress,

        abi: protocolAbi,

        client: {

            public: context.publicClient,

        },

    });

    const exists = await protocol.read.merchantExists([

        smartAccount,

    ]);

    return Boolean(exists);

}

/* -------------------------------------------------------------------------- */
/* Merchant By Smart Account                                                   */
/* -------------------------------------------------------------------------- */

export async function getMerchantBySmartAccount(

    smartAccount: Address,

): Promise<Merchant> {

    const {

        data,

        error,

    } = await supabase

        .from("merchants")

        .select("*")

        .eq(
            "smart_account",
            smartAccount,
        )

        .single();

    if (error) {

        throw new Error(error.message);

    }

    return {

        merchantId:
            Number(data.merchant_id),

        smartAccount:
            data.smart_account as Address,

        payoutWallet:
            data.payout_wallet as Address,

        name:
            data.name,

        metadataURI:
            data.metadata_uri ?? "",

        status:
            data.status,

        createdAt:
            data.created_at,

        updatedAt:
            data.updated_at,

    };

}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                   */
/* -------------------------------------------------------------------------- */

export async function getDashboard(

    context: DashboardContext,

    merchantId: number,

): Promise<DashboardData> {

    /*
    ==========================================================================
    PART 2 BEGINS HERE
    ==========================================================================
    */
    /*
    ==========================================================================
    Merchant
    ==========================================================================
    */

    const {

        data: merchantRow,

        error: merchantError,

    } = await supabase

        .from("merchants")

        .select("*")

        .eq(
            "merchant_id",
            merchantId,
        )

        .single();

    if (merchantError) {

        throw new Error(merchantError.message);

    }

    const merchant: Merchant = {

        merchantId:
            Number(merchantRow.merchant_id),

        smartAccount:
            merchantRow.smart_account as Address,

        payoutWallet:
            merchantRow.payout_wallet as Address,

        name:
            merchantRow.name,

        metadataURI:
            merchantRow.metadata_uri ?? "",

        status:
            merchantRow.status,

        createdAt:
            merchantRow.created_at,

        updatedAt:
            merchantRow.updated_at,

    };

    /*
    ==========================================================================
    Billing Plans
    ==========================================================================
    */

    const {

        data: planRows,

        error: plansError,

    } = await supabase

        .from("billing_plans")

        .select("*")

        .eq(
            "merchant_id",
            merchantId,
        )

        .order(
            "created_at",
            {
                ascending: false,
            },
        );

    if (plansError) {

        throw new Error(plansError.message);

    }

    /*
    ==========================================================================
    Customers
    ==========================================================================
    */

    const {

        data: customerRows,

        error: customersError,

    } = await supabase

        .from("customers")

        .select("*")

        .order(
            "created_at",
            {
                ascending: false,
            },
        );

    if (customersError) {

        throw new Error(customersError.message);

    }

    /*
    ==========================================================================
    Subscriptions
    ==========================================================================
    */

    const {

        data: subscriptionRows,

        error: subscriptionsError,

    } = await supabase

        .from("subscriptions")

        .select("*")

        .eq(
            "merchant_id",
            merchantId,
        )

        .order(
            "created_at",
            {
                ascending: false,
            },
        );

    if (subscriptionsError) {

        throw new Error(subscriptionsError.message);

    }

    /*
    ==========================================================================
    Build Customer Lookup
    ==========================================================================
    */

    const customerLookup = new Map(

        (customerRows ?? []).map(

            (customer: any) => [

                customer.customer_id,

                customer,

            ],

        ),

    );

    /*
    ==========================================================================
    Build Subscription Count Per Plan
    ==========================================================================
    */

    const subscriptionCounts = new Map<number, number>();

    for (const subscription of subscriptionRows ?? []) {

        const planId = Number(
            subscription.plan_id,
        );

        subscriptionCounts.set(

            planId,

            (subscriptionCounts.get(planId) ?? 0) + 1,

        );

    }

    /*
    ==========================================================================
    Billing Plans
    ==========================================================================
    */

    const plans: BillingPlan[] =

        (planRows ?? []).map((plan: any) => ({

            planId:
                Number(plan.plan_id),

            name:
                plan.name,

            paymentToken:
                plan.payment_token as Address,

            amount:
                plan.amount.toString(),

            billingIntervalSeconds:
                Number(
                    plan.billing_interval_seconds,
                ),

            subscriberCount:
                subscriptionCounts.get(
                    Number(plan.plan_id),
                ) ?? 0,

            status:
                plan.status,

            createdAt:
                plan.created_at,

            updatedAt:
                plan.updated_at,

        }));

    /*
    ==========================================================================
    Customers
    ==========================================================================
    */

    const customers: Customer[] =

        (customerRows ?? []).map((customer: any) => ({

            customerId:
                customer.customer_id,

            displayName:
                customer.display_name,

            email:
                customer.email,

            walletAddress:
                customer.wallet_address as Address,

            smartAccount:
                customer.smart_account as Address | null,

            status:
                customer.status,

            createdAt:
                customer.created_at,

            updatedAt:
                customer.updated_at,

        }));

    /*
    ==========================================================================
    Subscriptions
    ==========================================================================
    */

    const subscriptions: Subscription[] =

        (subscriptionRows ?? []).map((subscription: any) => {

            const customer =
                customerLookup.get(
                    subscription.customer_id,
                );

            return {

                subscriptionId:
                    Number(subscription.subscription_id),

                merchantId:
                    Number(subscription.merchant_id),

                planId:
                    Number(subscription.plan_id),

                customerId:
                    subscription.customer_id,

                customerName:
                    customer?.display_name ??
                    customer?.email ??
                    "Unknown Customer",

                smartAccount:
                    subscription.smart_account as Address,

                status:
                    subscription.status,

                nextBillingTime:
                    subscription.next_billing_time,

                lastChargedAt:
                    subscription.last_charged_at,

                cancelledAt:
                    subscription.cancelled_at,

                createdAt:
                    subscription.created_at,

            };

        });

    /*
    ==========================================================================
    PART 3 BEGINS HERE
    ==========================================================================
    */
       /*
    ==========================================================================
    Billing Attempts
    ==========================================================================
    */

    const {

        data: attemptRows,

        error: attemptsError,

    } = await supabase

        .from("billing_attempts")

        .select("*")

        .eq(
            "merchant_id",
            merchantId,
        )

        .order(
            "attempted_at",
            {
                ascending: false,
            },
        )

        .limit(20);

    if (attemptsError) {

        throw new Error(attemptsError.message);

    }

    const billingAttempts: BillingAttempt[] =

        (attemptRows ?? []).map((attempt: any) => ({

            billingAttemptId:
                Number(attempt.billing_attempt_id),

            merchantId:
                Number(attempt.merchant_id),

            subscriptionId:
                Number(attempt.subscription_id),

            planId:
                Number(attempt.plan_id),

            customerId:
                attempt.customer_id,

            amount:
                attempt.amount.toString(),

            protocolFee:
                attempt.protocol_fee.toString(),

            billingResult:
                attempt.billing_result,

            transactionHash:
                attempt.transaction_hash,

            userOperationHash:
                attempt.user_operation_hash,

            errorMessage:
                attempt.error_message,

            attemptedAt:
                attempt.attempted_at,

        }));

    /*
    ==========================================================================
    Billing Worker
    ==========================================================================
    */

    const {

        data: workerRow,

        error: workerError,

    } = await supabase

        .from("billing_workers")

        .select("*")

        .eq(
            "worker_name",
            "billing-worker",
        )

        .single();

    if (workerError) {

        throw new Error(workerError.message);

    }

    const worker: Worker = {

        workerId:
            workerRow.worker_id,

        workerName:
            workerRow.worker_name,

        version:
            workerRow.version,

        status:
            workerRow.status,

        currentBatchSize:
            Number(workerRow.current_batch_size),

        successfulBillings:
            Number(workerRow.successful_billings),

        failedBillings:
            Number(workerRow.failed_billings),

        skippedBillings:
            Number(workerRow.skipped_billings),

        lastHeartbeat:
            workerRow.last_heartbeat,

        lastStartedAt:
            workerRow.last_started_at,

        lastStoppedAt:
            workerRow.last_stopped_at,

        lastError:
            workerRow.last_error,

        createdAt:
            workerRow.created_at,

        updatedAt:
            workerRow.updated_at,

        /*
        ----------------------------------------------------------------------
        Derived Metrics
        ----------------------------------------------------------------------
        */

        planCount:
            plans.length,

        customerCount:
            customers.length,

        subscriptionCount:
            subscriptions.length,

    };

    /*
    ==========================================================================
    Dashboard Statistics
    ==========================================================================
    */

    const monthlyRevenue =

        billingAttempts

            .filter((attempt) => {

                const attempted =

                    new Date(
                        attempt.attemptedAt,
                    );

                const now = new Date();

                return (

                    attempt.billingResult ===
                        "SUCCESS"

                    &&

                    attempted.getMonth() ===
                        now.getMonth()

                    &&

                    attempted.getFullYear() ===
                        now.getFullYear()

                );

            })

            .reduce(

                (sum, attempt) =>

                    sum +

                    Number(
                        attempt.amount,
                    ),

                0,

            );

    const totalRevenue =

        billingAttempts

            .filter(

                attempt =>

                    attempt.billingResult ===
                    "SUCCESS",

            )

            .reduce(

                (sum, attempt) =>

                    sum +

                    Number(
                        attempt.amount,
                    ),

                0,

            );

    const stats: DashboardStats = {

        totalPlans:

            plans.length,

        activePlans:

            plans.filter(

                plan =>

                    plan.status ===
                    "ACTIVE",

            ).length,

        totalCustomers:

            customers.length,

        totalSubscriptions:

            subscriptions.length,

        activeSubscriptions:

            subscriptions.filter(

                subscription =>

                    subscription.status ===
                    "ACTIVE",

            ).length,

        monthlyRevenue,

        totalRevenue,

        successfulBillings:

            billingAttempts.filter(

                attempt =>

                    attempt.billingResult ===
                    "SUCCESS",

            ).length,

        failedBillings:

            billingAttempts.filter(

                attempt =>

                    attempt.billingResult ===
                    "FAILED",

            ).length,

    };

    /*
    ==========================================================================
    Return Dashboard
    ==========================================================================
    */

    return {

        merchant,

        stats,

        plans,

        customers,

        subscriptions,

        billingAttempts,

        worker,

    };

}