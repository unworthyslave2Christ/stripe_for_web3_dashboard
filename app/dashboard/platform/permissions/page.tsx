"use client";

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
    PermissionsToolbar,
} from "@/components/dashboard/platform/permissions/PermissionsToolbar";

import {
    PermissionsTable,
} from "@/components/dashboard/platform/permissions/PermissionsTable";

import {
    PermissionsPagination,
} from "@/components/dashboard/platform/permissions/PermissionsPagination";

import {
    PermissionsLoadingState,
    PermissionsErrorState,
    PermissionsEmptyState,
    PermissionsUnsupportedState,
} from "@/components/dashboard/platform/permissions/PermissionsStates";

import {
    useMerchantPermissionsPage,
} from "@/hooks/pages/merchant/useMerchantPermissionsPage";

export default function PermissionsPage() {
    const page =
        useMerchantPermissionsPage();

    ////////////////////////////////////////////////////////////
    // LOADING / WAITING
    ////////////////////////////////////////////////////////////

    if (
        page.status === "waiting" ||
        page.status === "loading"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <PermissionsLoadingState />
                </Container>
            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // ERROR
    ////////////////////////////////////////////////////////////

    if (
        page.status === "error"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <PermissionsErrorState
                        error={
                            page.merchant.error ??
                            new Error(
                                "Unable to load merchant account.",
                            )
                        }
                        onRetry={
                            page.merchant.refresh
                        }
                    />
                </Container>
            </Page>
        );
    }

    ////////////////////////////////////////////////////////////
    // PAGE
    ////////////////////////////////////////////////////////////

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Permissions"
                        title="Permissions"
                        description="Define and manage the actions your billing operators are authorized to perform."
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                    disabled={
                                        !page.actions.create.available
                                    }
                                >
                                    Export
                                </Button>

                                <Button
                                    disabled={
                                        !page.actions.create.available
                                    }
                                >
                                    Create policy
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    <PermissionsOverview
                        summary={
                            page.overview
                        }
                        available={
                            page.permissions.available
                        }
                    />

                    <Section
                        title="Permission management"
                        description="Search, inspect, and manage merchant-side billing authorization policies."
                    >

                        <Stack gap={4}>

                            <PermissionsToolbar
                                search={
                                    page.table.search
                                }
                                onSearchChange={
                                    page.table.setSearch
                                }
                                status={
                                    page.table.status
                                }
                                scope={
                                    page.table.scope
                                }
                                onStatusChange={
                                    page.table.setStatus
                                }
                                onScopeChange={
                                    page.table.setScope
                                }
                                available={
                                    page.permissions.available
                                }
                                onRefresh={
                                    page.actions.refresh.execute
                                }
                                refreshAvailable={
                                    page.actions.refresh.available
                                }
                                createAvailable={
                                    page.actions.create.available
                                }
                            />
                            {page.status ===
                            "unsupported" ? (
                                <PermissionsUnsupportedState />
                            ) : page.table.items.length ===
                              0 ? (
                                <PermissionsEmptyState />
                            ) : (
                                <PermissionsTable
                                    permissions={
                                        page.table.items
                                    }
                                    actionsAvailable={
                                        page.actions.create.available
                                    }
                                />
                            )}

                            <PermissionsPagination
                                page={
                                    page.pagination.page
                                }
                                total={
                                    page.pagination.total
                                }
                                pageSize={
                                    page.pagination.pageSize
                                }
                                hasPreviousPage={
                                    page.pagination.hasPreviousPage
                                }
                                hasNextPage={
                                    page.pagination.hasNextPage
                                }
                            />

                        </Stack>

                    </Section>

                    {page.permissions.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing permission data...
                        </p>
                    )}

                </Stack>

            </Container>

        </Page>
    );
}