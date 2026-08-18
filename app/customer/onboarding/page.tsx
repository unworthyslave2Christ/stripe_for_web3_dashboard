"use client";

import {
    useEffect,
} from "react";

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
    CustomerOnboardingForm,
} from "@/components/onboarding/CustomerOnboardingForm";

import {
    OnboardingHeader,
} from "@/components/onboarding/OnboardingHeader";

import {
    OnboardingShell,
} from "@/components/onboarding/OnboardingShell";

import {
    useCustomerOnboardingPage,
} from "@/hooks/onboarding/useCustomerOnboardingPage";

export default function CustomerOnboardingPage() {

    const onboarding =
        useCustomerOnboardingPage();

    useEffect(() => {

        if (
            onboarding.customer &&
            onboarding.customerStatus ===
                "ready"
        ) {
            // Placeholder navigation.
            //
            // Later:
            // router.push("/portal");
        }

    }, [
        onboarding.customer,
        onboarding.customerStatus,
    ]);

    return (
        <OnboardingShell>

            <Page>

                <Container className="py-12">

                    <div className="mx-auto max-w-2xl">

                        <OnboardingHeader
                            eyebrow="Customer onboarding"
                            title="Create your Smart Account"
                            description="Connect your wallet and create your Stripe for Web3 customer account so you can manage subscriptions and billing."
                        />

                        <Card className="mt-8">

                            <CardContent className="pt-6">

                                <CustomerOnboardingForm
                                    onSubmit={
                                        onboarding.register
                                    }

                                    loading={
                                        onboarding.registrationLoading
                                    }

                                    disabled={
                                        !onboarding.authenticated
                                    }

                                    error={
                                        onboarding.registrationError
                                        ??
                                        onboarding.customerError
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