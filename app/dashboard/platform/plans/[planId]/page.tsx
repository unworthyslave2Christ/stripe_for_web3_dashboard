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
    Stack,
} from "@/components/layout/Stack";

import {
    Section,
} from "@/components/layout/Section";

import {
    PlanDetailBreadcrumb,
} from "@/components/dashboard/platform/plans/detail/PlanDetailBreadcrumb";

import {
    PlanDetailHeader,
} from "@/components/dashboard/platform/plans/detail/PlanDetailHeader";

import {
    PlanOverview,
} from "@/components/dashboard/platform/plans/detail/PlanOverview";

import {
    PlanConfiguration,
} from "@/components/dashboard/platform/plans/detail/PlanConfiguration";

import {
    PlanLifecycle,
} from "@/components/dashboard/platform/plans/detail/PlanLifecycle";

import {
    PlanAnalyticsSections,
} from "@/components/dashboard/platform/plans/detail/PlanAnalyticsSections";

import {
    PlanDetailLoadingState,
    PlanDetailNotFoundState,
    PlanDetailErrorState,
} from "@/components/dashboard/platform/plans/detail/PlanDetailStates";

import {
    useMerchantPlanPage,
} from "@/hooks/pages/merchant/useMerchantPlanPage";

export default function PlanDetailPage() {
    const params =
        useParams<{
            planId: string;
        }>();

    const parsedPlanId =
        Number(
            params.planId,
        );

    const planId =
        Number.isInteger(
            parsedPlanId,
        )
            ? parsedPlanId
            : null;

    const page =
        useMerchantPlanPage(
            planId,
        );

    /*
     * Keep the resource shape consistent with the
     * rest of the merchant dashboard hooks.
     */
    const plan =
        page.plan;

    /*
     * Invalid route parameter.
     */
    if (
        planId === null
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <PlanDetailNotFoundState
                        planId={parsedPlanId}
                    />
                </Container>
            </Page>
        );
    }

    /*
     * Merchant / SDK resource is still being prepared.
     */
    if (
        plan.status === "waiting" ||
        plan.status === "loading"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <PlanDetailLoadingState />
                </Container>
            </Page>
        );
    }

    /*
     * SDK/API failure.
     */
    if (
        plan.status === "error"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <PlanDetailErrorState
                        error={
                            plan.error ??
                            new Error(
                                "Unable to load plan.",
                            )
                        }
                        onRetry={
                            plan.refresh
                        }
                    />
                </Container>
            </Page>
        );
    }

    /*
     * The SDK/API responded successfully but no
     * plan exists for this planId.
     */
    if (
        plan.status === "not-found" ||
        !plan.data
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <PlanDetailNotFoundState
                        planId={planId}
                    />
                </Container>
            </Page>
        );
    }

    /*
     * Canonical PlanRecord returned by the merchant SDK.
     */
    const record =
        plan.data;

    return (
        <Page>
            <Container className="py-8 lg:py-10">
                <Stack gap={8}>

                    {/* BREADCRUMB */}

                    <PlanDetailBreadcrumb
                        planName={
                            record.name
                        }
                    />

                    {/* HEADER */}

                    <PlanDetailHeader
                        plan={
                            record
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <PlanOverview
                        plan={
                            record
                        }
                    />

                    {/* CONFIGURATION */}

                    <Section
                        title="Configuration"
                        description="The canonical billing and payment configuration returned by the merchant API."
                    >
                        <PlanConfiguration
                            plan={
                                record
                            }
                        />
                    </Section>

                    {/* FUTURE ANALYTICS */}

                    <PlanAnalyticsSections />

                    {/* LIFECYCLE */}

                    <Section
                        title="Plan lifecycle"
                        description="Current lifecycle state of this plan."
                    >
                        <PlanLifecycle
                            status={
                                record.status
                            }
                        />
                    </Section>

                    {/* REFRESH STATUS */}

                    {plan.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing plan data...
                        </p>
                    )}

                </Stack>
            </Container>
        </Page>
    );
}