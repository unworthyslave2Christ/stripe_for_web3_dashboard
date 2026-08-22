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
    BillingOperatorsOverview,
} from "@/components/dashboard/platform/billing-operators/BillingOperatorsOverview";

import {
    BillingOperatorsToolbar,
} from "@/components/dashboard/platform/billing-operators/BillingOperatorsToolbar";

import {
    BillingOperatorsTable,
} from "@/components/dashboard/platform/billing-operators/BillingOperatorsTable";

import {
    BillingOperatorsPagination,
} from "@/components/dashboard/platform/billing-operators/BillingOperatorsPagination";

import {
    BillingOperatorsUnavailableState,
} from "@/components/dashboard/platform/billing-operators/BillingOperatorsUnavailableState";

import {
    useMerchantBillingOperatorsPage,
} from "@/hooks/pages/merchant/useMerchantBillingOperatorsPage";

export default function BillingOperatorsPage() {
    const page =
        useMerchantBillingOperatorsPage();

    if (
        page.status ===
            "disconnected" ||
        page.status ===
            "waiting"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <BillingOperatorsUnavailableState />

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

                        <div className="h-8 w-52 animate-pulse rounded bg-muted" />

                        <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted" />

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

                    <BillingOperatorsUnavailableState />

                </Container>

            </Page>
        );
    }

    const operatorsAvailable =
        !( page.status ===
        "unavailable" || page.status ===
        "not-created") ;

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Billing operators"
                        title="Billing Operators"
                        description="Manage the people and services authorized to interact with your merchant billing infrastructure."
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                    disabled={
                                        !operatorsAvailable
                                    }
                                >
                                    Export
                                </Button>

                                <Button
                                    disabled={
                                        !operatorsAvailable
                                    }
                                >
                                    Add operator
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    <BillingOperatorsOverview
                        available={
                            operatorsAvailable
                        }
                    />

                    <Section
                        title="Operator management"
                        description="Search, inspect, and manage billing authorization."
                    >

                        <Stack gap={4}>

                            <BillingOperatorsToolbar
                                ready={
                                    operatorsAvailable
                                }
                            />

                            <BillingOperatorsTable
                                operators={
                                    page.operators.data
                                }
                            />

                            <BillingOperatorsPagination
                                available={
                                    operatorsAvailable
                                }
                            />

                        </Stack>

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