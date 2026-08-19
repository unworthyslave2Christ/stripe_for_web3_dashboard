import {
    Globe2,
    KeyRound,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Grid,
} from "@/components/layout/Grid";

import {
    Section,
} from "@/components/layout/Section";

import type {
    SmartAccountViewModel,
} from "@/types/smart-account";

import {
    SmartAccountOverviewCard,
} from "./SmartAccountOverviewCard";

export function SmartAccountOverview({
    account,
}: {
    account:
        SmartAccountViewModel;
}) {
    return (
        <Section
            title="Overview"
            description="A summary of your Smart Account."
        >

            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <SmartAccountOverviewCard
                    title="Status"
                    value={
                        account.status
                    }
                    description="Current account state"
                    icon={
                        ShieldCheck
                    }
                />

                <SmartAccountOverviewCard
                    title="Owner wallet"
                    value={
                        account.ownerWallet
                            ? `${account.ownerWallet.slice(0, 6)}...${account.ownerWallet.slice(-4)}`
                            : "Unavailable"
                    }
                    description="Connected wallet"
                    icon={
                        WalletCards
                    }
                />

                <SmartAccountOverviewCard
                    title="Network"
                    value={
                        account.network ??
                        "Unknown"
                    }
                    description="Current blockchain network"
                    icon={
                        Globe2
                    }
                />

                <SmartAccountOverviewCard
                    title="Permissions"
                    value={
                        account.activePermissions !==
                        undefined
                            ? String(
                                account.activePermissions,
                            )
                            : "—"
                    }
                    description={
                        account.activePermissions !==
                        undefined
                            ? "Active authorizations"
                            : "Permission data unavailable"
                    }
                    icon={
                        KeyRound
                    }
                />

            </Grid>

        </Section>
    );
}