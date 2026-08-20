import {
    CreditCard,
    ShieldCheck,
    Users,
    WalletCards,
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

export function CustomersOverview({
    total,
}: {
    total: number;
}) {
    return (
        <Section
            title="Overview"
            description="A summary of customer records currently available to this dashboard."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerKpiCard
                    title="Customers"
                    value={
                        total.toLocaleString()
                    }
                    description="Currently available to this page"
                    icon={Users}
                />

                <CustomerKpiCard
                    title="Active"
                    value="—"
                    description="Awaiting merchant customer-list API"
                    icon={ShieldCheck}
                />

                <CustomerKpiCard
                    title="Subscriptions"
                    value="—"
                    description="Awaiting customer aggregation"
                    icon={CreditCard}
                />

                <CustomerKpiCard
                    title="Revenue"
                    value="—"
                    description="Awaiting billing aggregation"
                    icon={WalletCards}
                />

            </Grid>
        </Section>
    );
}