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
    CustomerSubscriptionGuidance,
} from "@/components/portal/subscriptions/CustomerSubscriptionGuidance";

import {
    CustomerSubscriptionsEmptyState,
} from "@/components/portal/subscriptions/CustomerSubscriptionsEmptyState";

import {
    CustomerSubscriptionsHeader,
} from "@/components/portal/subscriptions/CustomerSubscriptionsHeader";

import {
    CustomerSubscriptionsList,
} from "@/components/portal/subscriptions/CustomerSubscriptionsList";

import {
    CustomerSubscriptionsLoadingState,
} from "@/components/portal/subscriptions/CustomerSubscriptionsLoadingState";

import {
    CustomerSubscriptionsOverview,
} from "@/components/portal/subscriptions/CustomerSubscriptionsOverview";

import {
    CustomerSubscriptionsPagination,
} from "@/components/portal/subscriptions/CustomerSubscriptionsPagination";

import {
    CustomerSubscriptionsToolbar,
} from "@/components/portal/subscriptions/CustomerSubscriptionsToolbar";

import {
    useCustomerSubscriptionsPage,
} from "@/hooks/pages/customer/useCustomerSubscriptionsPage";

export default function CustomerSubscriptionsPage() {

    const page =
        useCustomerSubscriptionsPage();

    ////////////////////////////////////////////////////////////
    // LOADING
    ////////////////////////////////////////////////////////////

    if (
        page.loading &&
        page.subscriptions.subscriptions.length ===
            0
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerSubscriptionsLoadingState />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // ERROR
    ////////////////////////////////////////////////////////////

    if (
        page.error &&
        page.subscriptions.subscriptions.length ===
            0
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8">

                        <h1 className="text-lg font-semibold">
                            Unable to load subscriptions
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {page.error.message}
                        </p>

                    </div>

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // MAIN CONTENT
    ////////////////////////////////////////////////////////////

    const currency =
        page.list.items[0]
            ?.currency ??
        "USD";

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerSubscriptionsHeader
                        hasCustomer={
                            Boolean(
                                page.customer.customer,
                            )
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerSubscriptionsOverview
                        active={
                            page.summary.active
                        }

                        recurringTotal={
                            page.summary.recurringTotal
                        }

                        nextBilling={
                            page.summary.nextBilling
                        }

                        pausedOrCancelled={
                            page.summary.pausedOrCancelled
                        }

                        currency={
                            currency
                        }
                    />

                    {/* SUBSCRIPTIONS */}

                    <Section
                        title="My subscriptions"
                        description="Subscriptions associated with your Smart Account."
                    >

                        <Stack gap={4}>

                            <CustomerSubscriptionsToolbar
                                search={
                                    page.list.search
                                }

                                onSearchChange={
                                    page.list.setSearch
                                }

                                status={
                                    page.list.statusFilter
                                }

                                onStatusChange={
                                    page.list.setStatusFilter
                                }
                            />

                            <CustomerSubscriptionsList
                                subscriptions={
                                    page.list.items
                                }

                                onPause={
                                    page.actions.pause
                                }

                                onResume={
                                    page.actions.resume
                                }

                                onCancel={
                                    page.actions.cancel
                                }

                                loading={
                                    page.actions.pauseLoading ||
                                    page.actions.resumeLoading ||
                                    page.actions.cancelLoading
                                }
                            />

                            {page.list.totalCount >
                                0 && (
                                <CustomerSubscriptionsPagination
                                    page={
                                        page.list.page
                                    }

                                    totalPages={
                                        page.list.totalPages
                                    }

                                    totalCount={
                                        page.list.filteredCount
                                    }

                                    pageSize={
                                        page.list.pageSize
                                    }

                                    onPageChange={
                                        page.list.setPage
                                    }
                                />
                            )}

                        </Stack>

                    </Section>

                    {/* GUIDANCE */}

                    <Section
                        title="Subscription guidance"
                        description="Important information about how subscriptions work with your Smart Account."
                    >

                        <CustomerSubscriptionGuidance />

                    </Section>

                    {/* REFRESHING */}

                    {page.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing subscription data...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}