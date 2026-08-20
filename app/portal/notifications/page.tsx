"use client";

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
    CustomerNotificationChannels,
} from "@/components/portal/notifications/CustomerNotificationChannels";

import {
    CustomerNotificationPreferences,
} from "@/components/portal/notifications/CustomerNotificationPreferences";

import {
    CustomerNotificationsErrorState,
} from "@/components/portal/notifications/CustomerNotificationsErrorState";

import {
    CustomerNotificationsHeader,
} from "@/components/portal/notifications/CustomerNotificationsHeader";

import {
    CustomerNotificationList,
} from "@/components/portal/notifications/CustomerNotificationList";

import {
    CustomerNotificationsLoadingState,
} from "@/components/portal/notifications/CustomerNotificationsLoadingState";

import {
    CustomerNotificationsOverview,
} from "@/components/portal/notifications/CustomerNotificationsOverview";

import {
    CustomerNotificationsPagination,
} from "@/components/portal/notifications/CustomerNotificationsPagination";

import {
    CustomerNotificationsToolbar,
} from "@/components/portal/notifications/CustomerNotificationsToolbar";

import {
    useCustomerNotificationsPage,
} from "@/hooks/pages/customer/useCustomerNotificationsPage";

export default function CustomerNotificationsPage() {

    const page =
        useCustomerNotificationsPage();

    ////////////////////////////////////////////////////////////
    // LOADING
    ////////////////////////////////////////////////////////////

    if (
        page.loading &&
        !page.customer.customer
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerNotificationsLoadingState />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // ERROR
    ////////////////////////////////////////////////////////////

    if (
        page.error &&
        !page.customer.customer
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerNotificationsErrorState
                        error={
                            page.error
                        }
                        onRetry={
                            page.customer.refresh
                        }
                    />

                </Container>

            </Page>
        );
    }

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerNotificationsHeader
                        demo={
                            page.mode ===
                            "demo"
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerNotificationsOverview
                        received={
                            page.notifications.summary.received
                        }

                        deliverySuccess={
                            page.notifications.summary.deliverySuccess
                        }

                        activeChannels={
                            page.channels.filter(
                                (
                                    channel,
                                ) =>
                                    channel.status ===
                                    "ACTIVE",
                            ).length
                        }

                        unread={
                            page.notifications.summary.unread
                        }
                    />

                    {/* PREFERENCES */}

                    <Section
                        title="Notification preferences"
                        description="Choose which customer notifications you want to receive."
                    >

                        <CustomerNotificationPreferences
                            grouped={
                                page.preferences.grouped
                            }

                            onChange={
                                page.preferences.setEnabled
                            }

                            demo={
                                page.mode ===
                                "demo"
                            }
                        />

                    </Section>

                    {/* CHANNELS */}

                    <CustomerNotificationChannels
                        channels={
                            page.channels
                        }
                    />

                    {/* RECENT NOTIFICATIONS */}

                    <Section
                        title="Recent notifications"
                        description="Review notifications recently delivered to your account."
                    >

                        <Stack gap={4}>

                            <CustomerNotificationsToolbar
                                search={
                                    page.notifications.search
                                }

                                onSearchChange={
                                    page.notifications.setSearch
                                }

                                type={
                                    page.notifications.type
                                }

                                onTypeChange={
                                    page.notifications.setTypeFilter
                                }

                                status={
                                    page.notifications.status
                                }

                                onStatusChange={
                                    page.notifications.setStatusFilter
                                }
                            />

                            <CustomerNotificationList
                                notifications={
                                    page.notifications.items
                                }

                                onMarkRead={
                                    page.notifications.markAsRead
                                }
                            />

                            <CustomerNotificationsPagination
                                page={
                                    page.notifications.page
                                }

                                totalPages={
                                    page.notifications.totalPages
                                }

                                totalCount={
                                    page.notifications.totalCount
                                }

                                pageSize={
                                    page.notifications.pageSize
                                }

                                onPageChange={
                                    page.notifications.setPage
                                }
                            />

                        </Stack>

                    </Section>

                    {page.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing notifications...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}