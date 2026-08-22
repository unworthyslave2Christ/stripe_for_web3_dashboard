"use client";

import {
    useState,
} from "react";

import {
    KeyRound,
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
    Section,
} from "@/components/layout/Section";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    DeveloperEnvironmentSwitcher,
} from "@/components/dashboard/developers/DeveloperEnvironmentSwitcher";

import {
    DeveloperNotice,
} from "@/components/dashboard/developers/DeveloperNotice";

import {
    DeveloperOverview,
} from "@/components/dashboard/developers/DeveloperOverview";

import {
    DeveloperToolbar,
} from "@/components/dashboard/developers/DeveloperToolbar";

import {
    ApiKeysTable,
} from "@/components/dashboard/developers/ApiKeysTable";

import {
    ApiKeysPagination,
} from "@/components/dashboard/developers/ApiKeysPagination";

import {
    ApiKeysDialog,
} from "@/components/dashboard/developers/ApiKeysDialog";

import {
    useMerchantApiKeysPage,
} from "@/hooks/pages/merchant/useMerchantApiKeysPage";

export default function DevelopersPage() {
    const page =
        useMerchantApiKeysPage();

    const [
        createDialogOpen,
        setCreateDialogOpen,
    ] = useState(false);

    const [
        environment,
        setEnvironment,
    ] = useState<
        "TEST" |
        "LIVE"
    >("TEST");

    /*
     * Merchant identity remains the canonical
     * authenticated resource for this page.
     */
    if (
        page.merchant.status ===
            "disconnected"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <Stack gap={6}>

                        <PageHeader
                            eyebrow="Developers"
                            title="API keys"
                            description="Manage the credentials your server-side integrations use to communicate with Stripe for Web3."
                        />

                        <Divider />

                        <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                            <p className="text-sm font-medium">
                                Merchant authentication required
                            </p>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Connect the authenticated merchant account before managing developer resources.
                            </p>

                        </div>

                    </Stack>
                </Container>
            </Page>
        );
    }

    if (
        page.merchant.status ===
            "loading" ||
        page.merchant.status ===
            "waiting"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <Stack gap={6}>

                        <PageHeader
                            eyebrow="Developers"
                            title="API keys"
                            description="Manage the credentials your server-side integrations use to communicate with Stripe for Web3."
                        />

                        <Divider />

                        <div className="rounded-xl border bg-card p-8">

                            <div className="animate-pulse space-y-3">
                                <div className="h-4 w-32 rounded bg-muted" />
                                <div className="h-4 w-64 rounded bg-muted" />
                                <div className="h-32 rounded bg-muted" />
                            </div>

                        </div>

                    </Stack>
                </Container>
            </Page>
        );
    }

    if (
        page.merchant.status ===
            "error"
    ) {
        return (
            <Page>
                <Container className="py-8 lg:py-10">
                    <Stack gap={6}>

                        <PageHeader
                            eyebrow="Developers"
                            title="API keys"
                            description="Manage the credentials your server-side integrations use to communicate with Stripe for Web3."
                        />

                        <Divider />

                        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8">

                            <p className="text-sm font-medium">
                                Unable to load merchant account
                            </p>

                            <p className="mt-2 text-sm text-muted-foreground">
                                {
                                    page.merchant.error?.message ??
                                    "The merchant resource could not be loaded."
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

                    </Stack>
                </Container>
            </Page>
        );
    }

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    <PageHeader
                        eyebrow="Developers"
                        title="API keys"
                        description="Manage the credentials your server-side integrations use to communicate with Stripe for Web3."
                        actions={
                            <Inline gap={2}>

                                <Button
                                    variant="outline"
                                    render={
                                        <a href="#documentation">
                                            Documentation
                                        </a>
                                    }
                                />

                                <Button
                                    disabled={
                                        !page.actions
                                            .create
                                    }
                                    onClick={() =>
                                        setCreateDialogOpen(
                                            true,
                                        )
                                    }
                                >
                                    <KeyRound />
                                    Create API key
                                </Button>

                            </Inline>
                        }
                    />

                    <Divider />

                    <DeveloperOverview
                        summary={
                            page.summary
                        }
                        available={
                            page.apiKeys.available
                        }
                    />

                    <Section
                        title="API access"
                        description="Choose the environment whose credentials and integrations you are managing."
                    >

                        <Stack gap={4}>

                            <DeveloperEnvironmentSwitcher
                                value={
                                    environment
                                }
                                onChange={
                                    setEnvironment
                                }
                            />

                            <DeveloperNotice
                                available={
                                    page.apiKeys.available
                                }
                            />

                        </Stack>

                    </Section>

                    <Section
                        title="API keys"
                        description="Credentials used by your server-side integrations."
                    >

                        <Stack gap={4}>

                            <DeveloperToolbar
                                search={
                                    page.filters.search
                                }
                                onSearchChange={
                                    page.filters
                                        .setSearch
                                }
                                environment={
                                    page.filters
                                        .environment
                                }
                                onEnvironmentChange={
                                    page.filters
                                        .setEnvironment
                                }
                                status={
                                    page.filters.status
                                }
                                onStatusChange={
                                    page.filters
                                        .setStatus
                                }
                                refreshAvailable={
                                    false
                                }
                                exportAvailable={
                                    page.actions
                                        .export
                                }
                                refreshing={
                                    page.apiKeys
                                        .refreshing
                                }
                                onRefresh={
                                    () => {}
                                }
                                disabled={
                                    !page.apiKeys
                                        .available
                                }
                            />

                            <ApiKeysTable
                                apiKeys={
                                    page.apiKeys
                                        .data
                                }
                                available={
                                    page.apiKeys
                                        .available
                                }
                            />

                            <ApiKeysPagination
                                available={
                                    page.apiKeys
                                        .available
                                }
                                total={
                                    page.apiKeys
                                        .data
                                        .length
                                }
                            />

                        </Stack>

                    </Section>

                    {page.merchant.refreshing && (
                        <p className="text-xs text-muted-foreground">
                            Refreshing merchant data...
                        </p>
                    )}

                </Stack>

            </Container>

            <ApiKeysDialog
                open={
                    createDialogOpen
                }
                onOpenChange={
                    setCreateDialogOpen
                }
                available={
                    page.actions.create
                }
            />

        </Page>
    );
}