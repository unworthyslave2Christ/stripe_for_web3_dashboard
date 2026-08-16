import type {
    LucideIcon,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function PlanSubscriberMetrics({
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

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                        {value}
                    </p>

                </div>

                <Icon className="size-4 text-muted-foreground" />

            </div>

            <CardContent className="p-0 pt-3">
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            </CardContent>

        </Card>
    );
}