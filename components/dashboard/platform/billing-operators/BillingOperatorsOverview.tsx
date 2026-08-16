import {
    AlertTriangle,
    Clock3,
    ShieldCheck,
    Users,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    BillingOperatorKpiCard,
} from "./BillingOperatorKpiCard";

export function BillingOperatorsOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of the operators authorized to interact with your billing infrastructure."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <BillingOperatorKpiCard
                    title="Total operators"
                    value="5"
                    description="Configured operators"
                    icon={Users}
                />

                <BillingOperatorKpiCard
                    title="Active operators"
                    value="4"
                    description="Currently authorized"
                    icon={ShieldCheck}
                />

                <BillingOperatorKpiCard
                    title="Pending"
                    value="1"
                    description="Awaiting activation"
                    icon={Clock3}
                />

                <BillingOperatorKpiCard
                    title="Needs attention"
                    value="1"
                    description="Expired or expiring"
                    icon={AlertTriangle}
                />

            </Grid>
        </Section>
    );
}