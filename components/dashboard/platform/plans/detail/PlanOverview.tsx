import {
    Calendar,
    CircleDollarSign,
    Coins,
    Network,
} from "lucide-react";

import type {
    PlanRecord,
} from "@stripe-for-web3/core";

import {
    Section,
} from "@/components/layout/Section";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    PlanOverviewCard,
} from "./PlanOverviewCard";

export function PlanOverview({
    plan,
}: {
    plan: PlanRecord;
}) {
    return (
        <Section
            title="Overview"
            description="Canonical information currently available for this plan."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <PlanOverviewCard
                    title="Price"
                    value={`${plan.amount}`}
                    // value={`${plan.currency} ${plan.amount}`}
                    description={`Per ${formatInterval(plan.billingPeriodNamed!)}`}
                    icon={CircleDollarSign}
                />

                <PlanOverviewCard
                    title="Payment token"
                    value={plan.paymentToken}
                    description="Configured settlement asset"
                    icon={Coins}
                />

                <PlanOverviewCard
                    title="Status"
                    value={plan.status}
                    description="Current plan lifecycle state"
                    icon={Network}
                />

                <PlanOverviewCard
                    title="Created"
                    value={formatDate(plan.createdAt)}
                    description="Plan creation timestamp"
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
        default:
            return "month";
    }
}

function formatDate(
    value:
        | Date
        | string
        | number,
) {
    const date =
        value instanceof Date
            ? value
            : new Date(value);

    return Number.isNaN(
        date.getTime(),
    )
        ? "—"
        : new Intl.DateTimeFormat(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            },
        ).format(date);
}