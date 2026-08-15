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
    DashboardShell,
} from "@/components/dashboard/DashboardShell";

import {
    SubscriptionDetailBreadcrumb,
} from "@/components/dashboard/subscriptions/detail/SubscriptionDetailBreadcrumb";

import {
    SubscriptionDetailHeader,
} from "@/components/dashboard/subscriptions/detail/SubscriptionDetailHeader";

import {
    SubscriptionOverview,
} from "@/components/dashboard/subscriptions/detail/SubscriptionOverview";

import {
    SubscriptionCustomerCard,
} from "@/components/dashboard/subscriptions/detail/SubscriptionCustomerCard";

import {
    SubscriptionPlanCard,
} from "@/components/dashboard/subscriptions/detail/SubscriptionPlanCard";

import {
    SubscriptionPermissionCard,
} from "@/components/dashboard/subscriptions/detail/SubscriptionPermissionCard";

import {
    SubscriptionBillingSummary,
} from "@/components/dashboard/subscriptions/detail/SubscriptionBillingSummary";

import {
    SubscriptionBillingHistory,
} from "@/components/dashboard/subscriptions/detail/SubscriptionBillingHistory";

import {
    SubscriptionLifecycle,
} from "@/components/dashboard/subscriptions/detail/SubscriptionLifecycle";

import {
    SubscriptionActivity,
} from "@/components/dashboard/subscriptions/detail/SubscriptionActivity";

export default async function SubscriptionDetailPage({
    params,
}: {
    params: Promise<{
        subscriptionId: string;
    }>;
}) {
    const { subscriptionId } = await params;

    /*
     * PLACEHOLDER
     *
     * Replace with the real subscription lookup later.
     */
    const subscription = {
        id: `sub_${subscriptionId}`,
        subscriptionId: Number(subscriptionId),

        customerId: "cus_8F42A91",
        customerName: "Alex Johnson",

        customerWallet:
            "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",

        smartAccount:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",

        planId: 90,
        planName: "Pro",

        amount: "19",
        currency: "USD",
        interval: "MONTH" as const,

        status: "ACTIVE" as const,

        nextBilling: "Jun 12, 2025",
        createdAt: "May 12, 2025",

        totalBilled: "$76.00",

        successfulPayments: 4,
        failedPayments: 0,

        permissionId: "perm_8F42A91",
    };

    return (
        <DashboardShell>
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
                            title="Customer & plan"
                            description="The customer and billing plan associated with this subscription."
                        >

                            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

                                <SubscriptionCustomerCard
                                    subscription={
                                        subscription
                                    }
                                />

                                <SubscriptionPlanCard
                                    subscription={
                                        subscription
                                    }
                                />

                            </div>

                        </Section>

                        <Section
                            title="Smart account"
                            description="Account Abstraction and delegated billing authorization for this subscription."
                        >

                            <SubscriptionPermissionCard
                                subscription={
                                    subscription
                                }
                            />

                        </Section>

                        <Section
                            title="Billing"
                            description="Payment performance and billing history for this subscription."
                        >

                            <Stack gap={4}>

                                <SubscriptionBillingSummary
                                    subscription={
                                        subscription
                                    }
                                />

                                <SubscriptionBillingHistory />

                            </Stack>

                        </Section>

                        <Section
                            title="Lifecycle"
                            description="The current state and available subscription lifecycle transitions."
                        >

                            <SubscriptionLifecycle
                                status={
                                    subscription.status
                                }
                            />

                        </Section>

                        <Section
                            title="Activity"
                            description="Recent events associated with this subscription."
                        >

                            <SubscriptionActivity />

                        </Section>

                    </Stack>

                </Container>

            </Page>
        </DashboardShell>
    );
}