import Link from "next/link";

import {
    ArrowLeft,
    Layers3,
} from "lucide-react";

import type {
    PlanRecord,
} from "@stripe-for-web3/core";

import {
    Button,
} from "@/components/ui/button";

import {
    Inline,
} from "@/components/layout/Inline";

import {
    PlanStatusBadge,
} from "../PlanStatusBadge";

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

                        {/* <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            {plan.description}
                        </p> */}

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>
                                Plan #{plan.planId}
                            </span>

                            <span>•</span>

                            <span>
                                {plan.planId}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        disabled
                        title="Plan editing will be enabled when the merchant mutation is exposed by the SDK/API."
                    >
                        Edit plan
                    </Button>

                    <Button
                        variant="outline"
                        disabled
                        title="Plan lifecycle mutations will be enabled when exposed by the SDK/API."
                    >
                        Manage lifecycle
                    </Button>
                </div>
            </div>
        </div>
    );
}