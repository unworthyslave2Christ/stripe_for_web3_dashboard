// app/api/dashboard/route.ts

import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import type { Merchant, BillingPlan, Customer, Subscription, Worker, BillingAttempt, DashboardStats, DashboardData } from "@/types/dashboard";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(request: NextRequest) {
    
    try {
        
        const merchantId =
            Number(
                request.nextUrl.searchParams.get(
                    "merchantId",
                ),
            );
            
        if (!merchantId) {

            return NextResponse.json(
                
                {
                    error: "merchantId is required.",
                },
                
                {
                    status: 400,
                },

            );

        }

        /*
        ----------------------------------------------------------------------
        Merchant
        ----------------------------------------------------------------------
        */

        const {
            data: merchant,
            error: merchantError,
        } = await supabase
        .from("merchants")
            .select("*")
            .eq("merchant_id", merchantId)
            .single();
            
            if (merchantError)
                throw merchantError;
            
            
            const merchantData: Merchant = {
                
            merchantId:
                Number(merchant.merchant_id),

                smartAccount:
                merchant.smart_account,

                payoutWallet:
                merchant.payout_wallet,

                name:
                merchant.name,
                
                metadataURI:
                merchant.metadata_uri ?? "",

                status:
                merchant.status,
                
                createdAt:
                merchant.created_at,

            updatedAt:
                merchant.updated_at,

        };

        /*
        ----------------------------------------------------------------------
        Plans
        ----------------------------------------------------------------------
        */

       const {
            data: plans,
            error: plansError,
        } = await supabase
            .from("billing_plans")
            .select("*")
            .eq("merchant_id", merchantId)
            .order(
                "created_at",
                {
                    ascending: false,
                },
            );
            
            if (plansError)
                throw plansError;

            const plansData: BillingPlan[] =
            (plans ?? []).map(plan => ({

                planId:
                Number(plan.plan_id),

                merchantId:
                    Number(plan.merchant_id),

                name:
                    plan.name,

                paymentToken:
                    plan.payment_token,

                amount:
                    plan.amount.toString(),

                billingIntervalSeconds:
                    Number(plan.billing_interval_seconds),

                subscriberCount:
                0, // populated later
                
                status:
                    plan.status,

                createdAt:
                    plan.created_at,
                    
                updatedAt:
                    plan.updated_at,

            }));

            /*
        ----------------------------------------------------------------------
        Customers
        ----------------------------------------------------------------------
        */

       const {
           data: customers,
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

            if (customersError)
            throw customersError;

        const customerLookup = new Map(
            
            (customers ?? []).map(customer => [
                
                customer.customer_id,
                
                customer,
                
            ])
            
        );
        
        /*
        ----------------------------------------------------------------------
        Subscriptions
        ----------------------------------------------------------------------
        */
       
        const {
            data: subscriptions,
            error: subscriptionsError,
        } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("merchant_id", merchantId)
            .order(
                "created_at",
                {
                    ascending: false,
                },
            );

        if (subscriptionsError)
            throw subscriptionsError;

        
        const subscriptionCounts = new Map<number, number>();

        for (const subscription of subscriptions) {

            const planId =
                Number(subscription.plan_id);

            subscriptionCounts.set(

                planId,

                (subscriptionCounts.get(planId) ?? 0) + 1,
                
            );

        }
        
        plansData.forEach(plan => {

            plan.subscriberCount =
            
                subscriptionCounts.get(plan.planId) ?? 0;
                
        });
        
        
        const customerData: Customer[] =
            (customers ?? []).map(customer => ({

                customerId:
                customer.customer_id,
                
                displayName:
                    customer.display_name,
                    
                    email:
                    customer.email,
                    
                    walletAddress:
                    customer.wallet_address,
                    
                smartAccount:
                    customer.smart_account,
                    
                    status:
                    customer.status,

                    createdAt:
                    customer.created_at,

                    updatedAt:
                    customer.updated_at,

            }));

            const subscriptionData: Subscription[] =
            
            (subscriptions ?? []).map(subscription => {

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
                        subscription.smart_account,

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
            ----------------------------------------------------------------------
        Billing Attempts
        ----------------------------------------------------------------------
        */
       
       const {
           data: billingAttempts,
            error: billingError,
        } = await supabase
            .from("billing_attempts")
            .select("*")
            .eq("merchant_id", merchantId)
            .order(
                "attempted_at",
                {
                    ascending: false,
                },
            )
            .limit(20);

        if (billingError)
            throw billingError;
        

        const billingAttemptData: BillingAttempt[] = (billingAttempts ?? []).map(attempt => ({

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

        console.log("call received")

        /*
        ----------------------------------------------------------------------
        Worker
        ----------------------------------------------------------------------
        */
       
       const {
           data: worker,
            error: workerError,
        } = await supabase
            .from("billing_workers")
            .select("*")
            .eq(
                "worker_name",
                "billing-worker",
            )
            .single();
            
            if (workerError)
                throw workerError;
            
        const workerData: Worker = {
            
            workerId:
                worker.worker_id,

            workerName:
                worker.worker_name,
                
            version:
                worker.version,
                
                status:
                worker.status,
                
            currentBatchSize:
                Number(worker.current_batch_size),

            successfulBillings:
            Number(worker.successful_billings),

            failedBillings:
                Number(worker.failed_billings),
                
                skippedBillings:
                Number(worker.skipped_billings),

            lastHeartbeat:
                worker.last_heartbeat,

            lastStartedAt:
                worker.last_started_at,

            lastStoppedAt:
                worker.last_stopped_at,

            lastError:
                worker.last_error,

            createdAt:
                worker.created_at,

            updatedAt:
                worker.updated_at,
                
                planCount:
                plansData.length,
                
            customerCount:
                customerData.length,

            subscriptionCount:
            subscriptionData.length,

        };

        
        /*
        ----------------------------------------------------------------------
        Statistics
        ----------------------------------------------------------------------
        */
       
       const activePlans =
            plansData.filter(
                plan =>
                    plan.status === "ACTIVE",
            ).length;

        const activeSubscriptions =
            subscriptionData.filter(
                subscription  =>
                    subscription.status === "ACTIVE",
            ).length;
            
            const successfulBillings =
            billingAttemptData.filter(
                attempt =>
                    attempt.billingResult ===
                "SUCCESS",
            ).length;
            
        const failedBillings =
            billingAttemptData.filter(
                attempt =>
                    attempt.billingResult ===
                    "FAILED",
            ).length;
            
        const totalRevenue =
            billingAttemptData
            .filter(
                    attempt =>
                        attempt.billingResult ===
                        "SUCCESS",
                    )
                .reduce(
                    (
                        sum: number,
                        attempt: any,
                    ) =>
                        sum +
                        Number(
                            attempt.amount,
                        ),
                        0,
                    );

                    const now = new Date();

                    const monthlyRevenue =
                    billingAttemptData
                    .filter((attempt: any) => {
                        
                    if (
                        attempt.billingResult !==
                        "SUCCESS"
                    )
                        return false;
                        
                        const date =
                        new Date(
                            attempt.attemptedAt,
                        );

                        return (
                            date.getMonth() ===
                            now.getMonth() &&
                        date.getFullYear() ===
                            now.getFullYear()
                    );

                })
                .reduce(
                    (
                        sum: number,
                        attempt: any,
                    ) =>
                        sum +
                        Number(
                            attempt.amount,
                        ),
                        0,
                );

                

                const stats: DashboardStats = {
                    
                    totalPlans:
                    plansData.length,

            activePlans,

            totalCustomers:
            customerData.length,

            totalSubscriptions:
                subscriptionData.length,

                activeSubscriptions,
                
                monthlyRevenue,

            totalRevenue,

            successfulBillings,

            failedBillings,
            
        };

        /*
        ----------------------------------------------------------------------
        Return
        ----------------------------------------------------------------------
        */

        const dashboard: DashboardData = {

            merchant:
                merchantData,

            stats,

            plans:
                plansData,

            customers:
                customerData,

            subscriptions:
                subscriptionData,

            billingAttempts:
                billingAttemptData,

            worker:
                workerData,

        };

        
        return NextResponse.json(dashboard);


    }

    catch (error) {

        return NextResponse.json(

            {

                error:
                    error instanceof Error
                        ? error.message
                        : "Unable to load dashboard.",

            },

            {

                status: 500,

            },

        );

    }

}