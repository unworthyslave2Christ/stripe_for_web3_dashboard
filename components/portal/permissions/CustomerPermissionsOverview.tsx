import {
    AlertTriangle,
    CreditCard,
    KeyRound,
    ShieldCheck,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    CustomerPermissionOverviewCard,
} from "./CustomerPermissionOverviewCard";

export function CustomerPermissionsOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of the permissions currently associated with your Smart Account."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerPermissionOverviewCard
                    title="Active permissions"
                    value="1"
                    description="Currently authorized"
                    icon={ShieldCheck}
                />

                <CustomerPermissionOverviewCard
                    title="Authorized subscriptions"
                    value="2"
                    description="Using active billing authorization"
                    icon={CreditCard}
                />

                <CustomerPermissionOverviewCard
                    title="Capabilities"
                    value="2"
                    description="Currently enabled"
                    icon={KeyRound}
                />

                <CustomerPermissionOverviewCard
                    title="Needs attention"
                    value="0"
                    description="No permission issues"
                    icon={AlertTriangle}
                />

            </Grid>
        </Section>
    );
}