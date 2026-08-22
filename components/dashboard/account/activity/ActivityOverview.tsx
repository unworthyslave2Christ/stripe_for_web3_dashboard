"use client";

import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import {
    Section,
} from "@/components/layout/Section";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Card,
} from "@/components/ui/card";

type ActivityOverviewProps = {
    summary: {
        events: number;
        successful: number;
        pending: number;
        errors: number;
    };
};

export function ActivityOverview({
    summary,
}: ActivityOverviewProps) {
    return (
        <Section
            title="Overview"
            description="A summary of operational events across your merchant account."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <ActivityKpiCard
                    title="Events"
                    value={formatNumber(summary.events)}
                    description="Current result set"
                    icon={Activity}
                />

                <ActivityKpiCard
                    title="Successful"
                    value={formatNumber(
                        summary.successful,
                    )}
                    description="Completed successfully"
                    icon={CheckCircle2}
                />

                <ActivityKpiCard
                    title="Pending"
                    value={formatNumber(
                        summary.pending,
                    )}
                    description="Awaiting completion"
                    icon={Clock3}
                />

                <ActivityKpiCard
                    title="Errors"
                    value={formatNumber(
                        summary.errors,
                    )}
                    description="Requiring attention"
                    icon={AlertTriangle}
                />
            </Grid>
        </Section>
    );
}

function ActivityKpiCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description: string;
    icon: typeof Activity;
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

function formatNumber(
    value: number,
) {
    return value.toLocaleString();
}