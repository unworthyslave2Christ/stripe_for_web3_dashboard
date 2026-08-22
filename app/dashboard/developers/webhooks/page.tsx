"use client";

import {
    useMemo,
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

import {
    useWebhooksPage,
} from "@/hooks/pages/developer/useWebhooksPage";

export default function WebhooksPage() {
    const page =
        useWebhooksPage();

    const [
        createDialogOpen,
        setCreateDialogOpen,
    ] = useState(false);

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        environment,
        setEnvironment,
    ] = useState<
        "all" | "TEST" | "LIVE"
    >("all");

    const [
        status,
        setStatus,
    ] = useState<
        "all" |
            "ACTIVE" |
            "DISABLED" |
            "FAILING"
    >("all");

    const [
        event,
        setEvent,
    ] = useState<string>("all");

    const visibleWebhooks =
        useMemo(() => {
            const query =
                search
                    .trim()
                    .toLowerCase();

            return page.table.data.filter(
                (webhook) => {
                    if (
                        environment !==
                            "all" &&
                        webhook.environment !==
                            environment
                    ) {
                        return false;
                    }

                    if (
                        status !==
                            "all" &&
                        webhook.status !==
                            status
                    ) {
                        return false;
                    }

                    if (
                        event !== "all" &&
                        !webhook.events.includes(
                            event as never,
                        )
                    ) {
                        return false;
                    }

                    if (!query) {
                        return true;
                    }

                    return (
                        webhook.name
                            .toLowerCase()
                            .includes(
                                query,
                            ) ||
                        webhook.webhookId
                            .toLowerCase()
                            .includes(
                                query,
                            ) ||
                        webhook.endpointUrl
                            .toLowerCase()
                            .includes(
                                query,
                            )
                    );
                },
            );
        }, [
            page.table.data,
            search,
            environment,
            status,
            event,
        ]);

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Developers"
                        title="Webhooks"
                        description="Configure endpoints that receive real-time events from your Stripe for Web3 billing infrastructure."
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                >
                                    Documentation
                                </Button>

                                <Button
                                    disabled={
                                        !page.actions
                                            .create
                                            .available
                                    }
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

                    {page.merchant.status ===
                        "not-implemented" && (
                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">

                            <p className="text-sm font-medium">
                                Webhook API operations are pending
                            </p>

                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                The merchant SDK does not yet expose live webhook
                                resource operations. Demo mode may still display
                                representative endpoint data.
                            </p>

                        </div>
                    )}

                    {page.merchant.error && (
                        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                            {page.merchant.error.message}
                        </div>
                    )}

                    <WebhooksOverview
                        total={
                            page.overview.data.total
                        }
                        active={
                            page.overview.data.active
                        }
                        successRate={
                            page.overview.data
                                .successRate
                        }
                        failing={
                            page.overview.data.failing
                        }
                    />

                    <Section
                        title="Endpoint health"
                        description="Monitor webhook delivery reliability across your integrations."
                    >

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

                            <WebhooksDeliveryChart
                                successRate={
                                    page.health.data
                                        .successRate
                                }
                                available={
                                    page.table
                                        .available
                                }
                            />

                            <WebhooksHealthSummary
                                total={
                                    page.health.data.total
                                }
                                active={
                                    page.health.data.active
                                }
                                failing={
                                    page.health.data.failing
                                }
                                successRate={
                                    page.health.data
                                        .successRate
                                }
                            />

                        </div>

                    </Section>

                    <Section
                        title="Webhook endpoints"
                        description="Manage the endpoints that receive events from your merchant."
                    >

                        <Stack gap={4}>

                            <WebhooksToolbar
                                search={
                                    search
                                }
                                onSearchChange={
                                    setSearch
                                }
                                environment={
                                    environment
                                }
                                status={
                                    status
                                }
                                event={
                                    event as
                                        | "all"
                                        | never
                                }
                                onEnvironmentChange={
                                    setEnvironment
                                }
                                onStatusChange={
                                    setStatus
                                }
                                onEventChange={
                                    (value) =>
                                        setEvent(
                                            value,
                                        )
                                }
                                onRefresh={
                                    page.actions
                                        .refresh
                                        .run
                                }
                                refreshing={
                                    page.actions
                                        .refresh
                                        .loading
                                }
                                refreshAvailable={
                                    page.actions
                                        .refresh
                                        .available
                                }
                            />

                            <WebhooksTable
                                webhooks={
                                    visibleWebhooks
                                }
                            />

                            <WebhooksPagination
                                count={
                                    visibleWebhooks.length
                                }
                            />

                        </Stack>

                    </Section>

                    {page.table.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing webhook data...
                        </p>
                    )}

                </Stack>

            </Container>

            <CreateWebhookDialog
                open={
                    createDialogOpen
                }
                onOpenChange={
                    setCreateDialogOpen
                }
                available={
                    page.actions.create
                        .available
                }
                loading={
                    page.actions.create
                        .loading
                }
                error={
                    page.actions.create
                        .error
                }
                onCreate={
                    page.actions.create
                        .run
                }
            />

        </Page>
    );
}