"use client";

import type {
    LucideIcon,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function CustomerNotificationChannelCard({
    icon: Icon,
    title,
    description,
    destination,
    status,
    action,
}: {
    icon: LucideIcon;

    title: string;

    description: string;

    destination: string;

    status:
        | "ACTIVE"
        | "INACTIVE";

    action: string;

    onAction?: () => void;

    disabled?: boolean;
}) {
    return (
        <Card>

            <CardContent className="p-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">

                        <Icon className="size-4 text-muted-foreground" />

                    </div>

                    <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                            <p className="text-sm font-semibold">
                                {title}
                            </p>

                            {status ===
                            "ACTIVE" ? (
                                <Badge variant="secondary">
                                    Active
                                </Badge>
                            ) : (
                                <Badge variant="outline">
                                    Inactive
                                </Badge>
                            )}

                        </div>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {description}
                        </p>

                        <p className="mt-3 break-all font-mono text-xs text-muted-foreground">
                            {destination}
                        </p>

                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        disabled
                    >
                        {action}
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}