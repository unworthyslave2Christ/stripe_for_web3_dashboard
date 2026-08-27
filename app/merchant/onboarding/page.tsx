"use client";

import {
    useEffect,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Container,
} from "@/components/layout/Container";

import {
    Page,
} from "@/components/layout/Page";

import {
    MerchantOnboardingForm,
} from "@/components/onboarding/MerchantOnboardingForm";

import {
    MerchantOnboardingState,
} from "@/components/onboarding/MerchantOnboardingState";

import {
    OnboardingHeader,
} from "@/components/onboarding/OnboardingHeader";

import {
    OnboardingShell,
} from "@/components/onboarding/OnboardingShell";

import {
    useMerchantOnboardingPage,
} from "@/hooks/pages/merchant/useMerchantOnboardingPage";

export default function MerchantOnboardingPage() {
    const router =
        useRouter();

    const onboarding =
        useMerchantOnboardingPage();
        

    useEffect(
        () => {
            if (
                onboarding.status ===
                "complete"
            ) {
                router.replace(
                    "/dashboard",
                );
            }
        },
        [
            onboarding.status,
            router,
        ],
    );

    return (
        <OnboardingShell>

            <Page>

                <Container className="py-12">

                    <div className="mx-auto max-w-2xl">

                        <OnboardingHeader
                            eyebrow="Merchant onboarding"
                            title="Create your merchant account"
                            description="Set up your merchant identity, payout wallet, and metadata before entering the merchant dashboard."
                        />

                        <div className="mt-8 space-y-4">

                            <MerchantOnboardingState
                                status={
                                    onboarding.status
                                }
                                merchant={
                                    onboarding.merchant
                                }
                            />

                            {(
                                onboarding.status ===
                                    "not-created" ||
                                onboarding.status ===
                                    "disconnected"
                            ) && (

                                <Card>

                                    <CardContent className="pt-6">

                                        <MerchantOnboardingForm
                                            address={
                                                onboarding.ownerWallet
                                            }

                                            authenticated={
                                                Boolean(
                                                    onboarding.ownerWallet,
                                                )
                                            }

                                            onSubmit={
                                                onboarding.createMerchant
                                            }

                                            loading={
                                                onboarding.creationLoading
                                            }

                                            error={
                                                onboarding.creationError ??
                                                onboarding.error
                                            }
                                        />

                                    </CardContent>

                                </Card>
                            )}

                        </div>

                    </div>

                </Container>

            </Page>

        </OnboardingShell>
    );
}