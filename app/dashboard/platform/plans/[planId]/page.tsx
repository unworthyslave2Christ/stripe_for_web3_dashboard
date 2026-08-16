import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Page } from "@/components/layout/Page";
import { Stack } from "@/components/layout/Stack";
import { Section } from "@/components/layout/Section";


import { PlanDetailBreadcrumb } from "@/components/dashboard/platform/plans/detail/PlanDetailBreadcrumb";
import { PlanDetailHeader } from "@/components/dashboard/platform/plans/detail/PlanDetailHeader";
import { PlanOverview } from "@/components/dashboard/platform/plans/detail/PlanOverview";
import { PlanConfiguration } from "@/components/dashboard/platform/plans/detail/PlanConfiguration";
import { PlanSubscriberSummary } from "@/components/dashboard/platform/plans/detail/PlanSubscriberSummary";
import { PlanRevenueSummary } from "@/components/dashboard/platform/plans/detail/PlanRevenueSummary";
import { PlanSubscriptionActivity } from "@/components/dashboard/platform/plans/detail/PlanSubscriptionActivity";
import { PlanLifecycle } from "@/components/dashboard/platform/plans/detail/PlanLifecycle";

export default async function PlanDetailPage({
    params,
}: {
    params: Promise<{
        planId: string;
    }>;
}) {
    const { planId } = await params;

    /*
     * PLACEHOLDER DOMAIN DATA
     *
     * Replace with the actual plan repository/API later.
     */
    const plan = {
        id: planId,
        planId: 90,
        name: "Pro",
        description:
            "For growing teams that need more.",
        amount: "19",
        currency: "USD",
        billingInterval: "MONTH" as const,
        merchantId: 12,
        paymentToken: "USDC",
        paymentTokenAddress:
            "0xA0b8...eB48",
        status: "ACTIVE" as const,
        activeSubscribers: 736,
        totalSubscribers: 889,
        cancelledSubscriptions: 31,
        monthlyRevenue: "$13,984",
        lifetimeRevenue: "$92,410",
        createdAt: "June 04, 2025",
    };

    return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <Stack gap={8}>

                        <PlanDetailBreadcrumb
                            planName={plan.name}
                        />

                        <PlanDetailHeader
                            plan={plan}
                        />

                        <Divider />

                        <PlanOverview
                            plan={plan}
                        />

                        <Section
                            title="Configuration"
                            description="The billing and payment configuration for this plan."
                        >
                            <PlanConfiguration
                                plan={plan}
                            />
                        </Section>

                        <Section
                            title="Subscribers"
                            description="Understand how customers are using this plan."
                        >
                            <PlanSubscriberSummary
                                plan={plan}
                            />
                        </Section>

                        <Section
                            title="Revenue"
                            description="Revenue generated through subscriptions to this plan."
                        >
                            <PlanRevenueSummary
                                plan={plan}
                            />
                        </Section>

                        <Section
                            title="Subscription activity"
                            description="Recent subscription events involving this plan."
                        >
                            <PlanSubscriptionActivity />
                        </Section>

                        <Section
                            title="Plan lifecycle"
                            description="Current state and administrative lifecycle controls."
                        >
                            <PlanLifecycle
                                status={plan.status}
                            />
                        </Section>

                    </Stack>

                </Container>

            </Page>
    );
}