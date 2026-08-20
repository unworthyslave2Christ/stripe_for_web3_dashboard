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

export function CustomerPermissionsOverview({
    activePermissions,
    authorizedSubscriptions,
    capabilities,
    needsAttention,
}: {
    activePermissions: number;

    authorizedSubscriptions: number;

    capabilities: number;

    needsAttention: number;
}) {
    return (
        <Section
            title="Overview"
            description="A summary of the permissions currently associated with your Smart Account."
        >

            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerPermissionOverviewCard
                    title="Active permissions"
                    value={
                        String(
                            activePermissions,
                        )
                    }
                    description="Currently authorized"
                    icon={
                        ShieldCheck
                    }
                />

                <CustomerPermissionOverviewCard
                    title="Authorized subscriptions"
                    value={
                        String(
                            authorizedSubscriptions,
                        )
                    }
                    description="Using active billing authorization"
                    icon={
                        CreditCard
                    }
                />

                <CustomerPermissionOverviewCard
                    title="Capabilities"
                    value={
                        String(
                            capabilities,
                        )
                    }
                    description="Currently enabled"
                    icon={
                        KeyRound
                    }
                />

                <CustomerPermissionOverviewCard
                    title="Needs attention"
                    value={
                        String(
                            needsAttention,
                        )
                    }
                    description={
                        needsAttention ===
                        0
                            ? "No permission issues"
                            : "Permissions require review"
                    }
                    icon={
                        AlertTriangle
                    }
                />

            </Grid>

        </Section>
    );
}