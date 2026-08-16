import {
    CreditCard,
    DollarSign,
    ShieldCheck,
    Users,
} from "lucide-react";

import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";

import { CustomerKpiCard } from "./CustomerKpiCard";

export function CustomersOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of customers associated with your merchant account."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <CustomerKpiCard
                    title="Total customers"
                    value="2,431"
                    description="from last month"
                    trend="+12.4%"
                    trendPositive
                    icon={Users}
                />

                <CustomerKpiCard
                    title="Active customers"
                    value="2,118"
                    description="87.1% of customers"
                    trend="+8.2%"
                    trendPositive
                    icon={ShieldCheck}
                />

                <CustomerKpiCard
                    title="Subscribed customers"
                    value="1,892"
                    description="77.8% of customers"
                    trend="+6.4%"
                    trendPositive
                    icon={CreditCard}
                />

                <CustomerKpiCard
                    title="Customer revenue"
                    value="$45,231"
                    description="this month"
                    trend="+14.8%"
                    trendPositive
                    icon={DollarSign}
                />
            </Grid>
        </Section>
    );
}