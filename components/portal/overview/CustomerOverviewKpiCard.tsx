import type {
    LucideIcon,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function CustomerOverviewKpiCard({
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
        <Card>

            <CardContent className="p-5">

                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                        <p className="text-sm text-muted-foreground">
                            {title}
                        </p>

                        <p className="mt-2 text-2xl font-semibold tracking-tight">
                            {value}
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                            {description}
                        </p>

                    </div>

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">

                        <Icon className="size-4 text-muted-foreground" />

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}