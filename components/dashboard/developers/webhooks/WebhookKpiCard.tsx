import type {
    LucideIcon,
} from "lucide-react";

import {
    Card,
} from "@/components/ui/card";

interface WebhookKpiCardProps {
    title: string;

    value: string;

    description: string;

    icon: LucideIcon;

    trend?: string;

    trendPositive?: boolean;
}

export function WebhookKpiCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    trendPositive,
}: WebhookKpiCardProps) {
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
                    <span
                        className={
                            trendPositive
                                ? "font-medium text-emerald-600 dark:text-emerald-400"
                                : "font-medium text-destructive"
                        }
                    >
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