"use client";

import type { ReactNode } from "react";

import {
    CustomerPortalShell,
} from "@/components/portal/CustomerPortalShell";

import {
    useCustomerOverviewPage,
} from "@/hooks/pages/customer/useCustomerOverviewPage";

import {
    Button,
} from "@/components/ui/button";

import {
    Container,
} from "@/components/layout/Container";

import {
    Page,
} from "@/components/layout/Page";

////////////////////////////////////////////////////////////
// LAYOUT
////////////////////////////////////////////////////////////

export default function CustomerPortalLayout({
    children,
}: {
    children: ReactNode;
}) {
    const page =
        useCustomerOverviewPage();

    ////////////////////////////////////////////////////////////
    // CUSTOMER ERROR
    ////////////////////////////////////////////////////////////

    if (
        page.customer.error &&
        !page.customer.data
    ) {
        return (
            <CustomerPortalShell>

                <Page>

                    <Container className="py-8 lg:py-10">

                        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">

                            <p className="text-sm font-medium">
                                Unable to load customer account
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {
                                    page.customer.error.message
                                }
                            </p>

                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() =>
                                    page.customer.refresh()
                                }
                            >
                                Try again
                            </Button>

                        </div>

                    </Container>

                </Page>

            </CustomerPortalShell>
        );
    }

    ////////////////////////////////////////////////////////////
    // CUSTOMER ACCOUNT REQUIRED
    ////////////////////////////////////////////////////////////

    if (
        !page.customer.data
    ) {
        return (
            <CustomerPortalShell>

                <Page>

                    <Container className="py-8 lg:py-10">

                        <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                            <p className="text-lg font-semibold">
                                Customer account required
                            </p>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Connect your wallet and complete
                                customer onboarding before accessing
                                the customer portal.
                            </p>

                            <Button
                                className="mt-5"
                                render={
                                    <a href="/customer/onboarding">
                                        Complete onboarding
                                    </a>
                                }
                            >
                                Complete onboarding
                            </Button>

                        </div>

                    </Container>

                </Page>

            </CustomerPortalShell>
        );
    }

    ////////////////////////////////////////////////////////////
    // CUSTOMER ACCOUNT READY
    ////////////////////////////////////////////////////////////

    return (
        <CustomerPortalShell>
            {children}
        </CustomerPortalShell>
    );
}