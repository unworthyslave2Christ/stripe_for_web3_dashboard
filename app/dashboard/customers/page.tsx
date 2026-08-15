import { Button } from "@/components/ui/button";

import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Inline } from "@/components/layout/Inline";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";

import { DashboardShell } from "@/components/dashboard/DashboardShell";

import { CustomersOverview } from "@/components/dashboard/customers/CustomersOverview";
import { CustomersPagination } from "@/components/dashboard/customers/CustomersPagination";
import { CustomersTable } from "@/components/dashboard/customers/CustomersTable";
import { CustomersToolbar } from "@/components/dashboard/customers/CustomersToolbar";

export default function CustomersPage() {
    return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <Stack gap={8}>

                        {/* PAGE HEADER */}

                        <PageHeader
                            eyebrow="Customers"
                            title="Customers"
                            description="Manage the customers connected to your merchant account, their wallets, Smart Accounts, and billing activity."
                            actions={
                                <Inline gap={2}>
                                    <Button variant="outline">
                                        Export
                                    </Button>

                                    <Button>
                                        Add customer
                                    </Button>
                                </Inline>
                            }
                        />

                        <Divider />

                        {/* OVERVIEW */}

                        <CustomersOverview />

                        {/* CUSTOMER MANAGEMENT */}

                        <Section
                            title="Customer management"
                            description="Search, filter, and manage customers associated with your merchant."
                        >
                            <Stack gap={4}>
                                <CustomersToolbar />

                                <CustomersTable />

                                <CustomersPagination />
                            </Stack>
                        </Section>

                    </Stack>
                </Container>
            </Page>
    );
}