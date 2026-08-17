import {
    Bell,
    Mail,
    Webhook,
} from "lucide-react";

import {
    Section,
} from "@/components/layout/Section";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    CustomerNotificationChannelCard,
} from "./CustomerNotificationChannelCard";

export function CustomerNotificationChannels() {
    return (
        <Section
            title="Notification channels"
            description="Choose where your customer notifications can be delivered."
        >

            <Stack gap={3}>

                <CustomerNotificationChannelCard
                    icon={Mail}
                    title="Email"
                    description="Receive customer notifications at your configured email destination."
                    destination="alex@example.com"
                    status="ACTIVE"
                    action="Manage"
                />

                <CustomerNotificationChannelCard
                    icon={Bell}
                    title="In-app"
                    description="Receive notifications directly inside your Stripe for Web3 portal."
                    destination="This portal"
                    status="ACTIVE"
                    action="Enabled"
                />

                <CustomerNotificationChannelCard
                    icon={Webhook}
                    title="Webhook"
                    description="Receive supported customer events through your configured integration."
                    destination="Not configured"
                    status="INACTIVE"
                    action="Configure"
                />

            </Stack>

        </Section>
    );
}