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

export function CustomerNotificationsOverview({
    received,
    deliverySuccess,
    activeChannels,
    unread,
}: {
    received: number;

    deliverySuccess: number;

    activeChannels: number;

    unread: number;
}) {
    return (
        <Section
            title="Overview"
            description="A summary of your notification activity and preferences."
        >

            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <CustomerNotificationOverviewCard
                    title="Notifications received"
                    value={
                        received.toLocaleString()
                    }
                    description="Current notification set"
                    icon={
                        Bell
                    }
                />

                <CustomerNotificationOverviewCard
                    title="Delivery success"
                    value={
                        `${deliverySuccess.toFixed(1)}%`
                    }
                    description="Across recorded notifications"
                    icon={
                        CheckCircle2
                    }
                />

                <CustomerNotificationOverviewCard
                    title="Active channels"
                    value={
                        String(
                            activeChannels,
                        )
                    }
                    description="Enabled delivery channels"
                    icon={
                        Mail
                    }
                />

                <CustomerNotificationOverviewCard
                    title="Unread"
                    value={
                        unread.toLocaleString()
                    }
                    description="Awaiting your review"
                    icon={
                        ShieldCheck
                    }
                />

            </Grid>

        </Section>
    );
}