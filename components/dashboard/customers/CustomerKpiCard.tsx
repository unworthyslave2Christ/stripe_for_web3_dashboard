import type {
    LucideIcon,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface CustomerKpiCardProps {
    title: string;

    value: string;

    description: string;

    icon: LucideIcon;
}

////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////

export function CustomerKpiCard({
    title,
    value,
    description,
    icon: Icon,
}: CustomerKpiCardProps) {
    return (
        <Card>

            <CardHeader>

                <div className="flex items-start justify-between gap-4">

                    <div>
                        <CardTitle>
                            {title}
                        </CardTitle>

                        <CardDescription>
                            {description}
                        </CardDescription>
                    </div>

                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-4 text-muted-foreground" />
                    </div>

                </div>

            </CardHeader>

            <CardContent>

                <div className="text-3xl font-semibold tracking-tight">
                    {value}
                </div>

            </CardContent>

        </Card>
    );
}