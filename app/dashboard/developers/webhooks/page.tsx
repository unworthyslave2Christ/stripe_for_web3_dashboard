"use client";

import {
    useState,
} from "react";

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
    WebhooksOverview,
} from "@/components/dashboard/developers/webhooks/WebhooksOverview";

import {
    WebhooksDeliveryChart,
} from "@/components/dashboard/developers/webhooks/WebhooksDeliveryChart";

import {
    WebhooksHealthSummary,
} from "@/components/dashboard/developers/webhooks/WebhooksHealthSummary";

import {
    WebhooksToolbar,
} from "@/components/dashboard/developers/webhooks/WebhooksToolbar";

import {
    WebhooksTable,
} from "@/components/dashboard/developers/webhooks/WebhooksTable";

import {
    WebhooksPagination,
} from "@/components/dashboard/developers/webhooks/WebhooksPagination";

import {
    CreateWebhookDialog,
} from "@/components/dashboard/developers/webhooks/CreateWebhookDialog";

export default function WebhooksPage() {
    const [
        createDialogOpen,
        setCreateDialogOpen,
    ] = useState(false);

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <PageHeader
                        eyebrow="Developers"
                        title="Webhooks"
                        description="Configure endpoints that receive real-time events from your Stripe for Web3 billing infrastructure."
                        actions={
                            <Inline gap={2}>

                                <Button variant="outline">
                                    Documentation
                                </Button>

                                <Button
                                    onClick={() =>
                                        setCreateDialogOpen(
                                            true,
                                        )
                                    }
                                >
                                    Create endpoint
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <WebhooksOverview />

                    {/* HEALTH */}

                    <Section
                        title="Endpoint health"
                        description="Monitor webhook delivery reliability across your integrations."
                    >

                        <Grid className="grid-cols-1 gap-4 xl:grid-cols-3">

                            <WebhooksDeliveryChart />

                            <WebhooksHealthSummary />

                        </Grid>

                    </Section>

                    {/* ENDPOINT MANAGEMENT */}

                    <Section
                        title="Webhook endpoints"
                        description="Manage the endpoints that receive events from your merchant."
                    >

                        <Stack gap={4}>

                            <WebhooksToolbar />

                            <WebhooksTable />

                            <WebhooksPagination />

                        </Stack>

                    </Section>

                </Stack>

            </Container>

            <CreateWebhookDialog
                open={createDialogOpen}
                onOpenChange={
                    setCreateDialogOpen
                }
            />

        </Page>
    );
}