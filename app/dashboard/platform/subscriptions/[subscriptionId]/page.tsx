"use client";

import {
    useParams,
} from "next/navigation";

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
    SubscriptionDetailBreadcrumb,
} from "@/components/dashboard/platform/subscriptions/detail/SubscriptionDetailBreadcrumb";

import {
    SubscriptionDetailHeader,
} from "@/components/dashboard/platform/subscriptions/detail/SubscriptionDetailHeader";

import {
    SubscriptionOverview,
} from "@/components/dashboard/platform/subscriptions/detail/SubscriptionOverview";

import {
    SubscriptionConfiguration,
} from "@/components/dashboard/platform/subscriptions/detail/SubscriptionConfiguration";

import {
    SubscriptionBillingSummary,
} from "@/components/dashboard/platform/subscriptions/detail/SubscriptionBillingSummary";

import {
    SubscriptionActivity,
} from "@/components/dashboard/platform/subscriptions/detail/SubscriptionActivity";

import {
    SubscriptionLifecycle,
} from "@/components/dashboard/platform/subscriptions/detail/SubscriptionLifecycle";

import {
    SubscriptionDetailLoadingState,
    SubscriptionDetailNotFoundState,
    SubscriptionDetailNotExposedState,
    SubscriptionDetailErrorState,
} from "@/components/dashboard/platform/subscriptions/detail/SubscriptionDetailStates";

import {
    useMerchantSubscriptionPage,
} from "@/hooks/pages/merchant/useMerchantSubscriptionPage";

export default function SubscriptionDetailPage() {
    ////////////////////////////////////////////////////////////
    // ROUTE PARAMETER
    ////////////////////////////////////////////////////////////

    const params =
        useParams<{
            subscriptionId: string;
        }>();

    const rawSubscriptionId =
        params.subscriptionId;

    const parsedSubscriptionId =
        Number(
            rawSubscriptionId,
        );

    const subscriptionId =
        Number.isInteger(
            parsedSubscriptionId,
        )
            ? parsedSubscriptionId
            : null;

    ////////////////////////////////////////////////////////////
    // DATA
    ////////////////////////////////////////////////////////////

    const page =
        useMerchantSubscriptionPage(
            subscriptionId,
        );

    ////////////////////////////////////////////////////////////
    // INVALID / INITIAL WAIT
    ////////////////////////////////////////////////////////////

    if (
        page.status ===
            "waiting" ||
        page.status ===
            "loading"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <SubscriptionDetailLoadingState />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // ERROR
    ////////////////////////////////////////////////////////////

    if (
        page.status ===
        "error"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <SubscriptionDetailErrorState
                        error={
                            page.error ??
                            new Error(
                                "Unable to load subscription.",
                            )
                        }
                        onRetry={
                            page.refresh
                        }
                    />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // SUBSCRIPTION RESOURCE IS NOT EXPOSED YET
    //
    // Current SDK boundary:
    //
    // MerchantClient currently exposes the merchant/plans
    // resources used elsewhere in the dashboard, but the
    // subscription-detail lookup is not yet exposed.
    ////////////////////////////////////////////////////////////

    if (
        page.status ===
        "not-exposed"
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <Stack gap={8}>

                        <SubscriptionDetailBreadcrumb
                            subscriptionId={
                                subscriptionId!
                            }
                        />

                        <SubscriptionDetailNotExposedState
                            subscriptionId={
                                subscriptionId!
                            }
                        />

                    </Stack>

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // NOT FOUND
    ////////////////////////////////////////////////////////////

    if (
        page.status ===
            "not-found" ||
        !subscriptionId
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <SubscriptionDetailNotFoundState
                        subscriptionId={
                            subscriptionId!
                        }
                    />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // FUTURE READY RESOURCE BRANCH
    //
    // Once useMerchantSubscriptionPage() returns:
    //
    // {
    //     status: "ready",
    //     data: SubscriptionRecord
    // }
    //
    // the rest of this page becomes active without changing
    // the route structure or surrounding architecture.
    ////////////////////////////////////////////////////////////

    if (
        page.status ===
        "ready"
    ) {
        const subscription =
            page.data;

        ////////////////////////////////////////////////////////
        // DEFENSIVE GUARD
        ////////////////////////////////////////////////////////

        if (!subscription) {
            return (
                <Page>

                    <Container className="py-8 lg:py-10">

                        <SubscriptionDetailNotFoundState
                            subscriptionId={
                                subscriptionId
                            }
                        />

                    </Container>

                </Page>
            );
        }

        ////////////////////////////////////////////////////////
        // REAL DETAIL PAGE
        ////////////////////////////////////////////////////////

        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <Stack gap={8}>

                        <SubscriptionDetailBreadcrumb
                            subscriptionId={
                                subscription.subscriptionId
                            }
                        />

                        <SubscriptionDetailHeader
                            subscription={
                                subscription
                            }
                        />

                        <Divider />

                        <SubscriptionOverview
                            subscription={
                                subscription
                            }
                        />

                        <Section
                            title="Configuration"
                            description="The canonical plan, billing, customer, and Smart Account configuration for this subscription."
                        >

                            <SubscriptionConfiguration
                                subscription={
                                    subscription
                                }
                            />

                        </Section>

                        <Section
                            title="Billing"
                            description="Recurring billing state and payment history for this subscription."
                        >

                            <SubscriptionBillingSummary
                                subscription={
                                    subscription
                                }
                            />

                        </Section>

                        <Section
                            title="Activity"
                            description="Recent events involving this subscription."
                        >

                            <SubscriptionActivity
                                // subscription={
                                //     subscription
                                // }
                            />

                        </Section>

                        <Section
                            title="Lifecycle"
                            description="Current subscription state and lifecycle information."
                        >

                            <SubscriptionLifecycle
                                status={
                                    subscription.status
                                }
                            />

                        </Section>

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

    ////////////////////////////////////////////////////////////
    // EXHAUSTIVE FALLBACK
    //
    // Keeps the page safe if another status is introduced into
    // the hook before this component is updated.
    ////////////////////////////////////////////////////////////

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <SubscriptionDetailLoadingState />

            </Container>

        </Page>
    );
}