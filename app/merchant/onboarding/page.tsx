"use client";

import {
    useEffect,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    Container,
} from "@/components/layout/Container";

import {
    Page,
} from "@/components/layout/Page";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    MerchantOnboardingForm,
} from "@/components/onboarding/MerchantOnboardingForm";

import {
    OnboardingHeader,
} from "@/components/onboarding/OnboardingHeader";

import {
    OnboardingShell,
} from "@/components/onboarding/OnboardingShell";

import {
    useMerchantOnboardingPage,
} from "@/hooks/onboarding/useMerchantOnboardingPage";

export default function MerchantOnboardingPage() {

    const router =
        useRouter();

    const onboarding =
        useMerchantOnboardingPage();

    useEffect(() => {

        if (
            onboarding.status ===
            "complete"
        ) {
            router.replace(
                "/dashboard",
            );
        }

    }, [
        onboarding.status,
        router,
    ]);

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

                        <Card className="mt-8">

                            <CardContent className="pt-6">

                                <MerchantOnboardingForm
                                    address={
                                        onboarding.address
                                    }

                                    authenticated={
                                        onboarding.authenticated
                                    }

                                    onSubmit={
                                        onboarding.createMerchant
                                    }

                                    loading={
                                        onboarding.creationLoading
                                    }

                                    error={
                                        onboarding.creationError
                                    }
                                />

                            </CardContent>

                        </Card>

                    </div>

                </Container>

            </Page>

        </OnboardingShell>
    );
}