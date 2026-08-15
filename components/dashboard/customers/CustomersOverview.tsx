import {
    Users,
    UserCheck,
    WalletCards,
    CreditCard,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    CustomerKpiCard,
} from "./CustomerKpiCard";

////////////////////////////////////////////////////////////
// CUSTOMER OVERVIEW
////////////////////////////////////////////////////////////

export function CustomersOverview() {
    return (
        <Section
            title="Customer overview"
            description="A real-time summary of your customer base."
        >

            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerKpiCard
                    title="Customers"
                    value="2,431"
                    description="Registered customers"
                    icon={Users}
                />

                <CustomerKpiCard
                    title="Active customers"
                    value="2,184"
                    description="Currently active"
                    icon={UserCheck}
                />

                <CustomerKpiCard
                    title="Smart accounts"
                    value="2,017"
                    description="Customer smart accounts"
                    icon={WalletCards}
                />

                <CustomerKpiCard
                    title="Subscribed customers"
                    value="1,892"
                    description="Customers with subscriptions"
                    icon={CreditCard}
                />

            </Grid>

        </Section>
    );
}