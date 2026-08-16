import {
    AlertTriangle,
    KeyRound,
    Radio,
    ShieldCheck,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    PermissionKpiCard,
} from "@/components/dashboard/platform/permissions/PermissionKpiCard";

export function DeveloperOverview() {
    return (
        <Section
            title="Developer access"
            description="A summary of your merchant's API credentials and integration access."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <PermissionKpiCard
                    title="Total API keys"
                    value="6"
                    description="All environments"
                    icon={KeyRound}
                />

                <PermissionKpiCard
                    title="Active keys"
                    value="5"
                    description="Currently usable"
                    icon={ShieldCheck}
                />

                <PermissionKpiCard
                    title="Live keys"
                    value="2"
                    description="Production access"
                    icon={Radio}
                />

                <PermissionKpiCard
                    title="Needs attention"
                    value="1"
                    description="Expired or expiring"
                    icon={AlertTriangle}
                />

            </Grid>
        </Section>
    );
}