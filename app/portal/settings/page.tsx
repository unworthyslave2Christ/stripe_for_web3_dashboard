"use client";

import {
    Container,
} from "@/components/layout/Container";

import {
    Divider,
} from "@/components/layout/Divider";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Page,
} from "@/components/layout/Page";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    CustomerAccountSettings,
} from "@/components/portal/settings/CustomerAccountSettings";

import {
    CustomerNotificationSettings,
} from "@/components/portal/settings/CustomerNotificationSettings";

import {
    CustomerPortalPreferences,
} from "@/components/portal/settings/CustomerPortalPreferences";

import {
    CustomerProfileSettings,
} from "@/components/portal/settings/CustomerProfileSettings";

import {
    CustomerSecuritySettings,
} from "@/components/portal/settings/CustomerSecuritySettings";

import {
    CustomerSettingsHeader,
} from "@/components/portal/settings/CustomerSettingsHeader";

import {
    CustomerSettingsSidebar,
} from "@/components/portal/settings/CustomerSettingsSidebar";

import {
    CustomerWalletSettings,
} from "@/components/portal/settings/CustomerWalletSettings";

import {
    useCustomerSettingsPage,
} from "@/hooks/pages/customer/useCustomerSettingsPage";

export default function CustomerSettingsPage() {

    const page =
        useCustomerSettingsPage();

    ////////////////////////////////////////////////////////////
    // LOADING
    ////////////////////////////////////////////////////////////

    if (
        page.loading &&
        !page.customer.customer
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <div className="space-y-6">

                        <div className="h-20 animate-pulse rounded-xl bg-muted" />

                        <div className="h-[500px] animate-pulse rounded-xl bg-muted" />

                    </div>

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // ERROR
    ////////////////////////////////////////////////////////////

    if (
        page.error &&
        !page.customer.customer
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8">

                        <h1 className="text-lg font-semibold">
                            Unable to load settings
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {page.error.message}
                        </p>

                    </div>

                </Container>

            </Page>
        );
    }

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerSettingsHeader
                        demo={
                            true
                        }
                    />

                    <Divider />

                    {/* SETTINGS */}

                    <Grid className="grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">

                        <CustomerSettingsSidebar />

                        <div className="min-w-0">

                            <Stack gap={6}>

                                {/* PROFILE */}

                                <div id="profile">

                                    <CustomerProfileSettings
                                        initialDisplayName={
                                            page.profile.displayName
                                        }

                                        initialEmail={
                                            page.profile.email
                                        }

                                        onSave={
                                            page.profile.saveProfile
                                        }
                                    />

                                </div>

                                {/* WALLET */}

                                <div id="wallet">

                                    <CustomerWalletSettings
                                        ownerWallet={
                                            page.walletInfo.ownerWallet
                                        }

                                        smartAccount={
                                            page.walletInfo.smartAccount
                                        }

                                        network={
                                            page.walletInfo.network
                                        }
                                    />

                                </div>

                                {/* NOTIFICATIONS */}

                                <div id="notifications">

                                    <CustomerNotificationSettings
                                        emailEnabled={
                                            page.notifications.email
                                        }

                                        inAppEnabled={
                                            page.notifications.inApp
                                        }

                                        securityEnabled={
                                            page.notifications.security
                                        }

                                        onEmailChange={
                                            page.notifications.setEmail
                                        }

                                        onInAppChange={
                                            page.notifications.setInApp
                                        }

                                        onSecurityChange={
                                            page.notifications.setSecurity
                                        }

                                        demo={
                                            true
                                        }
                                    />

                                </div>

                                {/* PREFERENCES */}

                                <div id="preferences">

                                    <CustomerPortalPreferences />

                                </div>

                                {/* SECURITY */}

                                <div id="security">

                                    <CustomerSecuritySettings
                                        ownerWallet={
                                            page.walletInfo.ownerWallet
                                        }

                                        confirmSensitiveActions={
                                            page.security.confirmSensitiveActions
                                        }

                                        onConfirmSensitiveActionsChange={
                                            page.security.setConfirmSensitiveActions
                                        }

                                        demo={
                                            true
                                        }
                                    />

                                </div>

                                {/* ACCOUNT */}

                                <div id="account">

                                    <CustomerAccountSettings
                                        customerExists={
                                            Boolean(
                                                page.customer.customer,
                                            )
                                        }
                                    />

                                </div>

                            </Stack>

                        </div>

                    </Grid>

                    {page.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing customer settings data...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}