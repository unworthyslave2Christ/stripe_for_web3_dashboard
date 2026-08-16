import {
    AlertTriangle,
    Bell,
    CheckCircle2,
    Send,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    NotificationKpiCard,
} from "./NotificationKpiCard";

export function NotificationsOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of your merchant notification system."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <NotificationKpiCard
                    title="Active policies"
                    value="8"
                    description="Currently enabled"
                    icon={Bell}
                />

                <NotificationKpiCard
                    title="Notifications sent"
                    value="18,421"
                    description="Last 30 days"
                    trend="+11.7%"
                    trendPositive
                    icon={Send}
                />

                <NotificationKpiCard
                    title="Delivery success"
                    value="99.1%"
                    description="Last 30 days"
                    trend="+0.4%"
                    trendPositive
                    icon={CheckCircle2}
                />

                <NotificationKpiCard
                    title="Needs attention"
                    value="3"
                    description="Failed deliveries"
                    icon={AlertTriangle}
                />

            </Grid>
        </Section>
    );
}