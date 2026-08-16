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

export function WebhooksOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of your webhook infrastructure."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <WebhookKpiCard
                    title="Total endpoints"
                    value="4"
                    description="Configured endpoints"
                    icon={Webhook}
                />

                <WebhookKpiCard
                    title="Active endpoints"
                    value="3"
                    description="Currently receiving events"
                    icon={Radio}
                />

                <WebhookKpiCard
                    title="Successful deliveries"
                    value="99.2%"
                    description="Last 30 days"
                    trend="+0.6%"
                    trendPositive
                    icon={CheckCircle2}
                />

                <WebhookKpiCard
                    title="Failed deliveries"
                    value="0.8%"
                    description="Last 30 days"
                    trend="-0.3%"
                    trendPositive
                    icon={XCircle}
                />

            </Grid>
        </Section>
    );
}