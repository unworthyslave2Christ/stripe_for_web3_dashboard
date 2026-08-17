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
    Page,
} from "@/components/layout/Page";

import {
    Section,
} from "@/components/layout/Section";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    SmartAccountActions,
} from "@/components/portal/smart-account/SmartAccountActions";

import {
    SmartAccountActivity,
} from "@/components/portal/smart-account/SmartAccountActivity";

import {
    SmartAccountCapabilities,
} from "@/components/portal/smart-account/SmartAccountCapabilities";

import {
    SmartAccountHeader,
} from "@/components/portal/smart-account/SmartAccountHeader";

import {
    SmartAccountIdentityCard,
} from "@/components/portal/smart-account/SmartAccountIdentityCard";

import {
    SmartAccountOverview,
} from "@/components/portal/smart-account/SmartAccountOverview";

import {
    SmartAccountOwnerCard,
} from "@/components/portal/smart-account/SmartAccountOwnerCard";

import {
    SmartAccountPermissionCard,
} from "@/components/portal/smart-account/SmartAccountPermissionCard";

import {
    SmartAccountSecurity,
} from "@/components/portal/smart-account/SmartAccountSecurity";

export default function SmartAccountPage() {
    const account = {
        address:
            "0xf1cc103c9b156eE9c2C496f582075a3086eC2347",

        ownerWallet:
            "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",

        status:
            "ACTIVE" as const,

        network:
            "Arbitrum Sepolia",

        networkId:
            421614,

        createdAt:
            "June 04, 2025",

        activePermissions:
            1,

        billingAuthorization:
            "ACTIVE" as const,

        supportedAssets: [
            "USDC",
        ],
    };

    return (
        <Page>

            <Container className="py-8 lg:py-10">

                <Stack gap={8}>

                    {/* HEADER */}

                    <SmartAccountHeader
                        account={
                            account
                        }
                    />

                    <Divider />

                    {/* OVERVIEW */}

                    <SmartAccountOverview
                        account={
                            account
                        }
                    />

                    {/* IDENTITY */}

                    <Section
                        title="Account identity"
                        description="The addresses and network associated with your Smart Account."
                    >

                        <Grid className="grid-cols-1 gap-4 xl:grid-cols-2">

                            <SmartAccountIdentityCard
                                address={
                                    account.address
                                }
                                network={
                                    account.network
                                }
                            />

                            <SmartAccountOwnerCard
                                ownerWallet={
                                    account.ownerWallet
                                }
                            />

                        </Grid>

                    </Section>

                    {/* BILLING AUTHORIZATION */}

                    <Section
                        title="Billing authorization"
                        description="Permissions that allow your Smart Account to participate in active subscriptions."
                    >

                        <Grid className="grid-cols-1 gap-4 xl:grid-cols-2">

                            <SmartAccountPermissionCard
                                permissionStatus={
                                    account.billingAuthorization
                                }
                            />

                            <SmartAccountCapabilities />

                        </Grid>

                    </Section>

                    {/* ACTIVITY */}

                    <Section
                        title="Activity"
                        description="Recent events involving your Smart Account."
                    >

                        <SmartAccountActivity />

                    </Section>

                    {/* SECURITY */}

                    <Section
                        title="Security"
                        description="Important information about ownership and authorization."
                    >

                        <SmartAccountSecurity />

                    </Section>

                    {/* ACTIONS */}

                    <Section
                        title="Account actions"
                        description="Manage or inspect your Smart Account."
                    >

                        <SmartAccountActions
                            address={
                                account.address
                            }
                        />

                    </Section>

                </Stack>

            </Container>

        </Page>
    );
}