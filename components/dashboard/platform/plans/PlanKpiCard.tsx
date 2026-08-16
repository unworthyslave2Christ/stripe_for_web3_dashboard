import type {
    LucideIcon,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

interface PlanKpiCardProps {
    title: string;

    value: string;

    description: string;

    icon: LucideIcon;
}

export function PlanKpiCard({
    title,
    value,
    description,
    icon: Icon,
}: PlanKpiCardProps) {
    return (
        <Card className="p-5">

            <div className="flex items-start justify-between gap-4">

                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                        {value}
                    </p>
                </div>

                <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/40">
                    <Icon className="size-4 text-muted-foreground" />
                </div>

            </div>

            <p className="mt-4 text-xs text-muted-foreground">
                {description}
            </p>

        </Card>
    );
}