import {
    Container,
} from "@/components/layout/Container";

import {
    Divider,
} from "@/components/layout/Divider";

import {
    Page,
} from "@/components/layout/Page";

import {
    Section,
} from "@/components/layout/Section";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    CustomerNotificationChannels,
} from "@/components/portal/notifications/CustomerNotificationChannels";

import {
    CustomerNotificationPreferences,
} from "@/components/portal/notifications/CustomerNotificationPreferences";

import {
    CustomerNotificationList,
} from "@/components/portal/notifications/CustomerNotificationList";

import {
    CustomerNotificationsHeader,
} from "@/components/portal/notifications/CustomerNotificationsHeader";

import {
    CustomerNotificationsOverview,
} from "@/components/portal/notifications/CustomerNotificationsOverview";

import {
    CustomerNotificationsPagination,
} from "@/components/portal/notifications/CustomerNotificationsPagination";

import {
    CustomerNotificationsToolbar,
} from "@/components/portal/notifications/CustomerNotificationsToolbar";

export default function CustomerNotificationsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerNotificationsHeader />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerNotificationsOverview />

                    {/* PREFERENCES */}

                    <Section
                        title="Notification preferences"
                        description="Choose which customer notifications you want to receive."
                    >

                        <CustomerNotificationPreferences />

                    </Section>

                    {/* CHANNELS */}

                    <CustomerNotificationChannels />

                    {/* RECENT NOTIFICATIONS */}

                    <Section
                        title="Recent notifications"
                        description="Review notifications recently delivered to your account."
                    >

                        <Stack gap={4}>

                            <CustomerNotificationsToolbar />

                            <CustomerNotificationList />

                            <CustomerNotificationsPagination />

                        </Stack>

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}