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

export default function CustomerSettingsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerSettingsHeader />

                    <Divider />

                    {/* SETTINGS */}

                    <Grid className="grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">

                        <CustomerSettingsSidebar />

                        <div className="min-w-0">

                            <Stack gap={6}>

                                {/* PROFILE */}

                                <div id="profile">

                                    <CustomerProfileSettings
                                        initialDisplayName="Alex Johnson"
                                        initialEmail="alex@example.com"
                                    />

                                </div>

                                {/* WALLET */}

                                <div id="wallet">

                                    <CustomerWalletSettings
                                        ownerWallet="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                                        smartAccount="0xf1cc103c9b156eE9c2C496f582075a3086eC2347"
                                        network="Arbitrum Sepolia"
                                    />

                                </div>

                                {/* NOTIFICATIONS */}

                                <div id="notifications">

                                    <CustomerNotificationSettings />

                                </div>

                                {/* PREFERENCES */}

                                <div id="preferences">

                                    <CustomerPortalPreferences />

                                </div>

                                {/* SECURITY */}

                                <div id="security">

                                    <CustomerSecuritySettings />

                                </div>

                                {/* ACCOUNT */}

                                <div id="account">

                                    <CustomerAccountSettings />

                                </div>

                            </Stack>

                        </div>

                    </Grid>

                </Stack>

            </Container>

        </Page>
    );
}