import type {
    LucideIcon,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerKpiCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description?: string;
    icon: LucideIcon;
}) {
    return (
        <Card>

            <CardHeader className="flex flex-row items-center justify-between">

                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>

                <Icon className="size-4 text-muted-foreground" />

            </CardHeader>

            <CardContent>

                <div className="text-2xl font-semibold tracking-tight">
                    {value}
                </div>

                {description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                )}

            </CardContent>

        </Card>
    );
}