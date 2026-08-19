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
    Section,
} from "@/components/layout/Section";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    SmartAccountActions,
} from "@/components/portal/smart-account/SmartAccountActions";

import {
    SmartAccountActivity,
} from "@/components/portal/smart-account/SmartAccountActivity";

import {
    SmartAccountCapabilities,
} from "@/components/portal/smart-account/SmartAccountCapabilities";

import {
    SmartAccountHeader,
} from "@/components/portal/smart-account/SmartAccountHeader";

import {
    SmartAccountIdentityCard,
} from "@/components/portal/smart-account/SmartAccountIdentityCard";

import {
    SmartAccountOverview,
} from "@/components/portal/smart-account/SmartAccountOverview";

import {
    SmartAccountOwnerCard,
} from "@/components/portal/smart-account/SmartAccountOwnerCard";

import {
    SmartAccountPermissionCard,
} from "@/components/portal/smart-account/SmartAccountPermissionCard";

import {
    SmartAccountSecurity,
} from "@/components/portal/smart-account/SmartAccountSecurity";

import {
    useCustomerSmartAccountPage,
} from "@/hooks/pages/customer/useCustomerSmartAccountPage";

export default function SmartAccountPage() {

    const page =
        useCustomerSmartAccountPage();

    ////////////////////////////////////////////////////////////
    // LOADING
    ////////////////////////////////////////////////////////////

    if (
        page.customer.loading &&
        !page.smartAccount.address
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <div className="space-y-6">

                        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />

                        <div className="h-4 w-80 max-w-full animate-pulse rounded-md bg-muted" />

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                            {Array.from({
                                length: 4,
                            }).map(
                                (
                                    _,
                                    index,
                                ) => (
                                    <div
                                        key={index}
                                        className="h-32 animate-pulse rounded-xl border bg-card"
                                    />
                                ),
                            )}

                        </div>

                    </div>

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // ERROR
    ////////////////////////////////////////////////////////////

    if (
        page.customer.error &&
        !page.customer.data
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">

                        <div>

                            <h1 className="text-lg font-semibold">
                                Unable to load Smart Account
                            </h1>

                            <p className="mt-2 text-sm text-muted-foreground">
                                {
                                    page.customer.error.message
                                }
                            </p>

                        </div>

                    </div>

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // NO SMART ACCOUNT
    ////////////////////////////////////////////////////////////

    if (
        page.smartAccount.status ===
        "NOT_CREATED"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <Stack gap={8}>

                        <SmartAccountHeader
                            address={
                                undefined
                            }

                            status={
                                "NOT_CREATED"
                            }

                            network={
                                page.smartAccount.network
                            }

                            explorerUrl={
                                undefined
                            }
                        />

                        <Divider />

                        <div className="rounded-xl border border-dashed bg-card p-8">

                            <h2 className="text-lg font-semibold">
                                Smart Account not created
                            </h2>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                Complete customer onboarding to create your Smart Account and access Smart Account management.
                            </p>

                        </div>

                    </Stack>

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // REAL DATA
    ////////////////////////////////////////////////////////////

    const account =
        page.smartAccount;

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <SmartAccountHeader
                        address={
                            account.address
                        }

                        status={
                            account.status
                        }

                        network={
                            account.network
                        }

                        explorerUrl={
                            account.explorerUrl
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <SmartAccountOverview
                        account={
                            account
                        }
                    />

                    {/* IDENTITY */}

                    <Section
                        title="Account identity"
                        description="The addresses and network associated with your Smart Account."
                    >

                        <Grid className="grid-cols-1 gap-4 xl:grid-cols-2">

                            <SmartAccountIdentityCard
                                address={
                                    account.address
                                }

                                network={
                                    account.network
                                }

                                explorerUrl={
                                    account.explorerUrl
                                }
                            />

                            <SmartAccountOwnerCard
                                ownerWallet={
                                    account.ownerWallet
                                }
                            />

                        </Grid>

                    </Section>

                    {/* BILLING AUTHORIZATION */}

                    <Section
                        title="Billing authorization"
                        description="Permissions that allow your Smart Account to participate in active subscriptions."
                    >

                        <Grid className="grid-cols-1 gap-4 xl:grid-cols-2">

                            <SmartAccountPermissionCard
                                permissionStatus={
                                    account.billingAuthorization
                                }

                                demo={
                                    page.mode ===
                                    "demo"
                                }
                            />

                            <SmartAccountCapabilities
                                hasSmartAccount={
                                    Boolean(
                                        account.address,
                                    )
                                }

                                billingAuthorization={
                                    account.billingAuthorization
                                }

                                demo={
                                    page.mode ===
                                    "demo"
                                }
                            />

                        </Grid>

                    </Section>

                    {/* ACTIVITY */}

                    <Section
                        title="Activity"
                        description="Recent events involving your Smart Account."
                    >

                        <SmartAccountActivity
                            activity={
                                page.activity
                            }

                            demo={
                                page.mode ===
                                "demo"
                            }
                        />

                    </Section>

                    {/* SECURITY */}

                    <Section
                        title="Security"
                        description="Important information about ownership and authorization."
                    >

                        <SmartAccountSecurity />

                    </Section>

                    {/* ACTIONS */}

                    <Section
                        title="Account actions"
                        description="Manage or inspect your Smart Account."
                    >

                        <SmartAccountActions
                            address={
                                account.address
                            }

                            explorerUrl={
                                account.explorerUrl
                            }
                        />

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}