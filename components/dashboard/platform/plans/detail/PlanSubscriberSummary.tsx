import {
    CheckCircle2,
    TrendingUp,
    UserMinus,
    Users,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    PlanSubscriberMetrics,
} from "./PlanSubscriberMetrics";

import {
    PlanSubscriberChart,
} from "./PlanSubscriberChart";

export function PlanSubscriberSummary({
    plan,
}: {
    plan: {
        activeSubscribers: number;
        totalSubscribers: number;
    };
}) {
    return (
        <Grid className="grid-cols-1 gap-4 xl:grid-cols-3">

            <div className="xl:col-span-1">

                <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">

                    <PlanSubscriberMetrics
                        title="Active"
                        value={String(
                            plan.activeSubscribers,
                        )}
                        description="Currently subscribed"
                        icon={CheckCircle2}
                    />

                    <PlanSubscriberMetrics
                        title="Total"
                        value={String(
                            plan.totalSubscribers,
                        )}
                        description="All-time subscribers"
                        icon={Users}
                    />

                    <PlanSubscriberMetrics
                        title="Cancelled"
                        value="31"
                        description="Cancelled subscriptions"
                        icon={UserMinus}
                    />

                </Grid>

            </div>

            <div className="xl:col-span-2">
                <PlanSubscriberChart />
            </div>

        </Grid>
    );
}