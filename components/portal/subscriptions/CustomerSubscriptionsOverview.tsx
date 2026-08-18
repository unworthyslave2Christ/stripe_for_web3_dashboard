import {
    CalendarClock,
    CircleDollarSign,
    CreditCard,
    PauseCircle,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    CustomerSubscriptionOverviewCard,
} from "./CustomerSubscriptionOverviewCard";

export function CustomerSubscriptionsOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of your current subscription commitments."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerSubscriptionOverviewCard
                    title="Active subscriptions"
                    value="2"
                    description="Currently active"
                    icon={CreditCard}
                />

                <CustomerSubscriptionOverviewCard
                    title="Recurring total"
                    value="$28"
                    description="Per month"
                    icon={CircleDollarSign}
                />

                <CustomerSubscriptionOverviewCard
                    title="Next billing"
                    value="$19"
                    description="Next scheduled charge"
                    icon={CalendarClock}
                />

                <CustomerSubscriptionOverviewCard
                    title="Paused / cancelled"
                    value="1"
                    description="Not currently active"
                    icon={PauseCircle}
                />

            </Grid>
        </Section>
    );
}