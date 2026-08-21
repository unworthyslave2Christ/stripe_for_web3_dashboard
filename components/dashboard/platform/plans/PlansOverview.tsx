import {
    Archive,
    CircleDollarSign,
    Layers3,
    Users,
} from "lucide-react";

import {
    Section,
} from "@/components/layout/Section";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    PlanKpiCard,
} from "./PlanKpiCard";

interface PlansOverviewProps {
    summary: {
        total: number;

        active: number;

        paused: number;

        archived: number;

        monthlyRevenue: number;
    };
}

export function PlansOverview({
    summary,
}: PlansOverviewProps) {
    return (
        <Section
            title="Overview"
            description="A summary of the billing plans offered by your merchant."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <PlanKpiCard
                    title="Total plans"
                    value={
                        summary.total.toLocaleString()
                    }
                    description="All plans returned by the API"
                    icon={Layers3}
                />

                <PlanKpiCard
                    title="Active plans"
                    value={
                        summary.active.toLocaleString()
                    }
                    description="Currently available"
                    icon={Users}
                />

                <PlanKpiCard
                    title="Plan revenue"
                    value={
                        `$${summary.monthlyRevenue.toLocaleString(
                            undefined,
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            },
                        )}`
                    }
                    description="Current monthly revenue"
                    icon={CircleDollarSign}
                />

                <PlanKpiCard
                    title="Archived plans"
                    value={
                        summary.archived.toLocaleString()
                    }
                    description="No longer offered"
                    icon={Archive}
                />

            </Grid>
        </Section>
    );
}