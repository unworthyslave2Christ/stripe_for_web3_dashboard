import {
    CircleDollarSign,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    PlanRevenueChart,
} from "./PlanRevenueChart";

export function PlanRevenueSummary({
    plan,
}: {
    plan: {
        monthlyRevenue: string;
        lifetimeRevenue: string;
    };
}) {
    return (
        <Grid className="grid-cols-1 gap-4 xl:grid-cols-3">

            <Card>

                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CircleDollarSign className="size-4" />
                        Revenue
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">

                    <RevenueRow
                        label="This month"
                        value={plan.monthlyRevenue}
                    />

                    <RevenueRow
                        label="Lifetime"
                        value={plan.lifetimeRevenue}
                    />

                    <RevenueRow
                        label="Average subscriber value"
                        value="$84.20"
                    />

                </CardContent>

            </Card>

            <div className="xl:col-span-2">
                <PlanRevenueChart />
            </div>

        </Grid>
    );
}

function RevenueRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">

            <span className="text-sm text-muted-foreground">
                {label}
            </span>

            <span className="text-sm font-semibold">
                {value}
            </span>

        </div>
    );
}