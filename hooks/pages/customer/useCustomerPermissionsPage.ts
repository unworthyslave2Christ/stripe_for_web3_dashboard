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
    useSmartAccountPermissions,
} from "@/hooks/permissions/useSmartAccountPermissions";

export function useCustomerPermissionsPage() {

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
    // PERMISSIONS RESOURCE
    ////////////////////////////////////////////////////////////

    const permissions =
        useSmartAccountPermissions({
            smartAccount:
                customer.customer
                    ?.smartAccount,
        });

    ////////////////////////////////////////////////////////////
    // BILLING PERMISSION
    ////////////////////////////////////////////////////////////

    const billingPermission =
        useMemo(
            () =>
                permissions.records.find(
                    (
                        permission,
                    ) =>
                        permission.scope.includes(
                            "SUBSCRIPTION_BILLING",
                        ),
                ) ??
                null,
            [
                permissions.records,
            ],
        );

    ////////////////////////////////////////////////////////////
    // PAGE MODEL
    ////////////////////////////////////////////////////////////

    return {
        mode:
            permissions.mode,

        customer,

        subscriptions,

        permissions,

        billingPermission,

        loading:
            customer.loading ||
            subscriptions.loading ||
            permissions.loading,

        refreshing:
            customer.refreshing ||
            subscriptions.refreshing ||
            permissions.refreshing,

        error:
            customer.error ??
            subscriptions.error ??
            permissions.error ??
            null,
    };
}