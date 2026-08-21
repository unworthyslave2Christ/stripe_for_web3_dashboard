import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type {
    PlanRecord,
} from "@stripe-for-web3/core";

import {
    PlanTableRow,
} from "./PlanTableRow";

export function PlansTable({
    plans,
}: {
    plans: PlanRecord[];
}) {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px]">

                        <thead>
                            <tr className="border-b bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Plan
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Price
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Subscribers
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Monthly revenue
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Created
                                </th>

                                <th className="px-4 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {plans.map((plan) => (
                                <PlanTableRow
                                    key={plan.planId}
                                    plan={plan}
                                />
                            ))}
                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}