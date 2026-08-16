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

export function PermissionsOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of authorization policies configured for your merchant."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <PermissionKpiCard
                    title="Permission policies"
                    value="12"
                    description="All configured policies"
                    icon={KeyRound}
                />

                <PermissionKpiCard
                    title="Active policies"
                    value="9"
                    description="Currently authorized"
                    icon={ShieldCheck}
                />

                <PermissionKpiCard
                    title="Operators covered"
                    value="5"
                    description="Operators with assigned permissions"
                    icon={Users}
                />

                <PermissionKpiCard
                    title="Needs attention"
                    value="2"
                    description="Expired or expiring policies"
                    icon={AlertTriangle}
                />

            </Grid>
        </Section>
    );
}