import {
    Bell,
    CheckCircle2,
    Send,
    AlertTriangle,
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

type NotificationKpiCardProps = {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    trend?: string;
};

function NotificationKpiCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
}: NotificationKpiCardProps) {
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

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                {trend && (
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {trend}
                    </span>
                )}

                <span className="text-muted-foreground">
                    {description}
                </span>
            </div>
        </Card>
    );
}

export function NotificationsOverview({
    total,
    active,
    sent,
    successRate,
    needsAttention,
}: {
    total: number;
    active: number;
    sent: number;
    successRate: number;
    needsAttention: number;
}) {
    return (
        <Section
            title="Overview"
            description="A summary of the notification policies configured for your merchant."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <NotificationKpiCard
                    title="Notification policies"
                    value={String(total)}
                    description="Configured policies"
                    icon={Bell}
                />

                <NotificationKpiCard
                    title="Active policies"
                    value={String(active)}
                    description="Currently enabled"
                    icon={Send}
                />

                <NotificationKpiCard
                    title="Delivery success"
                    value={`${successRate}%`}
                    description="Current aggregate rate"
                    icon={CheckCircle2}
                />

                <NotificationKpiCard
                    title="Needs attention"
                    value={String(needsAttention)}
                    description="Failed delivery policies"
                    icon={AlertTriangle}
                />
            </Grid>
        </Section>
    );
}