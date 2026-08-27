"use client";

import type {
    ReactNode,
} from "react";


import {
    Activity,
    CircleDollarSign,
    CreditCard,
    Users,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

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
    DashboardShell,
} from "@/components/dashboard/DashboardShell";

import { useMerchantOverviewPage } from "@/hooks/pages/merchant/useMerchantOverviewPage";




export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {

    const page =
            useMerchantOverviewPage();

    
        if (
            page.merchant.error &&
            !page.merchant.data
        ) {
            return (
                <DashboardShell>

                <Page>
    
                    <Container className="py-8 lg:py-10">
    
                        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
    
                            <p className="text-sm font-medium">
                                Unable to load merchant account
                            </p>
    
                            <p className="mt-1 text-sm text-muted-foreground">
                                {
                                    page.merchant.error.message
                                }
                            </p>
    
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() =>
                                    page.merchant.refresh()
                                }
                            >
                                Try again
                            </Button>
    
                        </div>
    
                    </Container>
    
                </Page>

                </DashboardShell>
            );
        }
    
        if (
            !page.merchant.data
        ) {
            return (
                <DashboardShell>
                
                <Page>
    
                    <Container className="py-8 lg:py-10">
    
                        <div className="rounded-xl border border-dashed bg-card p-8 text-center">
    
                            <p className="text-lg font-semibold">
                                Merchant account required
                            </p>
    
                            <p className="mt-2 text-sm text-muted-foreground">
                                Complete merchant onboarding before accessing the dashboard.
                            </p>
    
                            <Button
                                className="mt-5"
                                render={
                                    <a href="/merchant/onboarding">
                                        Complete onboarding
                                    </a>
                                }
                            />
    
                        </div>
    
                    </Container>
    
                </Page>

                </DashboardShell>
            );
        }

    return (
        <DashboardShell>
            {children}
        </DashboardShell>
    );
}