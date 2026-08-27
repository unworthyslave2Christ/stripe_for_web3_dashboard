"use client";

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
    Button,
} from "@/components/ui/button";

import {
    CustomersOverview,
} from "@/components/dashboard/platform/customers/CustomersOverview";

import {
    CustomersUnavailableState,
} from "@/components/dashboard/platform/customers/CustomersUnavailableState";

import {
    useMerchantCustomersPage,
} from "@/hooks/pages/merchant/useMerchantCustomersPage";



export default function CustomersPage() {
    const page =
        useMerchantCustomersPage();


    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Customers"
                        title="Customers"
                        description="Manage customer records associated with your merchant account."
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                    disabled
                                >
                                    Export
                                </Button>

                                <Button
                                    disabled
                                >
                                    Add customer
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    <CustomersOverview
                        total={
                            page.total
                        }
                    />

                    <section className="space-y-4">

                        <div>

                            <h2 className="text-lg font-semibold tracking-tight">
                                Customer management
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Search and manage customer records associated with your merchant.
                            </p>

                        </div>

                        <CustomersUnavailableState />

                    </section>

                </Stack>

            </Container>

        </Page>
    );
}