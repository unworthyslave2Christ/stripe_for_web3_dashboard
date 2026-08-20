"use client";

import {
    useMemo,
} from "react";

import {
    AlertTriangle,
    ArrowRight,
    CalendarClock,
    CheckCircle2,
    Copy,
    CreditCard,
    Info,
    RefreshCw,
    ShieldCheck,
    WalletCards,
    Zap,
} from "lucide-react";

import Link from "next/link";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
    CustomerActivityPreview,
} from "@/components/portal/overview/CustomerActivityPreview";

import {
    CustomerOverviewEmptyState,
} from "@/components/portal/overview/CustomerOverviewEmptyState";

import {
    CustomerOverviewErrorState,
} from "@/components/portal/overview/CustomerOverviewErrorState";

import {
    CustomerOverviewHeader,
} from "@/components/portal/overview/CustomerOverviewHeader";

import {
    CustomerOverviewKpiCard,
} from "@/components/portal/overview/CustomerOverviewKpiCard";

import {
    CustomerOverviewLoadingState,
} from "@/components/portal/overview/CustomerOverviewLoadingState";

import {
    CustomerQuickActions,
} from "@/components/portal/overview/CustomerQuickActions";

import {
    CustomerRevenueCard,
} from "@/components/portal/overview/CustomerRevenueCard";

import {
    CustomerSmartAccountCard,
} from "@/components/portal/overview/CustomerSmartAccountCard";

import {
    CustomerSubscriptionSummary,
} from "@/components/portal/overview/CustomerSubscriptionSummary";

import {
    useCustomerOverviewPage,
} from "@/hooks/pages/customer/useCustomerOverviewPage";

export default function CustomerPortalOverviewPage() {

    const page =
        useCustomerOverviewPage();

    if (
        page.customer.loading &&
        !page.customer.data
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerOverviewLoadingState />

                </Container>

            </Page>
        );
    }

    if (
        page.customer.error &&
        !page.customer.data
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerOverviewErrorState
                        error={
                            page.customer.error
                        }
                        onRetry={
                            page.customer.refresh
                        }
                    />

                </Container>

            </Page>
        );
    }

    if (
        page.customer.status ===
        "not-created"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerOverviewEmptyState />

                </Container>

            </Page>
        );
    }

    const customer =
        page.customer.data;

    const demo =
        page.demo;

    type ModeType = "demo" | "live" ; 

    const mode =
        page.mode as ModeType;

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerOverviewHeader
                        customerName={
                            customer?.displayName
                        }
                        smartAccount={
                            customer?.smartAccount
                        }
                        mode={
                            mode
                        }
                    />

                    <Divider />

                    {/* KPIs */}

                    <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <CustomerOverviewKpiCard
                            title="Subscriptions"
                            value={
                                page.subscriptionSummary.total.toLocaleString()
                            }
                            description="Total subscriptions"
                            icon={
                                CreditCard
                            }
                        />

                        <CustomerOverviewKpiCard
                            title="Active"
                            value={
                                page.subscriptionSummary.active.toLocaleString()
                            }
                            description="Currently active"
                            icon={
                                Zap
                            }
                        />

                        <CustomerOverviewKpiCard
                            title="Billing value"
                            value={
                                demo
                                    ? `$${demo.revenue.monthlyUsd.toFixed(2)}`
                                    : "—"
                            }
                            description={
                                demo
                                    ? "Test-mode estimate"
                                    : "Awaiting billing data"
                            }
                            icon={
                                WalletCards
                            }
                        />

                        <CustomerOverviewKpiCard
                            title="Authorization"
                            value={
                                customer?.smartAccount
                                    ? "Ready"
                                    : "Pending"
                            }
                            description="Smart Account billing capability"
                            icon={
                                ShieldCheck
                            }
                        />

                    </Grid>

                    {/* PRIMARY */}

                    <Grid className="grid-cols-1 gap-4 xl:grid-cols-2">

                        {demo && (
                            <CustomerRevenueCard
                                monthlyUsd={
                                    demo.revenue.monthlyUsd
                                }
                                previousMonthlyUsd={
                                    demo.revenue.previousMonthlyUsd
                                }
                                series={
                                    demo.revenue.series
                                }
                                demo
                            />
                        )}

                        <CustomerSmartAccountCard
                            smartAccount={
                                customer?.smartAccount
                            }
                        />

                    </Grid>

                    {/* SECONDARY */}

                    <Grid className="grid-cols-1 gap-4 lg:grid-cols-2">

                        <CustomerSubscriptionSummary
                            total={
                                page.subscriptionSummary.total
                            }
                            active={
                                page.subscriptionSummary.active
                            }
                            paused={
                                page.subscriptionSummary.paused
                            }
                            cancelled={
                                page.subscriptionSummary.cancelled
                            }
                        />

                        <CustomerActivityPreview
                            items={
                                demo?.activity ??
                                []
                            }
                            demo={
                                Boolean(
                                    demo,
                                )
                            }
                        />

                    </Grid>

                    {/* ACTIONS */}

                    <CustomerQuickActions />

                    {page.subscriptions.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing subscription data...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}