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
    PlansOverview,
} from "@/components/dashboard/platform/plans/PlansOverview";

import {
    PlansPagination,
} from "@/components/dashboard/platform/plans/PlansPagination";

import {
    PlansTable,
} from "@/components/dashboard/platform/plans/PlansTable";

import {
    PlansToolbar,
} from "@/components/dashboard/platform/plans/PlansToolbar";

import {
    useMerchantPlansPage,
} from "@/hooks/pages/merchant/useMerchantPlansPage";

import Link from "next/link";

function PlansLoadingState() {
    return (
        <div className="space-y-4">

            {Array.from({
                length: 4,
            }).map((_, index) => (
                <div
                    key={index}
                    className="h-16 animate-pulse rounded-xl bg-muted"
                />
            ))}

        </div>
    );
}

function PlansErrorState({
    error,
    onRetry,
}: {
    error: Error;
    onRetry: () => void;
}) {
    return (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">

            <p className="font-medium">
                Unable to load plans
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
                {error.message}
            </p>

            <Button
                variant="outline"
                className="mt-4"
                onClick={onRetry}
            >
                Try again
            </Button>

        </div>
    );
}

export default function PlansPage() {
    const page =
        useMerchantPlansPage();

    ////////////////////////////////////////////////////////////
    // MERCHANT ACCOUNT STATES
    ////////////////////////////////////////////////////////////

    if (
        page.merchant.status ===
            "disconnected" ||
        page.merchant.status ===
            "waiting" ||
        page.merchant.status ===
            "loading"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <PlansLoadingState />
                </Container>
            </Page>
        );
    }

    if (
        page.merchant.status ===
        "error"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">

                    <PlansErrorState
                        error={
                            page.merchant.error ??
                            new Error(
                                "Unable to load merchant.",
                            )
                        }
                        onRetry={
                            page.merchant.refresh
                        }
                    />

                </Container>
            </Page>
        );
    }

    if (
        page.merchant.status ===
        "not-created"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">

                    <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                        <p className="text-lg font-semibold">
                            Merchant account not found
                        </p>

                        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                            The connected wallet does not currently have a merchant record.
                        </p>

                        <Button
                            className="mt-5"
                            render={
                                <Link href="/merchant/onboarding">
                                    Complete onboarding
                                </Link>
                            }
                        />

                    </div>

                </Container>
            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // PAGE
    ////////////////////////////////////////////////////////////

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Plans"
                        title="Plans"
                        description={
                            `Create and manage the billing plans ${
                                page.merchant.data?.name ??
                                "your merchant"
                            } offers to customers.`
                        }
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                    disabled
                                >
                                    Export
                                </Button>

                                <Button
                                    disabled
                                >
                                    Create plan
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    <PlansOverview
                        summary={
                            page.summary
                        }
                    />

                    <Section
                        title="Plan management"
                        description="Search, filter, and manage the plans available to your customers."
                    >

                        <Stack gap={4}>

                            <PlansToolbar
                                search={
                                    page.filters.search
                                }

                                status={
                                    page.filters.status
                                }

                                interval={
                                    page.filters.interval
                                }

                                refreshing={
                                    page.plans.refreshing
                                }

                                onSearchChange={
                                    page.filters.setSearch
                                }

                                onStatusChange={
                                    page.filters.setStatus
                                }

                                onIntervalChange={
                                    page.filters.setInterval
                                }

                                onRefresh={
                                    () =>
                                        void page.plans.refresh()
                                }
                            />

                            {page.plans.loading &&
                            page.plans.data.length ===
                                0 ? (
                                <PlansLoadingState />
                            ) : page.plans.error &&
                              page.plans.data.length ===
                                0 ? (
                                <PlansErrorState
                                    error={
                                        page.plans.error
                                    }
                                    onRetry={
                                        page.plans.refresh
                                    }
                                />
                            ) : page.plans.filteredCount ===
                              0 ? (
                                <div className="rounded-xl border border-dashed bg-card p-10 text-center">

                                    <p className="font-medium">
                                        No plans match your filters
                                    </p>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Try changing your search or filters.
                                    </p>

                                </div>
                            ) : (
                                <>
                                    <PlansTable
                                        plans={
                                            page.plans.data
                                        }
                                    />

                                    <PlansPagination
                                        total={
                                            page.plans.filteredCount
                                        }

                                        page={
                                            page.filters.page
                                        }

                                        pageSize={
                                            page.filters.pageSize
                                        }

                                        onPageChange={
                                            page.filters.setPage
                                        }
                                    />
                                </>
                            )}

                        </Stack>

                    </Section>

                    {page.plans.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing plans...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}