import {
    Archive,
    CircleDollarSign,
    Layers3,
    Users,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    PlanKpiCard,
} from "./PlanKpiCard";

export function PlansOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of the billing plans offered by your merchant."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <PlanKpiCard
                    title="Total plans"
                    value="8"
                    description="All plans created"
                    icon={Layers3}
                />

                <PlanKpiCard
                    title="Active plans"
                    value="6"
                    description="Currently available"
                    icon={Users}
                />

                <PlanKpiCard
                    title="Plan revenue"
                    value="$45,231"
                    description="Current monthly revenue"
                    icon={CircleDollarSign}
                />

                <PlanKpiCard
                    title="Archived plans"
                    value="2"
                    description="No longer offered"
                    icon={Archive}
                />

            </Grid>
        </Section>
    );
}