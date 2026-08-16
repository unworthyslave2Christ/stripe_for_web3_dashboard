import {
    CheckCircle2,
    CirclePause,
    Archive,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type {
    PlanStatus,
} from "../plan.types";

export function PlanLifecycle({
    status,
}: {
    status: PlanStatus;
}) {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Lifecycle
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                    <LifecycleStep
                        label="Active"
                        description="Plan available for new subscriptions."
                        active={status === "ACTIVE"}
                        icon={CheckCircle2}
                    />

                    <LifecycleStep
                        label="Paused"
                        description="Plan temporarily unavailable for new subscriptions."
                        active={status === "PAUSED"}
                        icon={CirclePause}
                    />

                    <LifecycleStep
                        label="Archived"
                        description="Plan permanently removed from normal offerings."
                        active={status === "ARCHIVED"}
                        icon={Archive}
                    />

                </div>

            </CardContent>

        </Card>
    );
}

function LifecycleStep({
    label,
    description,
    active,
    icon: Icon,
}: {
    label: string;
    description: string;
    active: boolean;
    icon: typeof CheckCircle2;
}) {
    return (
        <div
            className={[
                "rounded-lg border p-4 transition-colors",
                active
                    ? "border-primary/40 bg-primary/5"
                    : "bg-muted/20",
            ].join(" ")}
        >

            <div className="flex items-center justify-between gap-3">

                <Icon
                    className={
                        active
                            ? "size-5 text-primary"
                            : "size-5 text-muted-foreground"
                    }
                />

                {active && (
                    <Badge>
                        Current
                    </Badge>
                )}

            </div>

            <p className="mt-3 text-sm font-medium">
                {label}
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {description}
            </p>

        </div>
    );
}