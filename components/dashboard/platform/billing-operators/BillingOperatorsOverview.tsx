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

export function BillingOperatorsOverview({
    available,
}: {
    available: boolean;
}) {
    const value =
        available
            ? "—"
            : "—";

    return (
        <Section
            title="Overview"
            description="A summary of the operators authorized to interact with your billing infrastructure."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <BillingOperatorKpiCard
                    title="Total operators"
                    value={value}
                    description={
                        available
                            ? "Operator count"
                            : "Awaiting operator API"
                    }
                    icon={Users}
                />

                <BillingOperatorKpiCard
                    title="Active operators"
                    value={value}
                    description={
                        available
                            ? "Currently authorized"
                            : "Awaiting operator API"
                    }
                    icon={ShieldCheck}
                />

                <BillingOperatorKpiCard
                    title="Pending"
                    value={value}
                    description={
                        available
                            ? "Awaiting activation"
                            : "Awaiting operator API"
                    }
                    icon={Clock3}
                />

                <BillingOperatorKpiCard
                    title="Needs attention"
                    value={value}
                    description={
                        available
                            ? "Expired or expiring"
                            : "Awaiting operator API"
                    }
                    icon={AlertTriangle}
                />

            </Grid>
        </Section>
    );
}