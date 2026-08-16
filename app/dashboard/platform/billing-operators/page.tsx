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
    BillingOperatorsOverview,
} from "@/components/dashboard/platform/billing-operators/BillingOperatorsOverview";

import {
    BillingOperatorsPagination,
} from "@/components/dashboard/platform/billing-operators/BillingOperatorsPagination";

import {
    BillingOperatorsTable,
} from "@/components/dashboard/platform/billing-operators/BillingOperatorsTable";

import {
    BillingOperatorsToolbar,
} from "@/components/dashboard/platform/billing-operators/BillingOperatorsToolbar";

export default function BillingOperatorsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <PageHeader
                        eyebrow="Billing operators"
                        title="Billing Operators"
                        description="Manage the people and services authorized to interact with your merchant billing infrastructure."
                        actions={
                            <Inline gap={2}>

                                <Button variant="outline">
                                    Export
                                </Button>

                                <Button>
                                    Add operator
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <BillingOperatorsOverview />

                    {/* OPERATOR MANAGEMENT */}

                    <Section
                        title="Operator management"
                        description="Search, inspect, and manage billing authorization."
                    >

                        <Stack gap={4}>

                            <BillingOperatorsToolbar />

                            <BillingOperatorsTable />

                            <BillingOperatorsPagination />

                        </Stack>

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}