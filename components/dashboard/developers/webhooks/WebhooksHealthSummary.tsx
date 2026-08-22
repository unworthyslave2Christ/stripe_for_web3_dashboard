"use client";

import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Badge,
} from "@/components/ui/badge";

export function WebhooksHealthSummary({
    total,
    active,
    failing,
    successRate,
}: {
    total: number;

    active: number;

    failing: number;

    successRate: number;
}) {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Endpoint health
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

                <HealthRow
                    icon={CheckCircle2}
                    title="Healthy endpoints"
                    value={String(active)}
                    description="Receiving events normally"
                />

                <HealthRow
                    icon={Clock3}
                    title="Configured endpoints"
                    value={String(total)}
                    description="Known to this merchant workspace"
                />

                <HealthRow
                    icon={AlertTriangle}
                    title="Failing endpoints"
                    value={String(failing)}
                    description="Requires investigation"
                />

                <div className="rounded-lg border bg-muted/30 p-4">

                    <div className="flex items-center justify-between gap-3">

                        <div>

                            <p className="text-xs text-muted-foreground">
                                Delivery success
                            </p>

                            <p className="mt-1 text-2xl font-semibold">
                                {successRate}%
                            </p>

                        </div>

                        <Badge
                            variant={
                                failing === 0
                                    ? "secondary"
                                    : "outline"
                            }
                        >
                            {failing === 0
                                ? "Healthy"
                                : "Needs attention"}
                        </Badge>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}

function HealthRow({
    icon: Icon,
    title,
    value,
    description,
}: {
    icon: typeof CheckCircle2;

    title: string;

    value: string;

    description: string;
}) {
    return (
        <div className="flex items-start gap-3">

            <Icon className="mt-0.5 size-4 text-muted-foreground" />

            <div className="flex-1">

                <div className="flex items-center justify-between gap-4">

                    <p className="text-sm font-medium">
                        {title}
                    </p>

                    <p className="text-sm font-semibold">
                        {value}
                    </p>

                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                    {description}
                </p>

            </div>

        </div>
    );
}