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
    useCustomerNotifications,
} from "@/hooks/notifications/useCustomerNotifications";

import {
    useCustomerNotificationPreferences,
} from "@/hooks/notifications/useCustomerNotificationPreferences";

import {
    buildCustomerNotificationChannels,
} from "@/lib/demo/customerNotificationsDemo";

export function useCustomerNotificationsPage() {

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
    // NOTIFICATIONS
    ////////////////////////////////////////////////////////////

    const notifications =
        useCustomerNotifications();

    ////////////////////////////////////////////////////////////
    // PREFERENCES
    ////////////////////////////////////////////////////////////

    const preferences =
        useCustomerNotificationPreferences();

    ////////////////////////////////////////////////////////////
    // CHANNELS
    ////////////////////////////////////////////////////////////

    const channels =
        useMemo(
            () =>
                buildCustomerNotificationChannels({
                    email:
                        customer.customer
                            ?.email,
                }),
            [
                customer.customer
                    ?.email,
            ],
        );

    ////////////////////////////////////////////////////////////
    // PAGE MODEL
    ////////////////////////////////////////////////////////////

    return {
        mode:
            notifications.mode,

        customer,

        subscriptions,

        notifications,

        preferences,

        channels,

        loading:
            customer.loading ||
            subscriptions.loading ||
            notifications.loading ||
            preferences.loading,

        refreshing:
            customer.refreshing ||
            subscriptions.refreshing ||
            notifications.refreshing,

        error:
            customer.error ??
            subscriptions.error ??
            notifications.error ??
            preferences.error ??
            null,
    };
}