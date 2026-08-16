import {
    Calendar,
    CircleDollarSign,
    CreditCard,
    Users,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    PlanOverviewCard,
} from "./PlanOverviewCard";

export function PlanOverview({
    plan,
}: {
    plan: {
        amount: string;
        currency: string;
        billingInterval: string;
        activeSubscribers: number;
        monthlyRevenue: string;
        createdAt: string;
    };
}) {
    return (
        <Section
            title="Overview"
            description="A real-time summary of this plan."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <PlanOverviewCard
                    title="Price"
                    value={`${plan.currency} ${plan.amount}`}
                    description={`per ${formatInterval(plan.billingInterval)}`}
                    icon={CircleDollarSign}
                />

                <PlanOverviewCard
                    title="Active subscribers"
                    value={String(plan.activeSubscribers)}
                    description="Currently subscribed"
                    icon={Users}
                />

                <PlanOverviewCard
                    title="Monthly revenue"
                    value={plan.monthlyRevenue}
                    description="Generated this month"
                    icon={CreditCard}
                />

                <PlanOverviewCard
                    title="Created"
                    value={plan.createdAt}
                    description="Plan creation date"
                    icon={Calendar}
                />

            </Grid>
        </Section>
    );
}

function formatInterval(
    interval: string,
) {
    switch (interval) {
        case "DAY":
            return "day";

        case "WEEK":
            return "week";

        case "YEAR":
            return "year";

        case "MONTH":
        default:
            return "month";
    }
}