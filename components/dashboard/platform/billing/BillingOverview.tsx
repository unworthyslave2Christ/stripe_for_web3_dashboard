import {
    CheckCircle2,
    CircleDollarSign,
    RotateCcw,
    XCircle,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    BillingKpiCard,
} from "./BillingKpiCard";

export function BillingOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of billing activity across your merchant account."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <BillingKpiCard
                    title="Gross billing volume"
                    value="$48,214"
                    description="this month"
                    trend="+16.4%"
                    trendPositive
                    icon={CircleDollarSign}
                />

                <BillingKpiCard
                    title="Successful billing"
                    value="$45,231"
                    description="93.8% of volume"
                    trend="+14.8%"
                    trendPositive
                    icon={CheckCircle2}
                />

                <BillingKpiCard
                    title="Failed billing"
                    value="$2,671"
                    description="requires attention"
                    trend="-2.1%"
                    trendPositive
                    icon={XCircle}
                />

                <BillingKpiCard
                    title="Refunds"
                    value="$312"
                    description="this month"
                    icon={RotateCcw}
                />

            </Grid>
        </Section>
    );
}