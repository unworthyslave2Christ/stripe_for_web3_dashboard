"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    appConfig,
} from "@/app/config";

import {
    customerNotificationPreferencesDemo,
} from "@/lib/demo/customerNotificationsDemo";

import type {
    CustomerNotificationPreference,
} from "@/types/customer-notification";

export function useCustomerNotificationPreferences() {
    const [
        preferences,
        setPreferences,
    ] = useState<
        CustomerNotificationPreference[]
    >(
        () =>
            appConfig.demoMode
                ? customerNotificationPreferencesDemo
                : [],
    );

    function setEnabled(
        id: string,
        enabled: boolean,
    ) {
        setPreferences(
            (
                current,
            ) =>
                current.map(
                    (
                        preference,
                    ) =>
                        preference.id ===
                        id
                            ? {
                                ...preference,

                                enabled,
                            }
                            : preference,
                ),
        );
    }

    const grouped =
        useMemo(() => {

            return {
                BILLING:
                    preferences.filter(
                        (
                            preference,
                        ) =>
                            preference.category ===
                            "BILLING",
                    ),

                SUBSCRIPTIONS:
                    preferences.filter(
                        (
                            preference,
                        ) =>
                            preference.category ===
                            "SUBSCRIPTIONS",
                    ),

                SMART_ACCOUNT:
                    preferences.filter(
                        (
                            preference,
                        ) =>
                            preference.category ===
                            "SMART_ACCOUNT",
                    ),

                GENERAL:
                    preferences.filter(
                        (
                            preference,
                        ) =>
                            preference.category ===
                            "GENERAL",
                    ),
            };

        }, [
            preferences,
        ]);

    return {
        preferences,

        grouped,

        setEnabled,

        loading:
            false,

        error:
            null,

        mode:
            appConfig.demoMode
                ? "demo"
                : "live",
    };
}