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

import type {
    CustomerNotificationChannelState,
} from "@/types/customer-notification";

import {
    CustomerNotificationChannelCard,
} from "./CustomerNotificationChannelCard";

export function CustomerNotificationChannels({
    channels,
}: {
    channels:
        CustomerNotificationChannelState[];
}) {
    const iconMap = {
        EMAIL:
            Mail,

        IN_APP:
            Bell,

        WEBHOOK:
            Webhook,
    } as const;

    return (
        <Section
            title="Notification channels"
            description="Choose where your customer notifications can be delivered."
        >

            <Stack gap={3}>

                {channels.map(
                    (
                        channel,
                    ) => {

                        const Icon =
                            iconMap[
                                channel.channel
                            ];

                        return (
                            <CustomerNotificationChannelCard
                                key={
                                    channel.channel
                                }
                                icon={
                                    Icon
                                }
                                title={
                                    channel.title
                                }
                                description={
                                    channel.description
                                }
                                destination={
                                    channel.destination
                                }
                                status={
                                    channel.status
                                }
                                action={
                                    channel.channel ===
                                    "WEBHOOK"
                                        ? "Configure"
                                        : "Manage"
                                }
                            />
                        );
                    },
                )}

            </Stack>

        </Section>
    );
}