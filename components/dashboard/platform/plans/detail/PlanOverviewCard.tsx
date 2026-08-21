import {
    Calendar,
    CircleDollarSign,
    Coins,
    LucideIcon,
    Store,
} from "lucide-react";

import type {
    BillingPeriodNamed,
    PlanRecord,
} from "@stripe-for-web3/core";

import {
    Card,
} from "@/components/ui/card";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    formatDate,
} from "./planDetailFormatters";

function formatInterval(
    interval: PlanRecord["billingPeriodNamed"],
) {
    switch (interval as string) {
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

function PlanOverviewCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
}) {
    return (
        <Card className="p-5">

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 truncate text-2xl font-semibold tracking-tight">
                        {value}
                    </p>

                </div>

                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                    <Icon className="size-4 text-muted-foreground" />
                </div>

            </div>

            <p className="mt-4 text-xs text-muted-foreground">
                {description}
            </p>

        </Card>
    );
}

export function PlanOverview({
    plan,
}: {
    plan: PlanRecord;
}) {
    return (
        <Section
            title="Overview"
            description="Current configuration for this billing plan."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <PlanOverviewCard
                    title="Price"
                    // value={`${plan.currency} ${plan.amount}`}
                    value={`${plan.amount}`}
                    description={`Per ${formatInterval(plan.billingPeriodNamed as BillingPeriodNamed)}`}
                    icon={CircleDollarSign}
                />

                <PlanOverviewCard
                    title="Payment token"
                    value={plan.paymentToken}
                    description="Configured billing asset"
                    icon={Coins}
                />

                <PlanOverviewCard
                    title="Merchant"
                    value={String(plan.merchantId)}
                    description="Owning merchant"
                    icon={Store}
                />

                <PlanOverviewCard
                    title="Created"
                    value={formatDate(plan.createdAt)}
                    description="Plan creation date"
                    icon={Calendar}
                />

            </Grid>
        </Section>
    );
}