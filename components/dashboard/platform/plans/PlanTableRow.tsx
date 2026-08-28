"use client";

import {
    Archive,
    Check,
    Layers3,
    MoreHorizontal,
    Pause,
} from "lucide-react";

import Link from "next/link";

import type { PlanRecord } from "@stripe-for-web3/core";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PlanStatusBadge } from "./PlanStatusBadge";
import { PlanPricing } from "./PlanPricing";


interface PlanTableRowProps {

    plan: PlanRecord;

    onPause: (
        plan: PlanRecord,
    ) => void;

    onActivate: (
        plan: PlanRecord,
    ) => void;

    onArchive: (
        plan: PlanRecord,
    ) => void;

    pending?: boolean;
}


export function PlanTableRow({

    plan,

    onPause,

    onActivate,

    onArchive,

    pending = false,

}: PlanTableRowProps) {

    return (

        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">

                        <Layers3 className="size-4 text-muted-foreground" />

                    </div>


                    <div className="min-w-0">

                        <Link
                            href={`/dashboard/merchant/plans/${plan.planId}`}
                            className="block truncate text-sm font-medium hover:underline"
                        >
                            {plan.name}
                        </Link>


                        <p className="truncate text-xs text-muted-foreground">

                            Plan #{plan.planId}

                        </p>

                    </div>

                </div>

            </td>


            <td className="px-4 py-4">

                <PlanPricing
                    plan={plan}
                />

            </td>


            {/* <td className="px-4 py-4 text-sm">

                {plan.activeSubscribers}

            </td>


            <td className="px-4 py-4 text-sm">

                {plan.monthlyRevenue}

            </td> */}


            <td className="px-4 py-4">

                <PlanStatusBadge
                    status={plan.status}
                />

            </td>


            <td className="px-4 py-4 text-sm text-muted-foreground">

                {new Date(
                    plan.createdAt,
                ).toLocaleDateString()}

            </td>


            <td className="px-4 py-4 text-right">

                <DropdownMenu>

                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                disabled={
                                    pending
                                }
                                aria-label={
                                    `Actions for ${plan.name}`
                                }
                            >
                                <MoreHorizontal />
                            </Button>
                        }
                    />


                    <DropdownMenuContent align="end">

                        <DropdownMenuItem
                            render={
                                <Link
                                    href={`/dashboard/merchant/plans/${plan.planId}`}
                                >
                                    View plan
                                </Link>
                            }
                        />


                        <DropdownMenuItem
                            render={
                                <Link
                                    href={`/dashboard/merchant/plans/${plan.planId}/edit`}
                                >
                                    Edit plan
                                </Link>
                            }
                        />


                        <DropdownMenuSeparator />


                        {plan.status === "ACTIVE" && (

                            <DropdownMenuItem
                                disabled={
                                    pending
                                }
                                onClick={() => {

                                    onPause(
                                        plan,
                                    );

                                }}
                            >

                                <Pause />

                                Pause plan

                            </DropdownMenuItem>

                        )}


                        {plan.status === "PAUSED" && (

                            <DropdownMenuItem
                                disabled={
                                    pending
                                }
                                onClick={() => {

                                    onActivate(
                                        plan,
                                    );

                                }}
                            >

                                <Check />

                                Activate plan

                            </DropdownMenuItem>

                        )}


                        {plan.status !== "ARCHIVED" && (

                            <>

                                <DropdownMenuSeparator />


                                <DropdownMenuItem
                                    variant="destructive"
                                    disabled={
                                        pending
                                    }
                                    onClick={() => {

                                        onArchive(
                                            plan,
                                        );

                                    }}
                                >

                                    <Archive />

                                    Archive plan

                                </DropdownMenuItem>

                            </>

                        )}

                    </DropdownMenuContent>

                </DropdownMenu>

            </td>

        </tr>

    );

}