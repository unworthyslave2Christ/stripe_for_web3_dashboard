"use client";

import {
    Activity,
    CircleDollarSign,
    CreditCard,
    Users,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

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
    OverviewKpiCard,
} from "@/components/dashboard/platform/overview/OverviewKpiCard";

import {
    RevenueChart,
} from "@/components/dashboard/platform/overview/RevenueChart";

import {
    RevenueSummary,
} from "@/components/dashboard/platform/overview/RevenueSummary";

import {
    SubscriptionChart,
} from "@/components/dashboard/platform/overview/SubscriptionChart";

import {
    CustomerChart,
} from "@/components/dashboard/platform/overview/CustomerChart";

import {
    InfrastructureHealth,
} from "@/components/dashboard/platform/overview/InfrastructureHealth";

import {
    ActivityFeed,
} from "@/components/dashboard/platform/overview/ActivityFeed";

import {
    QuickActions,
} from "@/components/dashboard/platform/overview/QuickActions";

import {
    useMerchantOverviewPage,
} from "@/hooks/pages/merchant/useMerchantOverviewPage";

export default function MerchantOverviewPage() {
    const page =
        useMerchantOverviewPage();

    const merchant =
        page.merchant.data;

    const demo =
        page.demo;

    const customers =
        demo?.customers ??
        null;

    const subscriptions =
        demo?.activeSubscriptions ??
        null;

    const revenue =
        demo?.monthlyRevenue ??
        null;

    const billingSuccess =
        demo?.billingSuccessRate ??
        null;

    const customerTrend =
        demo
            ? percentageChange(
                demo.customers,
                demo.customersPrevious,
            )
            : null;

    const subscriptionTrend =
        demo
            ? percentageChange(
                demo.activeSubscriptions,
                demo.activeSubscriptionsPrevious,
            )
            : null;

    const revenueTrend =
        demo
            ? percentageChange(
                demo.monthlyRevenue,
                demo.monthlyRevenuePrevious,
            )
            : null;

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow={
                            demo
                                ? "Merchant overview · Test mode"
                                : "Merchant overview"
                        }
                        title={
                            `Good morning, ${
                                merchant.name ??
                                "Merchant"
                            }.`
                        }
                        description="Monitor your billing infrastructure, customers, subscriptions, and revenue from one place."
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                    render={
                                        <a href="/dashboard/account/documentation">
                                            Documentation
                                        </a>
                                    }
                                />

                                <Button
                                    render={
                                        <a href="/dashboard/platform/plans">
                                            Create plan
                                        </a>
                                    }
                                />

                            </Inline>
                        }
                    />

                    <Divider />

                    <Section
                        title="Overview"
                        description="A summary of your merchant account."
                    >

                        <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                            <OverviewKpiCard
                                title="Customers"
                                value={
                                    customers ===
                                    null
                                        ? "—"
                                        : customers.toLocaleString()
                                }
                                description={
                                    demo
                                        ? "from last month"
                                        : "Metric API pending"
                                }
                                trend={
                                    customerTrend as string
                                }
                                trendPositive={
                                    customerTrend !==
                                    null &&
                                    customerTrend as unknown as number >=
                                        0
                                }
                                icon={
                                    Users
                                }
                            />

                            <OverviewKpiCard
                                title="Active subscriptions"
                                value={
                                    subscriptions ===
                                    null
                                        ? "—"
                                        : subscriptions.toLocaleString()
                                }
                                description={
                                    demo
                                        ? "from last month"
                                        : "Metric API pending"
                                }
                                trend={
                                    subscriptionTrend as string
                                }
                                trendPositive={
                                    subscriptionTrend !==
                                    null &&
                                    subscriptionTrend as unknown as number >=
                                        0
                                }
                                icon={
                                    CreditCard
                                }
                            />

                            <OverviewKpiCard
                                title="Monthly revenue"
                                value={
                                    revenue ===
                                    null
                                        ? "—"
                                        : `$${revenue.toLocaleString()}`
                                }
                                description={
                                    demo
                                        ? "from last month"
                                        : "Billing API pending"
                                }
                                trend={
                                    revenueTrend as string
                                }
                                trendPositive={
                                    revenueTrend !==
                                    null &&
                                    Number(revenueTrend) >=
                                        0
                                }
                                icon={
                                    CircleDollarSign
                                }
                            />

                            <OverviewKpiCard
                                title="Billing success"
                                value={
                                    billingSuccess ===
                                    null
                                        ? "—"
                                        : `${billingSuccess.toFixed(1)}%`
                                }
                                description={
                                    demo
                                        ? "last 30 days"
                                        : "Billing API pending"
                                }
                                icon={
                                    Activity
                                }
                            />

                        </Grid>

                    </Section>

                    <Section
                        title="Revenue"
                        description="Track recurring billing performance."
                    >

                        <Grid className="grid-cols-1 xl:grid-cols-3">

                            {demo ? (
                                <RevenueChart
                                    monthlyRevenue={
                                        demo.monthlyRevenue
                                    }
                                    series={
                                        demo.revenueSeries
                                    }
                                    demo
                                />
                            ) : (
                                <div className="rounded-xl border bg-card p-6 xl:col-span-2">

                                    <p className="text-sm font-medium">
                                        Revenue data
                                    </p>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Live revenue history will appear when the billing-history
                                        operation is exposed by the merchant SDK/API.
                                    </p>

                                </div>
                            )}

                            <RevenueSummary
                                recurringRevenue={
                                    demo?.monthlyRevenue ??
                                    0
                                }
                                oneTimeRevenue={
                                    demo
                                        ? 2451
                                        : 0
                                }
                                refunds={
                                    demo
                                        ? 312
                                        : 0
                                }
                                demo={
                                    Boolean(
                                        demo,
                                    )
                                }
                            />

                        </Grid>

                    </Section>

                    <Section
                        title="Operations"
                        description="Understand customer and subscription activity."
                    >

                        <Grid className="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

                            <SubscriptionChart
                                values={
                                    demo?.subscriptionSeries ??
                                    []
                                }
                                demo={
                                    Boolean(
                                        demo,
                                    )
                                }
                            />

                            <CustomerChart
                                values={
                                    demo?.customerSeries ??
                                    []
                                }
                                demo={
                                    Boolean(
                                        demo,
                                    )
                                }
                            />

                            <InfrastructureHealth
                                demo={
                                    Boolean(
                                        demo,
                                    )
                                }
                            />

                        </Grid>

                    </Section>

                    <Section
                        title="Activity"
                        description="Recent events across your merchant infrastructure."
                    >

                        <Grid className="grid-cols-1 lg:grid-cols-2">

                            <ActivityFeed
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

                            <QuickActions />

                        </Grid>

                    </Section>

                    <div className="flex flex-col gap-3 rounded-lg border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-sm font-medium">
                                Billing infrastructure operational
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {demo
                                    ? "Infrastructure indicators are currently shown from test-mode facade data."
                                    : "Live infrastructure monitoring will be connected through the platform API."}
                            </p>

                        </div>

                        <Badge
                            variant="secondary"
                            className="w-fit"
                        >
                            Operational
                        </Badge>

                    </div>

                    {(
                        page.merchant.refreshing ||
                        page.plans.refreshing
                    ) && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing merchant data...
                        </p>
                    )}

                    <div className="text-[11px] text-muted-foreground">
                        {merchant.merchantId
                            ? `Merchant ID ${merchant.merchantId}`
                            : "Merchant identity loaded"}
                        {" · "}
                        {page.planSummary.total} plans currently loaded.
                    </div>

                </Stack>

            </Container>

        </Page>
    );
}

