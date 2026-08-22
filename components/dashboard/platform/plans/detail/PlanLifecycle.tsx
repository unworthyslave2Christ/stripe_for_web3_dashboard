import {
    Archive,
    CheckCircle2,
    CirclePause,
} from "lucide-react";

import type {
    PlanRecord,
} from "@stripe-for-web3/core";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function PlanLifecycle({
    status,
}: {
    status: PlanRecord["status"];
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
                        description="Available for new subscriptions."
                        active={
                            status === "ACTIVE"
                        }
                        icon={CheckCircle2}
                    />

                    <LifecycleStep
                        label="Paused"
                        description="Temporarily unavailable for new subscriptions."
                        active={
                            status === "PAUSED"
                        }
                        icon={CirclePause}
                    />

                    <LifecycleStep
                        label="Archived"
                        description="Removed from normal plan offerings."
                        active={
                            status === "ARCHIVED"
                        }
                        icon={Archive}
                    />
                </div>

                <div className="mt-4 rounded-lg border border-dashed bg-muted/20 p-4 text-xs text-muted-foreground">
                    Lifecycle mutations will be enabled once the corresponding
                    merchant SDK/API operations are exposed.
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