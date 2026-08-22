"use client";

import { useParams } from "next/navigation";

import {
    Container,
} from "@/components/layout/Container";

import {
    Page,
} from "@/components/layout/Page";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    CustomerDetailBreadcrumb,
} from "@/components/dashboard/platform/customers/detail/CustomerDetailBreadcrumb";

import {
    CustomerDetailHeader,
} from "@/components/dashboard/platform/customers/detail/CustomerDetailHeader";

import {
    CustomerDetailUnavailable,
} from "@/components/dashboard/platform/customers/detail/CustomerDetailUnavailable";

import {
    CustomerDetailLoadingState,
    CustomerDetailErrorState,
    CustomerDetailInvalidState,
} from "@/components/dashboard/platform/customers/detail/CustomerDetailStates";

import {
    useMerchantCustomerDetailPage,
} from "@/hooks/pages/merchant/useMerchantCustomerDetailPage";

export default function CustomerDetailPage() {
    const params =
        useParams<{
            customerId: string;
        }>();

    const customerId =
        params.customerId;

    if (!customerId) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <CustomerDetailInvalidState
                        customerId=""
                    />
                </Container>
            </Page>
        );
    }

    const page =
        useMerchantCustomerDetailPage(
            customerId,
        );

    if (
        page.status === "waiting"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <CustomerDetailLoadingState />
                </Container>
            </Page>
        );
    }

    if (
        page.status === "error"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <CustomerDetailBreadcrumb
                        customerId={
                            customerId
                        }
                    />

                    <div className="mt-6">
                        <CustomerDetailErrorState
                            error={
                                page.error ??
                                new Error(
                                    "Unable to load customer.",
                                )
                            }
                            onRetry={
                                page.refresh
                            }
                        />
                    </div>
                </Container>
            </Page>
        );
    }

    return (
        <Page>
            <Container className="py-8 lg:py-10">
                <Stack gap={8}>
                    <CustomerDetailBreadcrumb
                        customerId={
                            customerId
                        }
                    />

                    {page.customer ? (
                        <>
                            <CustomerDetailHeader
                                customer={
                                    page.customer
                                }
                            />

                            {/*
                             * Real customer-detail sections should be
                             * added here only after merchant-side customer
                             * retrieval is exposed.
                             *
                             * Planned sections:
                             *
                             * - Customer overview
                             * - Wallet
                             * - Smart Account
                             * - Subscriptions
                             * - Billing
                             * - Permissions
                             * - Transactions
                             * - Activity
                             *
                             * They should consume actual API/SDK records,
                             * never synthetic values.
                             */}
                        </>
                    ) : (
                        <CustomerDetailUnavailable
                            customerId={
                                customerId
                            }
                        />
                    )}
                </Stack>
            </Container>
        </Page>
    );
}