import {
    Container,
} from "@/components/layout/Container";

import {
    Divider,
} from "@/components/layout/Divider";

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
    CustomerSubscriptionGuidance,
} from "@/components/portal/subscriptions/CustomerSubscriptionGuidance";

import {
    CustomerSubscriptionsHeader,
} from "@/components/portal/subscriptions/CustomerSubscriptionsHeader";

import {
    CustomerSubscriptionsList,
} from "@/components/portal/subscriptions/CustomerSubscriptionsList";

import {
    CustomerSubscriptionsOverview,
} from "@/components/portal/subscriptions/CustomerSubscriptionsOverview";

import {
    CustomerSubscriptionsPagination,
} from "@/components/portal/subscriptions/CustomerSubscriptionsPagination";

import {
    CustomerSubscriptionsToolbar,
} from "@/components/portal/subscriptions/CustomerSubscriptionsToolbar";

export default function CustomerSubscriptionsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerSubscriptionsHeader />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerSubscriptionsOverview />

                    {/* SUBSCRIPTIONS */}

                    <Section
                        title="My subscriptions"
                        description="Subscriptions associated with your Smart Account."
                    >

                        <Stack gap={4}>

                            <CustomerSubscriptionsToolbar />

                            <CustomerSubscriptionsList />

                            <CustomerSubscriptionsPagination />

                        </Stack>

                    </Section>

                    {/* GUIDANCE */}

                    <Section
                        title="Subscription guidance"
                        description="Important information about how subscriptions work with your Smart Account."
                    >

                        <CustomerSubscriptionGuidance />

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}