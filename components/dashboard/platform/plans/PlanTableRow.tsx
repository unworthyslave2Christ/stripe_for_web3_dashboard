import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    PlanIdentity,
} from "./PlanIdentity";

import {
    PlanPricing,
} from "./PlanPricing";

import {
    PlanStatusBadge,
} from "./PlanStatusBadge";

import type {
    PlanRecord,
} from "@stripe-for-web3/core";

export function PlanTableRow({
    plan,
}: {
    plan: PlanRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">
                <PlanIdentity plan={plan} />
            </td>

            <td className="px-4 py-4">
                <PlanPricing plan={plan} />
            </td>

            <td className="px-4 py-4 text-sm">
                0
                {/* {plan.activeSubscribers} */}
            </td>

            <td className="px-4 py-4 text-sm">
                {/* {plan.monthlyRevenue} */}
                0
            </td>

            <td className="px-4 py-4">
                <PlanStatusBadge
                    status={plan.status}
                />
            </td>

            <td className="px-4 py-4 text-sm text-muted-foreground">
                {plan.createdAt.toLocaleDateString()}
            </td>

            <td className="px-4 py-4 text-right">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled
                    aria-label={`Actions for ${plan.name}`}
                >
                    <MoreHorizontal />
                </Button>
            </td>

        </tr>
    );
}