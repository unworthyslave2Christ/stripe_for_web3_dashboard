import {
    CalendarClock,
    CircleDollarSign,
    PauseCircle,
    Repeat2,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    SubscriptionKpiCard,
} from "./SubscriptionKpiCard";

export function SubscriptionsOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of recurring subscription activity."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <SubscriptionKpiCard
                    title="Active subscriptions"
                    value="1,892"
                    description="Currently active"
                    trend="+8.2%"
                    icon={Repeat2}
                />

                <SubscriptionKpiCard
                    title="Monthly recurring revenue"
                    value="$45,231"
                    description="From active subscriptions"
                    trend="+14.8%"
                    icon={CircleDollarSign}
                />

                <SubscriptionKpiCard
                    title="Next billing"
                    value="$8,421"
                    description="Expected this cycle"
                    icon={CalendarClock}
                />

                <SubscriptionKpiCard
                    title="Paused / cancelled"
                    value="247"
                    description="Subscriptions not active"
                    icon={PauseCircle}
                />

            </Grid>
        </Section>
    );
}