"use client";

import {
    Button,
} from "@/components/ui/button";

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
    PageHeader,
} from "@/components/layout/PageHeader";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    MerchantSettingsNavigation,
} from "@/components/dashboard/account/settings/MerchantSettingsNavigation";

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

import {
    useMerchantSettingsPage,
} from "@/hooks/pages/merchant/useMerchantSettingsPage";

function SettingsSidebar() {
    return (
        <div className="rounded-xl bg-card p-2 ring-1 ring-foreground/10 lg:sticky lg:top-24 lg:self-start lg:p-3">
            <MerchantSettingsNavigation />
        </div>
    );
}

export default function SettingsPage() {
    const page =
        useMerchantSettingsPage();

    if (
        page.status ===
            "disconnected" ||
        page.status ===
            "waiting" ||
        page.status ===
            "loading"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <Stack gap={8}>
                        <PageHeader
                            eyebrow="Merchant settings"
                            title="Settings"
                            description="Configure your merchant identity, billing behavior, notifications, developer integrations, and security preferences."
                        />

                        <Divider />

                        <div className="rounded-xl border bg-card p-6">
                            <p className="text-sm font-medium">
                                {page.status ===
                                "loading"
                                    ? "Loading merchant settings"
                                    : "Waiting for merchant"}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Merchant settings become
                                available once the authenticated
                                merchant resource is ready.
                            </p>
                        </div>
                    </Stack>
                </Container>
            </Page>
        );
    }

    if (
        page.status ===
            "error" ||
        page.status ===
            "not-created"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <Stack gap={8}>
                        <PageHeader
                            eyebrow="Merchant settings"
                            title="Settings"
                            description="Configure your merchant identity, billing behavior, notifications, developer integrations, and security preferences."
                        />

                        <Divider />

                        <div className="rounded-xl border bg-card p-6">
                            <p className="text-sm font-medium">
                                {page.status ===
                                "not-created"
                                    ? "Merchant not created"
                                    : "Unable to load merchant"}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {page.error?.message ??
                                    "Merchant settings cannot be loaded until the merchant resource is available."}
                            </p>

                            <Button
                                className="mt-4"
                                variant="outline"
                                disabled={
                                    !page.actions
                                        .refresh
                                        .available
                                }
                                onClick={() =>
                                    page.actions.refresh.run()
                                }
                            >
                                Retry
                            </Button>
                        </div>
                    </Stack>
                </Container>
            </Page>
        );
    }

    const merchantId =
        page.merchant &&
        typeof page.merchant ===
            "object" &&
        "merchantId" in page.merchant
            ? String(
                  (
                      page.merchant as {
                          merchantId:
                              string | number;
                      }
                  ).merchantId,
              )
            : "—";

    return (
        <Page>
            <Container className="py-8 lg:py-10">
                <Stack gap={8}>
                    <PageHeader
                        eyebrow="Merchant settings"
                        title="Settings"
                        description="Configure your merchant identity, billing behavior, notifications, developer integrations, and security preferences."
                        actions={
                            <SettingsStatus
                                dirty={
                                    page.dirty
                                }
                                editable={
                                    page.actions
                                        .updateMerchant
                                        .available
                                }
                            />
                        }
                    />

                    <Divider />

                    <Grid className="grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                        <SettingsSidebar />

                        <div className="min-w-0">
                            <Stack gap={6}>
                                <div id="general">
                                    <MerchantIdentitySettings
                                        merchantId={
                                            merchantId
                                        }
                                        name={
                                            page
                                                .draft
                                                .name
                                        }
                                        metadataUri={
                                            page
                                                .draft
                                                .metadataUri
                                        }
                                        editable={
                                            page
                                                .actions
                                                .updateMerchant
                                                .available
                                        }
                                        onChange={
                                            page
                                                .draftActions
                                                .update
                                        }
                                        onSave={
                                            page
                                                .actions
                                                .updateMerchant
                                                .run
                                        }
                                        saving={
                                            page
                                                .actions
                                                .updateMerchant
                                                .loading
                                        }
                                    />
                                </div>

                                <div id="billing">
                                    <SettingsBilling
                                        value={
                                            page
                                                .draft
                                                .billingEnvironment
                                        }
                                        editable={
                                            page
                                                .actions
                                                .updateBilling
                                                .available
                                        }
                                        onChange={(
                                            value,
                                        ) =>
                                            page.draftActions.update(
                                                {
                                                    billingEnvironment:
                                                        value,
                                                },
                                            )
                                        }
                                    />
                                </div>

                                <div id="notifications">
                                    <SettingsNotifications
                                        billing={
                                            page
                                                .draft
                                                .billingNotifications
                                        }
                                        operational={
                                            page
                                                .draft
                                                .operationalNotifications
                                        }
                                        security={
                                            page
                                                .draft
                                                .securityNotifications
                                        }
                                        editable={
                                            page
                                                .actions
                                                .updateNotifications
                                                .available
                                        }
                                        onBillingChange={(
                                            value,
                                        ) =>
                                            page.draftActions.update(
                                                {
                                                    billingNotifications:
                                                        value,
                                                },
                                            )
                                        }
                                        onOperationalChange={(
                                            value,
                                        ) =>
                                            page.draftActions.update(
                                                {
                                                    operationalNotifications:
                                                        value,
                                                },
                                            )
                                        }
                                        onSecurityChange={(
                                            value,
                                        ) =>
                                            page.draftActions.update(
                                                {
                                                    securityNotifications:
                                                        value,
                                                },
                                            )
                                        }
                                    />
                                </div>

                                <div id="developers">
                                    <SettingsDeveloper />
                                </div>

                                <div id="security">
                                    <SettingsSecurity
                                        sensitiveConfirmation={
                                            page
                                                .draft
                                                .sensitiveConfirmation
                                        }
                                        editable={
                                            page
                                                .actions
                                                .updateSecurity
                                                .available
                                        }
                                        onSensitiveConfirmationChange={(
                                            value,
                                        ) =>
                                            page.draftActions.update(
                                                {
                                                    sensitiveConfirmation:
                                                        value,
                                                },
                                            )
                                        }
                                    />
                                </div>

                                <DangerZone
                                    available={
                                        page
                                            .actions
                                            .disableMerchant
                                            .available
                                    }
                                    loading={
                                        page
                                            .actions
                                            .disableMerchant
                                            .loading
                                    }
                                    onDisable={
                                        page
                                            .actions
                                            .disableMerchant
                                            .run
                                    }
                                />

                                {page.dirty && (
                                    <div className="flex flex-col gap-3 rounded-xl border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm font-medium">
                                                Local draft changes
                                            </p>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                These changes have
                                                not been persisted
                                                because the
                                                corresponding
                                                merchant settings
                                                operations are not
                                                yet available.
                                            </p>
                                        </div>

                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                page
                                                    .draftActions
                                                    .reset()
                                            }
                                        >
                                            Discard draft
                                        </Button>
                                    </div>
                                )}

                                {page.refreshing && (
                                    <p className="text-xs text-muted-foreground">
                                        Refreshing merchant data...
                                    </p>
                                )}
                            </Stack>
                        </div>
                    </Grid>
                </Stack>
            </Container>
        </Page>
    );
}