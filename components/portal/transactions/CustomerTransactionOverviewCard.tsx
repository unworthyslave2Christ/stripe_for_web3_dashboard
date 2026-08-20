import type {
    LucideIcon,
} from "lucide-react";

import {
    Card,
} from "@/components/ui/card";

export function CustomerTransactionOverviewCard({
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