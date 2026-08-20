"use client";

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
    CustomerPermissionsErrorState,
} from "@/components/portal/permissions/CustomerPermissionsErrorState";

import {
    CustomerPermissionsHeader,
} from "@/components/portal/permissions/CustomerPermissionsHeader";

import {
    CustomerPermissionsList,
} from "@/components/portal/permissions/CustomerPermissionsList";

import {
    CustomerPermissionsLoadingState,
} from "@/components/portal/permissions/CustomerPermissionsLoadingState";

import {
    CustomerPermissionsOverview,
} from "@/components/portal/permissions/CustomerPermissionsOverview";

import {
    CustomerPermissionsPagination,
} from "@/components/portal/permissions/CustomerPermissionsPagination";

import {
    CustomerPermissionsToolbar,
} from "@/components/portal/permissions/CustomerPermissionsToolbar";

import {
    useCustomerPermissionsPage,
} from "@/hooks/pages/customer/useCustomerPermissionsPage";

export default function CustomerPermissionsPage() {

    const page =
        useCustomerPermissionsPage();

    ////////////////////////////////////////////////////////////
    // LOADING
    ////////////////////////////////////////////////////////////

    if (
        page.loading &&
        !page.customer.customer
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerPermissionsLoadingState />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // ERROR
    ////////////////////////////////////////////////////////////

    if (
        page.error &&
        !page.customer.customer
    ) {
        return (
            <Page>

                <Container className="py-8 lg:py-10">

                    <CustomerPermissionsErrorState
                        error={
                            page.error
                        }
                        onRetry={
                            page.customer.refresh
                        }
                    />

                </Container>

            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // RENDER
    ////////////////////////////////////////////////////////////

    const permissionSummary =
        page.permissions.summary;

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <CustomerPermissionsHeader
                        demo={
                            page.mode ===
                            "demo"
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <CustomerPermissionsOverview
                        activePermissions={
                            permissionSummary.active
                        }

                        authorizedSubscriptions={
                            permissionSummary.authorizedSubscriptionCount
                        }

                        capabilities={
                            permissionSummary.capabilityCount
                        }

                        needsAttention={
                            permissionSummary.needsAttention
                        }
                    />

                    {/* BILLING AUTHORIZATION */}

                    <Section
                        title="Billing authorization"
                        description="The authorization most directly associated with your active recurring subscriptions."
                    >

                        <CustomerBillingPermissionCard
                            permission={
                                page.billingPermission
                            }

                            smartAccount={
                                page.customer.customer
                                    ?.smartAccount
                            }

                            activeSubscriptions={
                                page.subscriptions.subscriptions.filter(
                                    (
                                        subscription: any,
                                    ) =>
                                        subscription.status ===
                                        "ACTIVE",
                                ).length
                            }

                            demo={
                                page.mode ===
                                "demo"
                            }
                        />

                    </Section>

                    {/* PERMISSIONS */}

                    <Section
                        title="Permissions"
                        description="Permissions currently associated with your Smart Account."
                    >

                        <Stack gap={4}>

                            <CustomerPermissionsToolbar
                                search={
                                    page.permissions.search
                                }

                                onSearchChange={
                                    page.permissions.setSearch
                                }

                                status={
                                    page.permissions.status
                                }

                                onStatusChange={
                                    page.permissions.setStatusFilter
                                }
                            />

                            <CustomerPermissionsList
                                permissions={
                                    page.permissions.items
                                }
                            />

                            <CustomerPermissionsPagination
                                page={
                                    page.permissions.page
                                }

                                totalPages={
                                    page.permissions.totalPages
                                }

                                totalCount={
                                    page.permissions.totalCount
                                }

                                pageSize={
                                    page.permissions.pageSize
                                }

                                onPageChange={
                                    page.permissions.setPage
                                }
                            />

                        </Stack>

                    </Section>

                    {/* GUIDANCE */}

                    <Section
                        title="Permission guidance"
                        description="Important information about Smart Account authorization."
                    >

                        <CustomerPermissionGuidance />

                    </Section>

                    {page.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing permission-related data...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}