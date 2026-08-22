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
    Inline,
} from "@/components/layout/Inline";

import {
    Page,
} from "@/components/layout/Page";

import {
    PageHeader,
} from "@/components/layout/PageHeader";

import {
    Section,
} from "@/components/layout/Section";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    Button,
} from "@/components/ui/button";

import {
    BillingOverview,
} from "@/components/dashboard/platform/billing/BillingOverview";

import {
    BillingRevenueChart,
} from "@/components/dashboard/platform/billing/BillingRevenueChart";

import {
    BillingSuccessSummary,
} from "@/components/dashboard/platform/billing/BillingSuccessSummary";

import {
    BillingToolbar,
} from "@/components/dashboard/platform/billing/BillingToolbar";

import {
    BillingTable,
} from "@/components/dashboard/platform/billing/BillingTable";

import {
    BillingPagination,
} from "@/components/dashboard/platform/billing/BillingPagination";

import {
    BillingReconciliation,
} from "@/components/dashboard/platform/billing/BillingReconciliation";

import {
    BillingUnavailableState,
} from "@/components/dashboard/platform/billing/BillingUnavailableState";

import {
    useMerchantBillingPage,
} from "@/hooks/pages/merchant/useMerchantBillingPage";

export default function BillingPage() {
    const page =
        useMerchantBillingPage();

    if (
        page.status ===
            "disconnected" ||
        page.status ===
            "waiting"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <BillingUnavailableState />

                </Container>

            </Page>
        );
    }

    if (
        page.status ===
        "loading"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <div className="space-y-4">
                        <div className="h-8 w-40 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-80 animate-pulse rounded bg-muted" />
                        <div className="h-32 w-full animate-pulse rounded-xl bg-muted" />
                    </div>

                </Container>

            </Page>
        );
    }

    if (
        page.status ===
        "error"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <BillingUnavailableState />

                </Container>

            </Page>
        );
    }

    const billingAvailable =
        !(page.status ===
        "unavailable" || page.status === "not-created");

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Billing"
                        title="Billing"
                        description="Monitor billing volume, payment outcomes, refunds, and reconciliation across your merchant account."
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                    disabled={!billingAvailable}
                                >
                                    Export
                                </Button>

                                <Button
                                    disabled={!billingAvailable}
                                >
                                    Reconcile
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    <BillingOverview
                        available={
                            billingAvailable
                        }
                    />

                    <Section
                        title="Billing performance"
                        description="Understand how your billing infrastructure is performing."
                    >

                        <Grid className="grid-cols-1 gap-4 xl:grid-cols-3">

                            <BillingRevenueChart
                                available={
                                    billingAvailable
                                }
                            />

                            <BillingSuccessSummary
                                available={
                                    billingAvailable
                                }
                            />

                        </Grid>

                    </Section>

                    <Section
                        title="Billing operations"
                        description="Search and inspect billing events across your merchant account."
                    >

                        <Stack gap={4}>

                            <BillingToolbar
                                ready={
                                    billingAvailable
                                }
                            />

                            <BillingTable
                                records={
                                    []
                                }
                            />

                            <BillingPagination
                                available={
                                    billingAvailable
                                }
                            />

                        </Stack>

                    </Section>

                    <Section
                        title="Reconciliation"
                        description="Compare billing events with their settlement and infrastructure state."
                    >

                        <BillingReconciliation
                            available={
                                billingAvailable
                            }
                        />

                    </Section>

                    {page.merchant.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing merchant data...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}