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
    CustomerBillingHeader,
} from "@/components/portal/billing/CustomerBillingHeader";

import {
    CustomerBillingOverview,
} from "@/components/portal/billing/CustomerBillingOverview";

import {
    CustomerBillingInformation,
} from "@/components/portal/billing/CustomerBillingInformation";

import {
    CustomerBillingList,
} from "@/components/portal/billing/CustomerBillingList";

import {
    CustomerBillingPagination,
} from "@/components/portal/billing/CustomerBillingPagination";

import {
    CustomerBillingToolbar,
} from "@/components/portal/billing/CustomerBillingToolbar";

import {
    CustomerUpcomingBilling,
} from "@/components/portal/billing/CustomerUpcomingBilling";

export default function CustomerBillingPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerBillingHeader />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerBillingOverview />

                    {/* UPCOMING */}

                    <Section
                        title="Upcoming billing"
                        description="Your next scheduled subscription charge."
                    >

                        <CustomerUpcomingBilling />

                    </Section>

                    {/* HISTORY */}

                    <Section
                        title="Billing history"
                        description="Charges and billing outcomes associated with your subscriptions."
                    >

                        <Stack gap={4}>

                            <CustomerBillingToolbar />

                            <CustomerBillingList />

                            <CustomerBillingPagination />

                        </Stack>

                    </Section>

                    {/* INFORMATION */}

                    <Section
                        title="Billing information"
                        description="How your Smart Account participates in recurring billing."
                    >

                        <CustomerBillingInformation />

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}