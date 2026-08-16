import {
    Container,
} from "@/components/layout/Container";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Page,
} from "@/components/layout/Page";

import {
    PageHeader,
} from "@/components/layout/PageHeader";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    Divider,
} from "@/components/layout/Divider";

import {
    SettingsSidebar,
} from "@/components/dashboard/account/settings/SettingsSidebar";

import {
    MerchantIdentitySettings,
} from "@/components/dashboard/account/settings/MerchantIdentitySettings";

import {
    SettingsBilling,
} from "@/components/dashboard/account/settings/SettingsBilling";

import {
    SettingsNotifications,
} from "@/components/dashboard/account/settings/SettingsNotifications";

import {
    SettingsDeveloper,
} from "@/components/dashboard/account/settings/SettingsDeveloper";

import {
    SettingsSecurity,
} from "@/components/dashboard/account/settings/SettingsSecurity";

import {
    DangerZone,
} from "@/components/dashboard/account/settings/DangerZone";

import {
    SettingsStatus,
} from "@/components/dashboard/account/settings/SettingsStatus";

export default function SettingsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <PageHeader
                        eyebrow="Merchant settings"
                        title="Settings"
                        description="Configure your merchant identity, billing behavior, notifications, developer integrations, and security preferences."
                        actions={
                            <SettingsStatus />
                        }
                    />

                    <Divider />

                    {/* SETTINGS */}

                    <Grid className="grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">

                        <SettingsSidebar />

                        <div className="min-w-0">

                            <Stack gap={6}>

                                <div id="general">

                                    <MerchantIdentitySettings
                                        merchantId={12}
                                        initialName="ACMEFLOW"
                                        initialMetadataUri="ipfs://example-merchant-metadata"
                                    />

                                </div>

                                <div id="billing">

                                    <SettingsBilling />

                                </div>

                                <div id="notifications">

                                    <SettingsNotifications />

                                </div>

                                <div id="developers">

                                    <SettingsDeveloper />

                                </div>

                                <div id="security">

                                    <SettingsSecurity />

                                </div>

                                <DangerZone />

                            </Stack>

                        </div>

                    </Grid>

                </Stack>

            </Container>

        </Page>
    );
}