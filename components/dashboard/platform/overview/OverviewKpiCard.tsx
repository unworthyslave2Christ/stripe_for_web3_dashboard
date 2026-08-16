import type {
    LucideIcon,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface OverviewKpiCardProps {
    title: string;
    value: string;
    description: string;
    trend?: string;
    trendPositive?: boolean;
    icon: LucideIcon;
}

export function OverviewKpiCard({
    title,
    value,
    description,
    trend,
    trendPositive,
    icon: Icon,
}: OverviewKpiCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>

                <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                    <Icon className="size-4 text-muted-foreground" />
                </div>
            </CardHeader>

            <CardContent>

                <div className="text-2xl font-semibold tracking-tight">
                    {value}
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">

                    {trend && (
                        <span
                            className={
                                trendPositive
                                    ? "font-medium text-emerald-600 dark:text-emerald-400"
                                    : "font-medium text-red-600 dark:text-red-400"
                            }
                        >
                            {trend}
                        </span>
                    )}

                    <span>
                        {description}
                    </span>

                </div>

            </CardContent>
        </Card>
    );
}