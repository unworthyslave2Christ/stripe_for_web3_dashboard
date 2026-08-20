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
    CustomerBillingHeader,
} from "@/components/portal/billing/CustomerBillingHeader";

import {
    CustomerBillingInformation,
} from "@/components/portal/billing/CustomerBillingInformation";

import {
    CustomerBillingList,
} from "@/components/portal/billing/CustomerBillingList";

import {
    CustomerBillingLoadingState,
} from "@/components/portal/billing/CustomerBillingLoadingState";

import {
    CustomerBillingOverview,
} from "@/components/portal/billing/CustomerBillingOverview";

import {
    CustomerBillingPagination,
} from "@/components/portal/billing/CustomerBillingPagination";

import {
    CustomerBillingToolbar,
} from "@/components/portal/billing/CustomerBillingToolbar";

import {
    CustomerBillingErrorState,
} from "@/components/portal/billing/CustomerBillingErrorState";

import {
    CustomerUpcomingBilling,
} from "@/components/portal/billing/CustomerUpcomingBilling";

import {
    useCustomerBillingPage,
} from "@/hooks/pages/customer/useCustomerBillingPage";

export default function CustomerBillingPage() {

    const page =
        useCustomerBillingPage();

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

                    <CustomerBillingLoadingState />

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

                    <CustomerBillingErrorState
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

    ////////////////////////////////////////////////////////////
    // DATA
    ////////////////////////////////////////////////////////////

    const currency =
        page.history.items[0]
            ?.currency ??
        "USD";

    const nextCharge =
        page.upcoming
            ? {
                amount:
                    page.upcoming.amount,

                currency:
                    page.upcoming.currency,

                date:
                    page.upcoming.date,
            }
            : null;

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerBillingHeader
                        demo={
                            page.mode ===
                            "demo"
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerBillingOverview
                        totalBilled={
                            page.summary.totalBilled
                        }

                        nextCharge={
                            nextCharge
                        }

                        successfulCharges={
                            page.summary.successfulCharges
                        }

                        refunds={
                            page.summary.refunds
                        }

                        currency={
                            currency
                        }
                    />

                    {/* UPCOMING */}

                    <Section
                        title="Upcoming billing"
                        description="Your next scheduled subscription charge."
                    >

                        <CustomerUpcomingBilling
                            upcoming={
                                page.upcoming
                            }
                        />

                    </Section>

                    {/* HISTORY */}

                    <Section
                        title="Billing history"
                        description="Charges and billing outcomes associated with your subscriptions."
                    >

                        <Stack gap={4}>

                            <CustomerBillingToolbar
                                search={
                                    page.history.search
                                }

                                onSearchChange={
                                    page.history.setSearch
                                }

                                status={
                                    page.history.status
                                }

                                onStatusChange={
                                    page.history.setStatusFilter
                                }
                            />

                            <CustomerBillingList
                                billing={
                                    page.history.items
                                }
                            />

                            <CustomerBillingPagination
                                page={
                                    page.history.page
                                }

                                totalPages={
                                    page.history.totalPages
                                }

                                totalCount={
                                    page.history.totalCount
                                }

                                pageSize={
                                    page.history.pageSize
                                }

                                onPageChange={
                                    page.history.setPage
                                }
                            />

                        </Stack>

                    </Section>

                    {/* INFORMATION */}

                    <Section
                        title="Billing information"
                        description="How your Smart Account participates in recurring billing."
                    >

                        <CustomerBillingInformation
                            smartAccount={
                                page.customer.customer
                                    ?.smartAccount
                            }

                            billingAuthorizationActive={
                                Boolean(
                                    page.upcoming
                                        ?.billingPermissionActive,
                                )
                            }

                            demo={
                                page.mode ===
                                "demo"
                            }
                        />

                    </Section>

                    {page.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing billing data...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}