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
    ApiKeysDialog,
} from "@/components/dashboard/developers/ApiKeysDialog";

import {
    ApiKeysTable,
} from "@/components/dashboard/developers/ApiKeysTable";

import {
    ApiKeysPagination,
} from "@/components/dashboard/developers/ApiKeysPagination";

export default function DevelopersPage() {
    const [
        createDialogOpen,
        setCreateDialogOpen,
    ] = useState(false);

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* PAGE HEADER */}

                    <PageHeader
                        eyebrow="Developers"
                        title="API keys"
                        description="Manage the credentials your server-side integrations use to communicate with Stripe for Web3."
                        actions={
                            <Inline gap={2}>

                                <Button variant="outline">
                                    Documentation
                                </Button>

                                <Button
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

                    {/* OVERVIEW */}

                    <DeveloperOverview />

                    {/* ENVIRONMENT */}

                    <Section
                        title="API access"
                        description="Choose the environment whose credentials and integrations you are managing."
                    >

                        <Stack gap={4}>

                            <DeveloperEnvironmentSwitcher />

                            <DeveloperNotice />

                        </Stack>

                    </Section>

                    {/* KEY MANAGEMENT */}

                    <Section
                        title="API keys"
                        description="Credentials used by your server-side integrations."
                    >

                        <Stack gap={4}>

                            <DeveloperToolbar />

                            <ApiKeysTable />

                            <ApiKeysPagination />

                        </Stack>

                    </Section>

                </Stack>

            </Container>

            <ApiKeysDialog
                open={createDialogOpen}
                onOpenChange={
                    setCreateDialogOpen
                }
            />

        </Page>
    );
}