function percentageChange(
    current: number,
    previous: number,
) {
    if (
        previous ===
        0
    ) {
        return undefined;
    }

    const result =
        (
            (
                current -
                previous
            ) /
            previous
        ) *
        100;

    return `${
        result >= 0
            ? "+"
            : ""
    }${result.toFixed(1)}%`;
}

function OverviewLoading() {
    return (
        <div className="space-y-6">

            <div className="space-y-3">

                <div className="h-3 w-32 animate-pulse rounded bg-muted" />

                <div className="h-9 w-72 animate-pulse rounded bg-muted" />

                <div className="h-4 w-[540px] max-w-full animate-pulse rounded bg-muted" />

            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {Array.from(
                    {
                        length: 4,
                    },
                ).map(
                    (
                        _,
                        index,
                    ) => (
                        <div
                            key={
                                index
                            }
                            className="rounded-xl border bg-card p-5"
                        >

                            <div className="h-4 w-24 animate-pulse rounded bg-muted" />

                            <div className="mt-4 h-8 w-28 animate-pulse rounded bg-muted" />

                            <div className="mt-4 h-3 w-36 animate-pulse rounded bg-muted" />

                        </div>
                    ),
                )}

            </div>

            <div className="h-64 animate-pulse rounded-xl border bg-muted" />

        </div>
    );
}