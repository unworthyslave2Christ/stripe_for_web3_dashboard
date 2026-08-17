import {
    Bell,
    CheckCircle2,
    Mail,
    ShieldCheck,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import {
    CustomerNotificationOverviewCard,
} from "./CustomerNotificationOverviewCard";

export function CustomerNotificationsOverview() {
    return (
        <Section
            title="Overview"
            description="A summary of your notification activity and preferences."
        >
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerNotificationOverviewCard
                    title="Notifications received"
                    value="24"
                    description="Last 30 days"
                    icon={Bell}
                />

                <CustomerNotificationOverviewCard
                    title="Delivery success"
                    value="99.5%"
                    description="Across enabled channels"
                    icon={CheckCircle2}
                />

                <CustomerNotificationOverviewCard
                    title="Active channels"
                    value="2"
                    description="Email and in-app"
                    icon={Mail}
                />

                <CustomerNotificationOverviewCard
                    title="Unread"
                    value="3"
                    description="Awaiting your review"
                    icon={ShieldCheck}
                />

            </Grid>
        </Section>
    );
}