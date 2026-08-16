import {
    CalendarClock,
    CircleDollarSign,
    CreditCard,
    Repeat2,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    SubscriptionOverviewCard,
} from "./SubscriptionOverviewCard";

interface SubscriptionOverviewProps {
    subscription: {
        amount: string;
        currency: string;
        interval: string;
        nextBilling: string;
        totalBilled: string;
    };
}

export function SubscriptionOverview({
    subscription,
}: SubscriptionOverviewProps) {
    return (
        <Section
            title="Overview"
            description="A summary of this subscription."
        >

            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <SubscriptionOverviewCard
                    title="Recurring amount"
                    value={`${subscription.currency} ${subscription.amount}`}
                    description={`per ${formatInterval(subscription.interval)}`}
                    icon={CircleDollarSign}
                />

                <SubscriptionOverviewCard
                    title="Next billing"
                    value={subscription.nextBilling}
                    description="Scheduled billing date"
                    icon={CalendarClock}
                />

                <SubscriptionOverviewCard
                    title="Total billed"
                    value={subscription.totalBilled}
                    description="Lifetime subscription revenue"
                    icon={CreditCard}
                />

                <SubscriptionOverviewCard
                    title="Billing cycle"
                    value={formatInterval(subscription.interval)}
                    description="Current recurring interval"
                    icon={Repeat2}
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
            return "Daily";

        case "WEEK":
            return "Weekly";

        case "YEAR":
            return "Yearly";

        default:
            return "Monthly";
    }
}