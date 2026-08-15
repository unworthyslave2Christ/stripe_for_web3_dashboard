import {
    Download,
    UserPlus,
} from "lucide-react";

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
    Stack,
} from "@/components/layout/Stack";

import {
    CustomersOverview,
} from "@/components/dashboard/customers/CustomersOverview";

import {
    CustomersToolbar,
} from "@/components/dashboard/customers/CustomersToolbar";

import {
    CustomersTable,
} from "@/components/dashboard/customers/CustomersTable";

import {
    CustomersPagination,
} from "@/components/dashboard/customers/CustomersPagination";

////////////////////////////////////////////////////////////
// PAGE
////////////////////////////////////////////////////////////

export default function CustomersPage() {
    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* PAGE HEADER */}

                    <PageHeader
                        eyebrow="Customers"
                        title="Customers"
                        description="View and manage the customers using your Stripe for Web3 billing infrastructure."
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                >
                                    <Download />
                                    Export
                                </Button>

                                <Button>
                                    <UserPlus />
                                    Add customer
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomersOverview />

                    {/* DIRECTORY */}

                    <div className="space-y-4">

                        <CustomersToolbar />

                        <CustomersTable />

                        <CustomersPagination />

                    </div>

                </Stack>

            </Container>

        </Page>
    );
}