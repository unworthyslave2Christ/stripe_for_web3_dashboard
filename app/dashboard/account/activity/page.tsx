"use client";

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
    ActivityOverview,
} from "@/components/dashboard/account/activity/ActivityOverview";

import {
    ActivityToolbar,
} from "@/components/dashboard/account/activity/ActivityToolbar";

import {
    ActivityTable,
} from "@/components/dashboard/account/activity/ActivityTable";

import {
    ActivityTimeline,
} from "@/components/dashboard/account/activity/ActivityTimeline";

import {
    ActivityPagination,
} from "@/components/dashboard/account/activity/ActivityPagination";

import {
    useMerchantActivityPage,
} from "@/hooks/pages/merchant/useMerchantActivityPage";

export default function ActivityPage() {
    const page =
        useMerchantActivityPage();

    if (
        page.status ===
        "unsupported"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <Stack gap={8}>
                        <PageHeader
                            eyebrow="Activity"
                            title="Activity"
                            description="Review operational events across your merchant account."
                            actions={
                                <Inline gap={2}>
                                    <Button
                                        variant="outline"
                                        disabled
                                    >
                                        Export
                                    </Button>
                                </Inline>
                            }
                        />

                        <Divider />

                        <div className="rounded-xl border bg-card p-6">
                            <p className="text-sm font-medium">
                                Activity API not yet available
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                The activity interface is ready,
                                but the merchant activity operation
                                has not yet been exposed by the SDK.
                            </p>
                        </div>
                    </Stack>
                </Container>
            </Page>
        );
    }

    if (
        page.status !==
        "ready"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <div className="rounded-xl border bg-card p-6">
                        <p className="text-sm font-medium">
                            Unable to load activity
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {page.error?.message ??
                                "An unexpected error occurred."}
                        </p>

                        <Button
                            className="mt-4"
                            variant="outline"
                            onClick={() =>
                                page.actions.refresh.run()
                            }
                        >
                            Retry
                        </Button>
                    </div>
                </Container>
            </Page>
        );
    }

    return (
        <Page>
            <Container className="py-8 lg:py-10">
                <Stack gap={8}>
                    <PageHeader
                        eyebrow="Activity"
                        title="Activity"
                        description="Review the operational events occurring across your merchant, customers, billing infrastructure, integrations, and permissions."
                        actions={
                            <Inline gap={2}>
                                <Button variant="outline">
                                    Export
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        page.actions.refresh.run()
                                    }
                                    disabled={
                                        page.actions.refresh.loading ||
                                        !page.actions.refresh.available
                                    }
                                >
                                    {page.actions.refresh.loading
                                        ? "Refreshing"
                                        : "Refresh"}
                                </Button>
                            </Inline>
                        }
                    />

                    <Divider />

                    <ActivityOverview
                        summary={
                            page.summary
                        }
                    />

                    <Section
                        title="Recent timeline"
                        description="A chronological view of the latest operational events."
                    >
                        <ActivityTimeline
                            activities={
                                page.data
                            }
                        />
                    </Section>

                    <Section
                        title="Activity log"
                        description="Search and investigate events across your merchant account."
                    >
                        <Stack gap={4}>
                            <ActivityToolbar
                                search={
                                    page.filters.search
                                }
                                entity={
                                    page.filters.entity
                                }
                                severity={
                                    page.filters.severity
                                }
                                period={
                                    page.filters.period
                                }
                                onSearchChange={
                                    page.filters.setSearch
                                }
                                onEntityChange={
                                    page.filters.setEntity
                                }
                                onSeverityChange={
                                    page.filters.setSeverity
                                }
                                onPeriodChange={
                                    page.filters.setPeriod
                                }
                                onRefresh={
                                    page.actions.refresh.run
                                }
                                refreshing={
                                    page.actions.refresh.loading
                                }
                                refreshAvailable={
                                    page.actions.refresh.available
                                }
                            />

                            <ActivityTable
                                activities={
                                    page.data
                                }
                            />

                            <ActivityPagination
                                total={
                                    page.data.length
                                }
                            />
                        </Stack>
                    </Section>
                </Stack>
            </Container>
        </Page>
    );
}