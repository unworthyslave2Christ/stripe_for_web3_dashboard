"use client";

import {
    Inline,
} from "@/components/layout/Inline";

import {
    PageHeader,
} from "@/components/layout/PageHeader";

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
    Page,
} from "@/components/layout/Page";

import {
    Section,
} from "@/components/layout/Section";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    SubscriptionsOverview,
} from "@/components/dashboard/platform/subscriptions/SubscriptionsOverview";

import {
    SubscriptionsTable,
} from "@/components/dashboard/platform/subscriptions/SubscriptionsTable";

import {
    SubscriptionsToolbar,
} from "@/components/dashboard/platform/subscriptions/SubscriptionsToolbar";

import {
    SubscriptionsPagination,
} from "@/components/dashboard/platform/subscriptions/SubscriptionsPagination";

import {
    SubscriptionCollectionUnavailable,
} from "@/components/dashboard/platform/subscriptions/SubscriptionCollectionUnavailable";

import {
    useMerchantSubscriptionsPage,
} from "@/hooks/pages/merchant/useMerchantSubscriptionsPage";

export default function SubscriptionsPage() {
    const page =
        useMerchantSubscriptionsPage();

    const subscriptions =
        page.subscriptions;

    return (
        <Page>
            <Container className="py-8 lg:py-10">
                <Stack gap={8}>
                    <PageHeader
                        eyebrow="Subscriptions"
                        title="Subscriptions"
                        description="Monitor recurring subscriptions created against your merchant plans."
                        actions={
                            <Inline gap={2}>
                                <Button
                                    variant="outline"
                                    disabled
                                >
                                    Export
                                </Button>

                                <Button
                                    render={
                                        <a href="/dashboard/platform/plans">
                                            View plans
                                        </a>
                                    }
                                >
                                    View plans
                                </Button>
                            </Inline>
                        }
                    />

                    <Divider />

                    {page.status === "disconnected" && (
                        <SubscriptionCollectionUnavailable
                            merchantId={
                                page.merchantId
                            }
                            refreshing={
                                page.refreshing
                            }
                            onRefresh={
                                page.refresh
                            }
                        />
                    )}

                    {page.status === "waiting" && (
                        <SubscriptionCollectionUnavailable
                            merchantId={
                                page.merchantId
                            }
                            refreshing={
                                page.refreshing
                            }
                            onRefresh={
                                page.refresh
                            }
                        />
                    )}

                    {page.status === "merchant-loading" && (
                        <SubscriptionCollectionUnavailable
                            merchantId={
                                page.merchantId
                            }
                            refreshing
                            onRefresh={
                                page.refresh
                            }
                        />
                    )}

                    {page.status === "error" && (
                        <SubscriptionCollectionUnavailable
                            merchantId={
                                page.merchantId
                            }
                            refreshing={
                                page.refreshing
                            }
                            onRefresh={
                                page.refresh
                            }
                        />
                    )}

                    {page.status === "unsupported" && (
                        <>
                            <SubscriptionsOverview
                                subscriptions={
                                    subscriptions
                                }
                            />

                            <Section
                                title="Subscription management"
                                description="Search, filter, and inspect subscriptions across your merchant account."
                            >
                                <Stack gap={4}>
                                    <SubscriptionsToolbar
                                        refreshing={
                                            page.refreshing
                                        }
                                        onRefresh={
                                            page.refresh
                                        }
                                    />

                                    <SubscriptionsTable
                                        subscriptions={
                                            subscriptions
                                        }
                                    />

                                    <SubscriptionsPagination
                                        hasData={
                                            subscriptions.length >
                                            0
                                        }
                                    />
                                </Stack>
                            </Section>

                            <SubscriptionCollectionUnavailable
                                merchantId={
                                    page.merchantId
                                }
                                refreshing={
                                    page.refreshing
                                }
                                onRefresh={
                                    page.refresh
                                }
                            />
                        </>
                    )}
                </Stack>
            </Container>
        </Page>
    );
}