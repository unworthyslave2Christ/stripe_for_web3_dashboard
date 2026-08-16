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
    BillingOverview,
} from "@/components/dashboard/platform/billing/BillingOverview";

import {
    BillingRevenueChart,
} from "@/components/dashboard/platform/billing/BillingRevenueChart";

import {
    BillingSuccessSummary,
} from "@/components/dashboard/platform/billing/BillingSuccessSummary";

import {
    BillingReconciliation,
} from "@/components/dashboard/platform/billing/BillingReconciliation";

import {
    BillingToolbar,
} from "@/components/dashboard/platform/billing/BillingToolbar";

import {
    BillingTable,
} from "@/components/dashboard/platform/billing/BillingTable";

import {
    BillingPagination,
} from "@/components/dashboard/platform/billing/BillingPagination";

export default function BillingPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <PageHeader
                        eyebrow="Billing"
                        title="Billing"
                        description="Monitor billing volume, payment outcomes, refunds, and reconciliation across your merchant account."
                        actions={
                            <Inline gap={2}>
                                <Button variant="outline">
                                    Export
                                </Button>

                                <Button>
                                    Reconcile
                                </Button>
                            </Inline>
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <BillingOverview />

                    {/* PERFORMANCE */}

                    <Section
                        title="Billing performance"
                        description="Understand how your billing infrastructure is performing."
                    >

                        <Grid className="grid-cols-1 gap-4 xl:grid-cols-3">

                            <BillingRevenueChart />

                            <BillingSuccessSummary />

                        </Grid>

                    </Section>

                    {/* OPERATIONS */}

                    <Section
                        title="Billing operations"
                        description="Search and inspect billing events across your merchant account."
                    >

                        <Stack gap={4}>

                            <BillingToolbar />

                            <BillingTable />

                            <BillingPagination />

                        </Stack>

                    </Section>

                    {/* RECONCILIATION */}

                    <Section
                        title="Reconciliation"
                        description="Compare billing events with their settlement and infrastructure state."
                    >

                        <BillingReconciliation />

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}