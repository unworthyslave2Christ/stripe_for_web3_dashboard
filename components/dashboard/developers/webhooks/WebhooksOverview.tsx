import {
    CheckCircle2,
    Radio,
    Webhook,
    XCircle,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    WebhookKpiCard,
} from "./WebhookKpiCard";

export function WebhooksOverview({
    total,
    active,
    successRate,
    failing,
}: {
    total: number;

    active: number;

    successRate: number;

    failing: number;
}) {
    return (
        <Section
            title="Overview"
            description="A summary of your webhook infrastructure."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <WebhookKpiCard
                    title="Total endpoints"
                    value={String(total)}
                    description="Configured endpoints"
                    icon={Webhook}
                />

                <WebhookKpiCard
                    title="Active endpoints"
                    value={String(active)}
                    description="Currently receiving events"
                    icon={Radio}
                />

                <WebhookKpiCard
                    title="Successful deliveries"
                    value={`${successRate}%`}
                    description="Available delivery history"
                    trend={
                        total > 0
                            ? "Healthy"
                            : undefined
                    }
                    trendPositive
                    icon={CheckCircle2}
                />

                <WebhookKpiCard
                    title="Failing endpoints"
                    value={String(failing)}
                    description="Endpoints requiring attention"
                    icon={XCircle}
                />

            </Grid>
        </Section>
    );
}