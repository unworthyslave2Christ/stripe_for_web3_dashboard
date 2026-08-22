import {
    AlertTriangle,
    KeyRound,
    ShieldCheck,
    Users,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    PermissionKpiCard,
} from "./PermissionKpiCard";

export interface PermissionsOverviewSummary {
    total: number;

    active: number;

    operators: number;

    needsAttention: number;
}

interface PermissionsOverviewProps {
    summary: PermissionsOverviewSummary;

    available: boolean;
}

export function PermissionsOverview({
    summary,
    available,
}: PermissionsOverviewProps) {
    return (
        <Section
            title="Overview"
            description={
                available
                    ? "A summary of authorization policies configured for your merchant."
                    : "Permission policy metrics will appear here when the merchant permission API is exposed."
            }
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <PermissionKpiCard
                    title="Permission policies"
                    value={
                        available
                            ? summary.total.toLocaleString()
                            : "—"
                    }
                    description={
                        available
                            ? "All configured policies"
                            : "Awaiting permission API"
                    }
                    icon={KeyRound}
                />

                <PermissionKpiCard
                    title="Active policies"
                    value={
                        available
                            ? summary.active.toLocaleString()
                            : "—"
                    }
                    description={
                        available
                            ? "Currently authorized"
                            : "Awaiting permission API"
                    }
                    icon={ShieldCheck}
                />

                <PermissionKpiCard
                    title="Operators covered"
                    value={
                        available
                            ? summary.operators.toLocaleString()
                            : "—"
                    }
                    description={
                        available
                            ? "Operators with assigned permissions"
                            : "Awaiting permission API"
                    }
                    icon={Users}
                />

                <PermissionKpiCard
                    title="Needs attention"
                    value={
                        available
                            ? summary.needsAttention.toLocaleString()
                            : "—"
                    }
                    description={
                        available
                            ? "Expired or pending policies"
                            : "Awaiting permission API"
                    }
                    icon={AlertTriangle}
                />

            </Grid>
        </Section>
    );
}