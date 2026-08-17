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
    CustomerBillingPermissionCard,
} from "@/components/portal/permissions/CustomerBillingPermissionCard";

import {
    CustomerPermissionGuidance,
} from "@/components/portal/permissions/CustomerPermissionGuidance";

import {
    CustomerPermissionsHeader,
} from "@/components/portal/permissions/CustomerPermissionsHeader";

import {
    CustomerPermissionsList,
} from "@/components/portal/permissions/CustomerPermissionsList";

import {
    CustomerPermissionsOverview,
} from "@/components/portal/permissions/CustomerPermissionsOverview";

import {
    CustomerPermissionsPagination,
} from "@/components/portal/permissions/CustomerPermissionsPagination";

import {
    CustomerPermissionsToolbar,
} from "@/components/portal/permissions/CustomerPermissionsToolbar";

export default function CustomerPermissionsPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerPermissionsHeader />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerPermissionsOverview />

                    {/* BILLING AUTHORIZATION */}

                    <Section
                        title="Billing authorization"
                        description="The authorization most directly associated with your active recurring subscriptions."
                    >

                        <CustomerBillingPermissionCard />

                    </Section>

                    {/* PERMISSIONS */}

                    <Section
                        title="Permissions"
                        description="Permissions currently associated with your Smart Account."
                    >

                        <Stack gap={4}>

                            <CustomerPermissionsToolbar />

                            <CustomerPermissionsList />

                            <CustomerPermissionsPagination />

                        </Stack>

                    </Section>

                    {/* GUIDANCE */}

                    <Section
                        title="Permission guidance"
                        description="Important information about Smart Account authorization."
                    >

                        <CustomerPermissionGuidance />

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}