"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    useMerchant,
} from "@/hooks/merchant/useMerchant";

////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////

export type SettingsActionState = {
    available: boolean;
    loading: boolean;
    error: Error | null;
    run: () => void;
};

export type MerchantSettingsDraft = {
    name: string;
    metadataUri: string;
    billingEnvironment: "test" | "live";
    billingNotifications: boolean;
    operationalNotifications: boolean;
    securityNotifications: boolean;
    sensitiveConfirmation: boolean;
};

////////////////////////////////////////////////////////////
// HOOK
////////////////////////////////////////////////////////////

export function useMerchantSettingsPage() {
    const merchantResource =
        useMerchant();

    const merchant =
        merchantResource.merchant;

    /*
     * The backend merchant resource is canonical.
     *
     * Until merchant-update operations are exposed
     * by the SDK, settings edits remain local draft state.
     */
    const initialDraft =
        useMemo<MerchantSettingsDraft>(
            () => ({
                name:
                    getMerchantString(
                        merchant,
                        "name",
                        "displayName",
                    ),

                metadataUri:
                    getMerchantString(
                        merchant,
                        "metadataUri",
                        "metadata_uri",
                    ),

                billingEnvironment:
                    "test",

                billingNotifications:
                    true,

                operationalNotifications:
                    true,

                securityNotifications:
                    true,

                sensitiveConfirmation:
                    true,
            }),
            [
                merchant,
            ],
        );

    const [
        draft,
        setDraft,
    ] =
        useState<MerchantSettingsDraft>(
            initialDraft,
        );

    const [
        dirty,
        setDirty,
    ] =
        useState(false);

    /*
     * The currently exposed SDK does not yet provide
     * merchant-settings mutation operations.
     *
     * These actions intentionally advertise their
     * future contract without pretending that the
     * backend mutation already exists.
     */

    const updateMerchant: SettingsActionState =
        {
            available: false,
            loading: false,
            error: null,

            run: () => {
                /*
                 * Reserved for the future merchant
                 * update operation.
                 */
            },
        };

    const updateBilling:
        SettingsActionState =
        {
            available: false,
            loading: false,
            error: null,

            run: () => {
                /*
                 * Reserved for the future billing
                 * settings operation.
                 */
            },
        };

    const updateNotifications:
        SettingsActionState =
        {
            available: false,
            loading: false,
            error: null,

            run: () => {
                /*
                 * Reserved for the future notification
                 * settings operation.
                 */
            },
        };

    const updateSecurity:
        SettingsActionState =
        {
            available: false,
            loading: false,
            error: null,

            run: () => {
                /*
                 * Reserved for the future security
                 * settings operation.
                 */
            },
        };

    const disableMerchant:
        SettingsActionState =
        {
            available: false,
            loading: false,
            error: null,

            run: () => {
                /*
                 * Reserved for the future merchant
                 * disable/deactivate operation.
                 */
            },
        };

    function updateDraft(
        patch: Partial<MerchantSettingsDraft>,
    ) {
        setDraft(
            (current) => ({
                ...current,
                ...patch,
            }),
        );

        setDirty(true);
    }

    function resetDraft() {
        setDraft(
            initialDraft,
        );

        setDirty(false);
    }

    /*
     * Preserve the state model used elsewhere in the
     * dashboard:
     *
     * disconnected
     * waiting
     * loading
     * ready
     * not-created
     * error
     */

    if (
        merchantResource.merchantStatus ===
        "disconnected"
    ) {
        return {
            status: "disconnected" as const,

            merchant: null,

            draft,

            dirty,

            loading: false,
            refreshing: false,
            error: null,

            actions: {
                updateMerchant,
                updateBilling,
                updateNotifications,
                updateSecurity,
                disableMerchant,
                refresh: {
                    available: false,
                    loading: false,
                    run: () => {},
                },
            },

            draftActions: {
                update: updateDraft,
                reset: resetDraft,
            },
        };
    }

    if (
        merchantResource.merchantStatus ===
            "waiting" ||
        merchantResource.merchantStatus ===
            "loading"
    ) {
        return {
            status:
                merchantResource.merchantStatus ===
                "loading"
                    ? ("loading" as const)
                    : ("waiting" as const),

            merchant:

                merchant ?? null,

            draft,

            dirty,

            loading:
                merchantResource.loading,

            refreshing:
                merchantResource.refreshing,

            error: null,

            actions: {
                updateMerchant,
                updateBilling,
                updateNotifications,
                updateSecurity,
                disableMerchant,
                refresh: {
                    available:
                        Boolean(
                            merchantResource.refresh,
                        ),

                    loading:
                        merchantResource.loading,

                    run: () => {
                        void merchantResource.refresh();
                    },
                },
            },

            draftActions: {
                update: updateDraft,
                reset: resetDraft,
            },
        };
    }

    if (
        merchantResource.merchantStatus ===
        "error"
    ) {
        return {
            status: "error" as const,

            merchant:
                merchant ?? null,

            draft,

            dirty,

            loading: false,

            refreshing:
                merchantResource.refreshing,

            error:
                merchantResource.error,

            actions: {
                updateMerchant,
                updateBilling,
                updateNotifications,
                updateSecurity,
                disableMerchant,

                refresh: {
                    available: true,
                    loading: false,

                    run: () => {
                        void merchantResource.refresh();
                    },
                },
            },

            draftActions: {
                update: updateDraft,
                reset: resetDraft,
            },
        };
    }

    if (!merchant) {
        return {
            status: "not-created" as const,

            merchant: null,

            draft,

            dirty,

            loading: false,
            refreshing: false,
            error: null,

            actions: {
                updateMerchant,
                updateBilling,
                updateNotifications,
                updateSecurity,
                disableMerchant,

                refresh: {
                    available: true,
                    loading: false,

                    run: () => {
                        void merchantResource.refresh();
                    },
                },
            },

            draftActions: {
                update: updateDraft,
                reset: resetDraft,
            },
        };
    }

    return {
        status: "ready" as const,

        merchant,

        draft,

        dirty,

        loading:
            merchantResource.loading,

        refreshing:
            merchantResource.refreshing,

        error:
            merchantResource.error,

        actions: {
            updateMerchant,
            updateBilling,
            updateNotifications,
            updateSecurity,
            disableMerchant,

            refresh: {
                available: true,
                loading:
                    merchantResource.refreshing,

                run: () => {
                    void merchantResource.refresh();
                },
            },
        },

        draftActions: {
            update: updateDraft,
            reset: resetDraft,
        },
    };
}

////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////

function getMerchantString(
    merchant: unknown,
    ...keys: string[]
) {
    if (
        !merchant ||
        typeof merchant !== "object"
    ) {
        return "";
    }

    const record =
        merchant as Record<
            string,
            unknown
        >;

    for (
        const key of keys
    ) {
        const value =
            record[key];

        if (
            typeof value ===
            "string"
        ) {
            return value;
        }
    }

    return "";
}