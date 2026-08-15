

import {
    ArrowLeft,
    Activity,
    CreditCard,
    Wallet,
    ShieldCheck,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

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
    Grid,
} from "@/components/layout/Grid";

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
    DashboardShell,
} from "@/components/dashboard/DashboardShell";

import {
    CustomerDetailBreadcrumb,
} from "@/components/dashboard/customers/detail/CustomerDetailBreadcrumb";

import {
    CustomerDetailHeader,
} from "@/components/dashboard/customers/detail/CustomerDetailHeader";

import {
    CustomerKpiGrid,
} from "@/components/dashboard/customers/detail/CustomerKpiGrid";

import {
    CustomerIdentityCard,
} from "@/components/dashboard/customers/detail/CustomerIdentityCard";

import {
    CustomerWalletCard,
} from "@/components/dashboard/customers/detail/CustomerWalletCard";

import {
    CustomerSmartAccountCard,
} from "@/components/dashboard/customers/detail/CustomerSmartAccountCard";

import {
    CustomerSubscriptionSummary,
} from "@/components/dashboard/customers/detail/CustomerSubscriptionSummary";

import {
    CustomerBillingSummary,
} from "@/components/dashboard/customers/detail/CustomerBillingSummary";

import {
    CustomerPermissionSummary,
} from "@/components/dashboard/customers/detail/CustomerPermissionSummary";

import {
    CustomerTransactions,
} from "@/components/dashboard/customers/detail/CustomerTransactions";

import {
    CustomerActivity,
} from "@/components/dashboard/customers/detail/CustomerActivity";

import {
    CustomerMetadata,
} from "@/components/dashboard/customers/detail/CustomerMetadata";

export default async function CustomerDetailPage({
    params,
}: {
    params: Promise<{
        customerId: string;
    }>;
}) {
    const { customerId } = await params;

    /*
     * Placeholder domain object.
     *
     * Replace this with the customer service/API later.
     */
    const customer = {
        id: customerId,
        displayName: "ACME Customer",
        status: "ACTIVE" as const,

        ownerWallet:
            "0x71bE...C6e2",

        smartAccount:
            "0xf1cc...C2347",

        createdAt:
            "June 12, 2025",

        totalBilled:
            "$1,284.00",

        activeSubscriptions:
            2,

        nextBilling:
            "Jun 12, 2025",

        permissionStatus:
            "Active",
    };

    return (

            <Page>

                <Container className="py-8 lg:py-10">

                    <Stack gap={8}>

                        {/* BREADCRUMB */}

                        <CustomerDetailBreadcrumb
                            customerName={customer.displayName}
                        />

                        {/* HEADER */}

                        <CustomerDetailHeader
                            customer={customer}
                        />

                        <Divider />

                        {/* KPI */}

                        <Section
                            title="Customer overview"
                            description="A summary of this customer's billing and account activity."
                        >

                            <CustomerKpiGrid
                                totalBilled={customer.totalBilled}
                                activeSubscriptions={
                                    customer.activeSubscriptions
                                }
                                nextBilling={
                                    customer.nextBilling
                                }
                                permissionStatus={
                                    customer.permissionStatus
                                }
                            />

                        </Section>

                        {/* ACCOUNT */}

                        <Section
                            title="Account"
                            description="Identity, wallet ownership, and smart account information."
                        >

                            <Grid className="grid-cols-1 gap-4 lg:grid-cols-3">

                                <CustomerIdentityCard
                                    customer={customer}
                                />

                                <CustomerWalletCard
                                    wallet={
                                        customer.ownerWallet
                                    }
                                />

                                <CustomerSmartAccountCard
                                    smartAccount={
                                        customer.smartAccount
                                    }
                                />

                            </Grid>

                        </Section>

                        {/* BILLING */}

                        <Section
                            title="Billing"
                            description="Subscription and billing information for this customer."
                        >

                            <Grid className="grid-cols-1 gap-4 xl:grid-cols-2">

                                <CustomerSubscriptionSummary />

                                <CustomerBillingSummary />

                            </Grid>

                        </Section>

                        {/* PERMISSIONS */}

                        <Section
                            title="Permissions"
                            description="Delegated permissions currently associated with this customer's smart account."
                        >

                            <CustomerPermissionSummary />

                        </Section>

                        {/* TRANSACTIONS */}

                        <Section
                            title="Transactions"
                            description="Recent billing and payment activity associated with this customer."
                        >

                            <CustomerTransactions />

                        </Section>

                        {/* ACTIVITY */}

                        <Section
                            title="Activity"
                            description="Recent events involving this customer."
                        >

                            <CustomerActivity />

                        </Section>

                        {/* METADATA */}

                        <Section
                            title="Metadata"
                            description="Additional information associated with this customer record."
                        >

                            <CustomerMetadata />

                        </Section>

                    </Stack>

                </Container>

            </Page>

    );
}