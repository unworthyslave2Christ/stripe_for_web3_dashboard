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
    CustomerTransactionHighlight,
} from "@/components/portal/transactions/CustomerTransactionHighlight";

import {
    CustomerTransactionInformation,
} from "@/components/portal/transactions/CustomerTransactionInformation";

import {
    CustomerTransactionsHeader,
} from "@/components/portal/transactions/CustomerTransactionsHeader";

import {
    CustomerTransactionsList,
} from "@/components/portal/transactions/CustomerTransactionsList";

import {
    CustomerTransactionsOverview,
} from "@/components/portal/transactions/CustomerTransactionsOverview";

import {
    CustomerTransactionsPagination,
} from "@/components/portal/transactions/CustomerTransactionsPagination";

import {
    CustomerTransactionsToolbar,
} from "@/components/portal/transactions/CustomerTransactionsToolbar";

export default function CustomerTransactionsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerTransactionsHeader />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerTransactionsOverview />

                    {/* LATEST */}

                    <Section
                        title="Recent activity"
                        description="Your latest Smart Account transaction."
                    >

                        <CustomerTransactionHighlight />

                    </Section>

                    {/* HISTORY */}

                    <Section
                        title="Transaction history"
                        description="Blockchain transactions associated with your Smart Account."
                    >

                        <Stack gap={4}>

                            <CustomerTransactionsToolbar />

                            <CustomerTransactionsList />

                            <CustomerTransactionsPagination />

                        </Stack>

                    </Section>

                    {/* INFORMATION */}

                    <Section
                        title="Transaction information"
                        description="How Smart Account transactions relate to your Stripe for Web3 account."
                    >

                        <CustomerTransactionInformation />

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}