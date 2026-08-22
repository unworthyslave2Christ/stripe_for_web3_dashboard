"use client";

import {
    CalendarClock,
    CircleDollarSign,
    PauseCircle,
    Repeat2,
} from "lucide-react";

import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/card";

import type {
    MerchantSubscriptionRecord,
} from "@/types/merchant/subscription";

function SubscriptionKpiCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description: string;
    icon: typeof Repeat2;
}) {
    return (
        <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-semibold tracking-tight">
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

export function SubscriptionsOverview({
    subscriptions,
}: {
    subscriptions: MerchantSubscriptionRecord[];
}) {
    if (subscriptions.length === 0) {
        return (
            <Section
                title="Overview"
                description="A summary of recurring subscription activity."
            >
                <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SubscriptionKpiCard
                        title="Active subscriptions"
                        value="—"
                        description="Awaiting subscription collection"
                        icon={Repeat2}
                    />

                    <SubscriptionKpiCard
                        title="Monthly recurring revenue"
                        value="—"
                        description="Awaiting billing data"
                        icon={CircleDollarSign}
                    />

                    <SubscriptionKpiCard
                        title="Next billing"
                        value="—"
                        description="Awaiting billing schedule data"
                        icon={CalendarClock}
                    />

                    <SubscriptionKpiCard
                        title="Paused / cancelled"
                        value="—"
                        description="Awaiting subscription state data"
                        icon={PauseCircle}
                    />
                </Grid>
            </Section>
        );
    }

    const active =
        subscriptions.filter(
            (subscription) =>
                subscription.status === "ACTIVE",
        );

    const inactive =
        subscriptions.filter(
            (subscription) =>
                subscription.status === "PAUSED" ||
                subscription.status === "CANCELLED",
        );

    return (
        <Section
            title="Overview"
            description="A summary of recurring subscription activity."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SubscriptionKpiCard
                    title="Active subscriptions"
                    value={active.length.toLocaleString()}
                    description="Currently active"
                    icon={Repeat2}
                />

                <SubscriptionKpiCard
                    title="Monthly recurring revenue"
                    value="—"
                    description="Derived from canonical billing records"
                    icon={CircleDollarSign}
                />

                <SubscriptionKpiCard
                    title="Next billing"
                    value="—"
                    description="Derived from subscription schedule"
                    icon={CalendarClock}
                />

                <SubscriptionKpiCard
                    title="Paused / cancelled"
                    value={inactive.length.toLocaleString()}
                    description="Subscriptions not currently active"
                    icon={PauseCircle}
                />
            </Grid>
        </Section>
    );
}