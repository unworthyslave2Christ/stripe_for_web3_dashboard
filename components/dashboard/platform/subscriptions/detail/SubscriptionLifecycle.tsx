"use client";

import {
    CheckCircle2,
    CirclePause,
    XCircle,
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
    MerchantSubscriptionStatus,
} from "@/types/merchant/subscription";

export function SubscriptionLifecycle({
    status,
}: {
    status: MerchantSubscriptionStatus;
}) {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Subscription lifecycle
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                    <LifecycleState
                        label="Active"
                        description="Recurring billing is enabled."
                        active={
                            status === "ACTIVE"
                        }
                        icon={CheckCircle2}
                    />

                    <LifecycleState
                        label="Paused"
                        description="Billing is temporarily stopped."
                        active={
                            status === "PAUSED"
                        }
                        icon={CirclePause}
                    />

                    <LifecycleState
                        label="Cancelled"
                        description="Subscription is no longer active."
                        active={
                            status === "CANCELLED"
                        }
                        icon={XCircle}
                    />

                </div>

            </CardContent>

        </Card>
    );
}

function LifecycleState({
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
                "rounded-lg border p-4",
                active
                    ? "border-primary/40 bg-primary/5"
                    : "bg-muted/20",
            ].join(" ")}
        >
            <div className="flex items-center justify-between">

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