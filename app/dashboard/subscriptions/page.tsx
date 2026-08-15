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
    Button,
} from "@/components/ui/button";

import {
    SubscriptionsOverview,
} from "@/components/dashboard/subscriptions/SubscriptionsOverview";

import {
    SubscriptionsPagination,
} from "@/components/dashboard/subscriptions/SubscriptionsPagination";

import {
    SubscriptionsTable,
} from "@/components/dashboard/subscriptions/SubscriptionsTable";

import {
    SubscriptionsToolbar,
} from "@/components/dashboard/subscriptions/SubscriptionsToolbar";

export default function SubscriptionsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Subscriptions"
                        title="Subscriptions"
                        description="Monitor and manage the customer subscriptions created against your merchant plans."
                        actions={
                            <Inline gap={2}>

                                <Button variant="outline">
                                    Export
                                </Button>

                                <Button>
                                    View plans
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    <SubscriptionsOverview />

                    <Section
                        title="Subscription management"
                        description="Search, filter, and inspect subscriptions across your merchant account."
                    >

                        <Stack gap={4}>

                            <SubscriptionsToolbar />

                            <SubscriptionsTable />

                            <SubscriptionsPagination />

                        </Stack>

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}