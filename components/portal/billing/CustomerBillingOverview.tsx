import {
    CalendarClock,
    CheckCircle2,
    CircleDollarSign,
    RotateCcw,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    CustomerBillingOverviewCard,
} from "./CustomerBillingOverviewCard";

export function CustomerBillingOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of your billing activity."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerBillingOverviewCard
                    title="Total billed"
                    value="$84.00"
                    description="Lifetime billing"
                    icon={CircleDollarSign}
                />

                <CustomerBillingOverviewCard
                    title="Next charge"
                    value="$19.00"
                    description="Scheduled for Jun 12"
                    icon={CalendarClock}
                />

                <CustomerBillingOverviewCard
                    title="Successful charges"
                    value="6"
                    description="All completed charges"
                    icon={CheckCircle2}
                />

                <CustomerBillingOverviewCard
                    title="Refunds"
                    value="$0.00"
                    description="Lifetime refunds"
                    icon={RotateCcw}
                />

            </Grid>
        </Section>
    );
}