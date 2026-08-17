import {
    CreditCard,
    History,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Container,
} from "@/components/layout/Container";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Page,
} from "@/components/layout/Page";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    CustomerOverviewHeader,
} from "@/components/portal/overview/CustomerOverviewHeader";

import {
    CustomerOverviewKpiCard,
} from "@/components/portal/overview/CustomerOverviewKpiCard";

import {
    CustomerSmartAccountCard,
} from "@/components/portal/overview/CustomerSmartAccountCard";

import {
    CustomerSubscriptionCard,
} from "@/components/portal/overview/CustomerSubscriptionCard";

import {
    CustomerBillingCard,
} from "@/components/portal/overview/CustomerBillingCard";

import {
    CustomerActivityCard,
} from "@/components/portal/overview/CustomerActivityCard";

import {
    CustomerAccountHealth,
} from "@/components/portal/overview/CustomerAccountHealth";

import {
    CustomerQuickActions,
} from "@/components/portal/overview/CustomerQuickActions";

export default function CustomerPortalPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <CustomerOverviewHeader />

                    <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <CustomerOverviewKpiCard
                            title="Active subscriptions"
                            value="2"
                            description="Currently active"
                            icon={CreditCard}
                        />

                        <CustomerOverviewKpiCard
                            title="Total billed"
                            value="$84"
                            description="Lifetime billing"
                            icon={History}
                        />

                        <CustomerOverviewKpiCard
                            title="Smart Account"
                            value="Active"
                            description="Operational"
                            icon={WalletCards}
                        />

                        <CustomerOverviewKpiCard
                            title="Permissions"
                            value="1"
                            description="Active billing permission"
                            icon={ShieldCheck}
                        />

                    </Grid>

                    <CustomerSmartAccountCard />

                    <Grid className="grid-cols-1 gap-4 lg:grid-cols-2">

                        <CustomerSubscriptionCard />

                        <CustomerBillingCard />

                    </Grid>

                    <Grid className="grid-cols-1 gap-4 xl:grid-cols-2">

                        <CustomerAccountHealth />

                        <CustomerActivityCard />

                    </Grid>

                    <CustomerQuickActions />

                </Stack>

            </Container>

        </Page>
    );
}