"use client";

import Link from "next/link";

import {
    ArrowLeft,
    Layers3,
    MoreHorizontal,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Inline,
} from "@/components/layout/Inline";

import {
    PlanStatusBadge,
} from "../PlanStatusBadge";

interface PlanDetailHeaderProps {
    plan: {
        id: string;
        planId: number;
        name: string;
        description: string;
        status: "ACTIVE" | "PAUSED" | "ARCHIVED";
    };
}

export function PlanDetailHeader({
    plan,
}: PlanDetailHeaderProps) {
    return (
        <div className="space-y-5">

            <Button
                render={
                    <Link href="/dashboard/plans">
                    <ArrowLeft />
                    Plans
                    </Link>
                }
                variant="ghost"
                size="sm"
                className="-ml-2"
            />
                
         
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">

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

                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            {plan.description}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>
                                Plan #{plan.planId}
                            </span>

                            <span>
                                •
                            </span>

                            <span>
                                {plan.id}
                            </span>
                        </div>

                    </div>

                </div>

                <DropdownMenu>

                    <DropdownMenuTrigger 
                        render=
                        {
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

                        <DropdownMenuItem>
                            View subscribers
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            View activity
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            Pause plan
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-destructive">
                            Archive plan
                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>

            </div>

        </div>
    );
}