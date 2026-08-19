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
import { CustomerSubscriptionView } from "@/types/customer-subscription";

export function CustomerSubscriptionsOverview({
    active,
    recurringTotal,
    nextBilling,
    pausedOrCancelled,
    currency,
}: {
    active: number;

    recurringTotal: number;

    nextBilling:
        | CustomerSubscriptionView
        | null;

    pausedOrCancelled: number;

    currency: string;
}) {
    return (
        <Section
            title="Overview"
            description="A summary of your current subscription commitments."
        >

            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerSubscriptionOverviewCard
                    title="Active subscriptions"
                    value={
                        String(
                            active,
                        )
                    }
                    description="Currently active"
                    icon={
                        CreditCard
                    }
                />

                <CustomerSubscriptionOverviewCard
                    title="Recurring total"
                    value={
                        `${currency} ${recurringTotal.toFixed(2)}`
                    }
                    description="Current active commitments"
                    icon={
                        CircleDollarSign
                    }
                />

                <CustomerSubscriptionOverviewCard
                    title="Next billing"
                    value={
                        nextBilling
                            ?.amount ??
                        "—"
                    }
                    description={
                        nextBilling
                            ?.nextBilling
                                ? `Scheduled ${nextBilling.nextBilling}`
                                : "No scheduled charge"
                    }
                    icon={
                        CalendarClock
                    }
                />

                <CustomerSubscriptionOverviewCard
                    title="Paused / cancelled"
                    value={
                        String(
                            pausedOrCancelled,
                        )
                    }
                    description="Not currently active"
                    icon={
                        PauseCircle
                    }
                />

            </Grid>

        </Section>
    );
}