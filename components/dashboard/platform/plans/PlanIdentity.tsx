import Link from "next/link";

import {
    Layers3,
} from "lucide-react";

import type {
    PlanRecord,
} from "./plan.types";

interface PlanIdentityProps {
    plan: PlanRecord;
}

export function PlanIdentity({
    plan,
}: PlanIdentityProps) {
    return (
        <div className="flex min-w-0 items-center gap-3">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                <Layers3 className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/platform/plans/${plan.id}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {plan.name}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    Plan #{plan.planId}
                </p>

            </div>

        </div>
    );
}