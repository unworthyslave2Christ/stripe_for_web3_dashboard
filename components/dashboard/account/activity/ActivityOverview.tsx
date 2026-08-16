import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    ActivityKpiCard,
} from "./ActivityKpiCard";

export function ActivityOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of operational events across your merchant account."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <ActivityKpiCard
                    title="Events"
                    value="18,421"
                    description="Last 30 days"
                    icon={Activity}
                />

                <ActivityKpiCard
                    title="Successful"
                    value="17,904"
                    description="Completed successfully"
                    icon={CheckCircle2}
                />

                <ActivityKpiCard
                    title="Pending"
                    value="384"
                    description="Awaiting completion"
                    icon={Clock3}
                />

                <ActivityKpiCard
                    title="Errors"
                    value="133"
                    description="Requiring attention"
                    icon={AlertTriangle}
                />

            </Grid>
        </Section>
    );
}