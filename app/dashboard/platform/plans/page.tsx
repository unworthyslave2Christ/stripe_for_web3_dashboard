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
    PlansOverview,
} from "@/components/dashboard/platform/plans/PlansOverview";

import {
    PlansPagination,
} from "@/components/dashboard/platform/plans/PlansPagination";

import {
    PlansTable,
} from "@/components/dashboard/platform/plans/PlansTable";

import {
    PlansToolbar,
} from "@/components/dashboard/platform/plans/PlansToolbar";

export default function PlansPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Plans"
                        title="Plans"
                        description="Create and manage the billing plans your merchant offers to customers."
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                >
                                    Export
                                </Button>

                                <Button>
                                    Create plan
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    <PlansOverview />

                    <Section
                        title="Plan management"
                        description="Search, filter, and manage the plans available to your customers."
                    >

                        <Stack gap={4}>

                            <PlansToolbar />

                            <PlansTable />

                            <PlansPagination />

                        </Stack>

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}