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
    appConfig,
} from "@/app/config";

import {
    customerOverviewDemo,
} from "@/lib/demo/customerOverviewDemo";

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useCustomerOverviewPage() {

    ////////////////////////////////////////////////////////////
    // REAL CUSTOMER RESOURCE
    ////////////////////////////////////////////////////////////

    const customer =
        useCustomer();

    ////////////////////////////////////////////////////////////
    // REAL SUBSCRIPTION RESOURCE
    ////////////////////////////////////////////////////////////

    const subscriptions =
        useSubscriptions();

    ////////////////////////////////////////////////////////////
    // DERIVED SUBSCRIPTION SUMMARY
    ////////////////////////////////////////////////////////////

    const subscriptionSummary =
        useMemo(() => {

            const items =
                subscriptions.subscriptions;

            const active =
                items.filter(
                    (item: any) =>
                        item.status ===
                        "ACTIVE",
                );

            const paused =
                items.filter(
                    (item: any) =>
                        item.status ===
                        "PAUSED",
                );

            const cancelled =
                items.filter(
                    (item: any) =>
                        item.status ===
                        "CANCELLED",
                );

            return {
                total:
                    items.length,

                active:
                    active.length,

                paused:
                    paused.length,

                cancelled:
                    cancelled.length,
            };

        }, [
            subscriptions.subscriptions,
        ]);

    ////////////////////////////////////////////////////////////
    // DEMO DATA
    ////////////////////////////////////////////////////////////

    const demo =
        appConfig.demoMode
            ? customerOverviewDemo
            : null;

    ////////////////////////////////////////////////////////////
    // PAGE VIEW MODEL
    ////////////////////////////////////////////////////////////

    return {
        mode:
            appConfig.demoMode
                ? "demo"
                : "live",

        customer: {
            data:
                customer.customer,

            status:
                customer.status,

            loading:
                customer.loading,

            refreshing:
                customer.refreshing,

            error:
                customer.error,

            refresh:
                customer.refresh,
        },

        subscriptions: {
            data:
                subscriptions.subscriptions,

            loading:
                subscriptions.loading,

            refreshing:
                subscriptions.refreshing,

            error:
                subscriptions.error,

            refresh:
                subscriptions.refresh,
        },

        subscriptionSummary,

        demo,
    };
}