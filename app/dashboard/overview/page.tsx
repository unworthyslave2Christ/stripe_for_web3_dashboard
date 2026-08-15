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
    DashboardShell,
} from "@/components/dashboard/DashboardShell";

import {
    OverviewKpiCard,
} from "@/components/dashboard/overview/OverviewKpiCard";

import {
    RevenueChart,
} from "@/components/dashboard/overview/RevenueChart";

import {
    SubscriptionChart,
} from "@/components/dashboard/overview/SubscriptionChart";

import {
    CustomerChart,
} from "@/components/dashboard/overview/CustomerChart";

import {
    InfrastructureHealth,
} from "@/components/dashboard/overview/InfrastructureHealth";

import {
    ActivityFeed,
} from "@/components/dashboard/overview/ActivityFeed";

import {
    QuickActions,
} from "@/components/dashboard/overview/QuickActions";

export default function Home() {
    return (

            <Page>

                <Container className="py-8 lg:py-10">

                    <Stack gap={8}>

                        {/* PAGE HEADER */}

                        <PageHeader
                            eyebrow="Merchant overview"
                            title="Good morning, ACMEFLOW."
                            description="Monitor your billing infrastructure, customers, subscriptions, and revenue from one place."
                            actions={
                                <Inline gap={2}>
                                    <Button variant="outline">
                                        Documentation
                                    </Button>

                                    <Button>
                                        Create plan
                                    </Button>
                                </Inline>
                            }
                        />

                        <Divider />

                        {/* KPI */}

                        <Section
                            title="Overview"
                            description="A real-time summary of your merchant account."
                        >

                            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                                <OverviewKpiCard
                                    title="Customers"
                                    value="2,431"
                                    description="from last month"
                                    trend="+12.4%"
                                    trendPositive
                                    icon={Users}
                                />

                                <OverviewKpiCard
                                    title="Active subscriptions"
                                    value="1,892"
                                    description="from last month"
                                    trend="+8.2%"
                                    trendPositive
                                    icon={CreditCard}
                                />

                                <OverviewKpiCard
                                    title="Monthly revenue"
                                    value="$45,231"
                                    description="from last month"
                                    trend="+14.8%"
                                    trendPositive
                                    icon={CircleDollarSign}
                                />

                                <OverviewKpiCard
                                    title="Billing success"
                                    value="99.4%"
                                    description="last 30 days"
                                    trend="+0.7%"
                                    trendPositive
                                    icon={Activity}
                                />

                            </Grid>

                        </Section>

                        {/* REVENUE */}

                        <Section
                            title="Revenue"
                            description="Track recurring billing performance."
                        >

                            <Grid className="grid-cols-1 xl:grid-cols-3">

                                <RevenueChart />

                                <CardPlaceholderSummary />

                            </Grid>

                        </Section>

                        {/* OPERATIONS */}

                        <Section
                            title="Operations"
                            description="Understand customer and subscription activity."
                        >

                            <Grid className="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">

                                <SubscriptionChart />

                                <CustomerChart />

                                <InfrastructureHealth />

                            </Grid>

                        </Section>

                        {/* ACTIVITY */}

                        <Section
                            title="Activity"
                            description="Recent events across your merchant infrastructure."
                        >

                            <Grid className="grid-cols-1 lg:grid-cols-2">

                                <ActivityFeed />

                                <QuickActions />

                            </Grid>

                        </Section>

                        {/* FOOTER STATUS */}

                        <div className="flex flex-col gap-3 rounded-lg border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <p className="text-sm font-medium">
                                    Billing infrastructure operational
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    All monitored services are currently healthy.
                                </p>
                            </div>

                            <Badge
                                variant="secondary"
                                className="w-fit"
                            >
                                Operational
                            </Badge>

                        </div>

                    </Stack>

                </Container>

            </Page>
    );
}

function CardPlaceholderSummary() {
    return (
        <div className="flex flex-col justify-between rounded-xl border bg-card p-6 xl:col-span-1">

            <div>

                <p className="text-sm font-medium text-muted-foreground">
                    Revenue this month
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-tight">
                    $45,231.00
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                    Your recurring revenue has increased steadily over the last several months.
                </p>

            </div>

            <div className="mt-8 space-y-4">

                <MetricRow
                    label="Recurring revenue"
                    value="$42,780"
                />

                <MetricRow
                    label="One-time revenue"
                    value="$2,451"
                />

                <MetricRow
                    label="Refunds"
                    value="$312"
                />

            </div>

        </div>
    );
}

function MetricRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">

            <span className="text-sm text-muted-foreground">
                {label}
            </span>

            <span className="text-sm font-medium">
                {value}
            </span>

        </div>
    );
}