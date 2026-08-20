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

export function CustomerBillingOverview({
    totalBilled,
    nextCharge,
    successfulCharges,
    refunds,
    currency,
}: {
    totalBilled:
        number;

    nextCharge:
        | {
            amount: string;
            currency: string;
            date: string;
        }
        | null;

    successfulCharges:
        number;

    refunds:
        number;

    currency:
        string;
}) {
    return (
        <Section
            title="Overview"
            description="A summary of your billing activity."
        >

            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerBillingOverviewCard
                    title="Total billed"
                    value={
                        `${currency} ${totalBilled.toFixed(2)}`
                    }
                    description="Lifetime billing"
                    icon={
                        CircleDollarSign
                    }
                />

                <CustomerBillingOverviewCard
                    title="Next charge"
                    value={
                        nextCharge
                            ? `${nextCharge.currency} ${nextCharge.amount}`
                            : "—"
                    }
                    description={
                        nextCharge
                            ? `Scheduled for ${nextCharge.date}`
                            : "No upcoming charge"
                    }
                    icon={
                        CalendarClock
                    }
                />

                <CustomerBillingOverviewCard
                    title="Successful charges"
                    value={
                        successfulCharges.toLocaleString()
                    }
                    description="Completed charges"
                    icon={
                        CheckCircle2
                    }
                />

                <CustomerBillingOverviewCard
                    title="Refunds"
                    value={
                        `${currency} ${refunds.toFixed(2)}`
                    }
                    description="Recorded refunds"
                    icon={
                        RotateCcw
                    }
                />

            </Grid>

        </Section>
    );
}