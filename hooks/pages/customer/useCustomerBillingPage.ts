"use client";

import {
    useMemo,
} from "react";

import {
    useCustomer,
} from "@/hooks/customer/useCustomer";

import {
    useSubscriptions,
} from "@/hooks/customer/useSubscriptions";

import {
    useCustomerBillingHistory,
} from "@/hooks/billing/useCustomerBillingHistory";

import {
    appConfig,
} from "@/app/config";

export function useCustomerBillingPage() {

    ////////////////////////////////////////////////////////////
    // REAL CUSTOMER
    ////////////////////////////////////////////////////////////

    const customer =
        useCustomer();

    ////////////////////////////////////////////////////////////
    // REAL SUBSCRIPTIONS
    ////////////////////////////////////////////////////////////

    const subscriptions =
        useSubscriptions();

    ////////////////////////////////////////////////////////////
    // BILLING HISTORY
    ////////////////////////////////////////////////////////////

    const history =
        useCustomerBillingHistory({
            smartAccount:
                customer.customer
                    ?.smartAccount,
        });

    ////////////////////////////////////////////////////////////
    // REAL UPCOMING BILLING
    ////////////////////////////////////////////////////////////

    const upcoming =
        useMemo(() => {

            const candidates =
                subscriptions.subscriptions
                    .filter(
                        (
                            subscription:
                                any,
                        ) =>
                            subscription.status ===
                                "ACTIVE" &&
                            Boolean(
                                subscription.nextBilling ??
                                subscription.nextBillingTime,
                            ),
                    )
                    .map(
                        (
                            subscription:
                                any,
                        ) => ({
                            subscriptionId:
                                Number(
                                    subscription.subscriptionId ??
                                    subscription.id,
                                ),

                            planId:
                                Number(
                                    subscription.planId,
                                ),

                            planName:
                                String(
                                    subscription.planName ??
                                    `Plan ${subscription.planId}`,
                                ),

                            amount:
                                String(
                                    subscription.amount ??
                                    "0",
                                ),

                            currency:
                                String(
                                    subscription.currency ??
                                    "USDC",
                                ),

                            date:
                                String(
                                    subscription.nextBilling ??
                                    subscription.nextBillingTime,
                                ),

                            billingPermissionActive:
                                Boolean(
                                    subscription.billingPermissionActive ??
                                    true,
                                ),
                        }),
                    );

            candidates.sort(
                (
                    a,
                    b,
                ) =>
                    a.date.localeCompare(
                        b.date,
                    ),
            );

            return (
                candidates[0] ??
                null
            );

        }, [
            subscriptions.subscriptions,
        ]);

    ////////////////////////////////////////////////////////////
    // BILLING SUMMARY
    //
    // These values represent demo billing-history data until
    // a real billing API resource exists.
    ////////////////////////////////////////////////////////////

    const summary =
        useMemo(() => {

            const records =
                history.records;

            const totalBilled =
                records.reduce(
                    (
                        total,
                        record,
                    ) =>
                        total +
                        Number(
                            record.amount,
                        ),
                    0,
                );

            const successfulCharges =
                records.filter(
                    (
                        record,
                    ) =>
                        record.status ===
                        "SUCCEEDED",
                ).length;

            const refunds =
                records.reduce(
                    (
                        total,
                        record,
                    ) =>
                        total +
                        Number(
                            record.refundAmount ??
                            "0",
                        ),
                    0,
                );

            return {
                totalBilled,

                successfulCharges,

                refunds,

                demo:
                    appConfig.demoMode,
            };

        }, [
            history.records,
        ]);

    return {
        mode:
            appConfig.demoMode
                ? "demo"
                : "live",

        customer,

        subscriptions,

        upcoming,

        history,

        summary,

        loading:
            customer.loading ||
            subscriptions.loading,

        refreshing:
            customer.refreshing ||
            subscriptions.refreshing,

        error:
            customer.error ??
            subscriptions.error ??
            history.error ??
            null,
    };
}