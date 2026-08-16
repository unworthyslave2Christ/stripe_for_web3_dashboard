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
    PermissionsOverview,
} from "@/components/dashboard/platform/permissions/PermissionsOverview";

import {
    PermissionsPagination,
} from "@/components/dashboard/platform/permissions/PermissionsPagination";

import {
    PermissionsTable,
} from "@/components/dashboard/platform/permissions/PermissionsTable";

import {
    PermissionsToolbar,
} from "@/components/dashboard/platform/permissions/PermissionsToolbar";

export default function PermissionsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <PageHeader
                        eyebrow="Permissions"
                        title="Permissions"
                        description="Define and manage the actions your billing operators are authorized to perform."
                        actions={
                            <Inline gap={2}>

                                <Button variant="outline">
                                    Export
                                </Button>

                                <Button>
                                    Create policy
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <PermissionsOverview />

                    {/* MANAGEMENT */}

                    <Section
                        title="Permission management"
                        description="Search, inspect, and manage merchant-side billing authorization policies."
                    >

                        <Stack gap={4}>

                            <PermissionsToolbar />

                            <PermissionsTable />

                            <PermissionsPagination />

                        </Stack>

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}