import {
    Button,
} from "@/components/ui/button";

import {
    Container,
} from "@/components/layout/Container";

import {
    Divider,
} from "@/components/layout/Divider";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Inline,
} from "@/components/layout/Inline";

import {
    Page,
} from "@/components/layout/Page";

import {
    PageHeader,
} from "@/components/layout/PageHeader";

import {
    Section,
} from "@/components/layout/Section";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    ActivityOverview,
} from "@/components/dashboard/account/activity/ActivityOverview";

import {
    ActivityToolbar,
} from "@/components/dashboard/account/activity/ActivityToolbar";

import {
    ActivityTable,
} from "@/components/dashboard/account/activity/ActivityTable";

import {
    ActivityTimeline,
} from "@/components/dashboard/account/activity/ActivityTimeline";

import {
    ActivityPagination,
} from "@/components/dashboard/account/activity/ActivityPagination";

export default function ActivityPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <PageHeader
                        eyebrow="Activity"
                        title="Activity"
                        description="Review the operational events occurring across your merchant, customers, billing infrastructure, integrations, and permissions."
                        actions={
                            <Inline gap={2}>

                                <Button variant="outline">
                                    Export
                                </Button>

                                <Button variant="outline">
                                    Refresh
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <ActivityOverview />

                    {/* TIMELINE */}

                    <Section
                        title="Recent timeline"
                        description="A chronological view of the latest operational events."
                    >

                        <ActivityTimeline />

                    </Section>

                    {/* ALL ACTIVITY */}

                    <Section
                        title="Activity log"
                        description="Search and investigate events across your merchant account."
                    >

                        <Stack gap={4}>

                            <ActivityToolbar />

                            <ActivityTable />

                            <ActivityPagination />

                        </Stack>

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}