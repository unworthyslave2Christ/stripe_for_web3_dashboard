import {
    CheckCircle2,
    CircleDollarSign,
    RotateCcw,
    XCircle,
} from "lucide-react";

import {
    Section,
} from "@/components/layout/Section";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    BillingKpiCard,
} from "./BillingKpiCard";

interface BillingOverviewProps {
    available: boolean;
}

export function BillingOverview({
    available,
}: BillingOverviewProps) {
    return (
        <Section
            title="Overview"
            description="A summary of billing activity across your merchant account."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <BillingKpiCard
                    title="Gross billing volume"
                    value={
                        available
                            ? "—"
                            : "Not available"
                    }
                    description="Awaiting billing API"
                    icon={CircleDollarSign}
                />

                <BillingKpiCard
                    title="Successful billing"
                    value={
                        available
                            ? "—"
                            : "Not available"
                    }
                    description="Awaiting billing API"
                    icon={CheckCircle2}
                />

                <BillingKpiCard
                    title="Failed billing"
                    value={
                        available
                            ? "—"
                            : "Not available"
                    }
                    description="Awaiting billing API"
                    icon={XCircle}
                />

                <BillingKpiCard
                    title="Refunds"
                    value={
                        available
                            ? "—"
                            : "Not available"
                    }
                    description="Awaiting billing API"
                    icon={RotateCcw}
                />

            </Grid>
        </Section>
    );
}