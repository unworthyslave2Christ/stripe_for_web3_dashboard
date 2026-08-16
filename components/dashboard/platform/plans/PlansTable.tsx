import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    PlanTableRow,
} from "./PlanTableRow";

import type {
    PlanRecord,
} from "./plan.types";

const plans: PlanRecord[] = [
    {
        id: "plan_starter",
        planId: 89,
        name: "Starter",
        description: "Everything needed to get started.",
        amount: "0",
        currency: "USD",
        billingInterval: "MONTH",
        merchantId: 12,
        paymentToken: "USDC",
        status: "ACTIVE",
        activeSubscribers: 842,
        totalSubscribers: 1054,
        monthlyRevenue: "$0",
        createdAt: "Jun 01, 2025",
    },
    {
        id: "plan_pro",
        planId: 90,
        name: "Pro",
        description: "For growing teams that need more.",
        amount: "19",
        currency: "USD",
        billingInterval: "MONTH",
        merchantId: 12,
        paymentToken: "USDC",
        status: "ACTIVE",
        activeSubscribers: 736,
        totalSubscribers: 889,
        monthlyRevenue: "$13,984",
        createdAt: "Jun 04, 2025",
    },
    {
        id: "plan_enterprise",
        planId: 91,
        name: "Enterprise",
        description: "Advanced capabilities for organizations.",
        amount: "99",
        currency: "USD",
        billingInterval: "MONTH",
        merchantId: 12,
        paymentToken: "USDC",
        status: "ACTIVE",
        activeSubscribers: 314,
        totalSubscribers: 341,
        monthlyRevenue: "$31,086",
        createdAt: "Jun 07, 2025",
    },
    {
        id: "plan_legacy",
        planId: 78,
        name: "Legacy",
        description: "Previous billing offer.",
        amount: "29",
        currency: "USD",
        billingInterval: "MONTH",
        merchantId: 12,
        paymentToken: "USDC",
        status: "ARCHIVED",
        activeSubscribers: 0,
        totalSubscribers: 216,
        monthlyRevenue: "$0",
        createdAt: "Mar 02, 2025",
    },
];

export function PlansTable() {
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
                                    key={plan.id}
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