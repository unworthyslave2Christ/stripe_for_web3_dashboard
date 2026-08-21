"use client";

import Link from "next/link";

import {
    ArrowLeft,
    Layers3,
    MoreHorizontal,
} from "lucide-react";

import type {
    PlanRecord,
} from "@stripe-for-web3/core";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Inline,
} from "@/components/layout/Inline";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function PlanStatusBadge({
    status,
}: {
    status: PlanRecord["status"];
}) {
    switch (status) {
        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    Active
                </Badge>
            );

        case "PAUSED":
            return (
                <Badge variant="outline">
                    Paused
                </Badge>
            );

        case "ARCHIVED":
            return (
                <Badge variant="destructive">
                    Archived
                </Badge>
            );

        default:
            return (
                <Badge variant="outline">
                    {String(status)}
                </Badge>
            );
    }
}

export function PlanDetailHeader({
    plan,
}: {
    plan: PlanRecord;
}) {
    return (
        <div className="space-y-5">

            <Button
                render={
                    <Link
                        href="/dashboard/platform/plans"
                    >
                        <ArrowLeft />
                        Plans
                    </Link>
                }
                variant="ghost"
                size="sm"
                className="-ml-2"
            />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex min-w-0 items-start gap-4">

                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted/40">
                        <Layers3 className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">

                        <Inline
                            gap={2}
                            className="flex-wrap"
                        >
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                {plan.name}
                            </h1>

                            <PlanStatusBadge
                                status={plan.status}
                            />
                        </Inline>

                        {/* {plan.description && (
                            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                                {plan.description}
                            </p>
                        )} */}

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>
                                Plan #{plan.planId}
                            </span>

                            <span>
                                •
                            </span>

                            <span>
                                {plan.planId}
                            </span>
                        </div>

                    </div>

                </div>

                <DropdownMenu>

                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="outline"
                            >
                                Manage plan
                                <MoreHorizontal />
                            </Button>
                        }
                    />

                    <DropdownMenuContent align="end">

                        <DropdownMenuItem>
                            Edit plan
                        </DropdownMenuItem>

                        {plan.status ===
                            "ACTIVE" && (
                            <DropdownMenuItem>
                                Pause plan
                            </DropdownMenuItem>
                        )}

                        {plan.status ===
                            "PAUSED" && (
                            <DropdownMenuItem>
                                Resume plan
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            View subscribers
                        </DropdownMenuItem>

                        {plan.status !==
                            "ARCHIVED" && (
                            <DropdownMenuItem
                                variant="destructive"
                            >
                                Archive plan
                            </DropdownMenuItem>
                        )}

                    </DropdownMenuContent>

                </DropdownMenu>

            </div>
        </div>
    );
}