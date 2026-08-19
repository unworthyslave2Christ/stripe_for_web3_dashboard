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
    CustomerOnboardingForm,
} from "@/components/onboarding/CustomerOnboardingForm";

import {
    CustomerOnboardingState,
} from "@/components/onboarding/CustomerOnboardingState";

import {
    OnboardingHeader,
} from "@/components/onboarding/OnboardingHeader";

import {
    OnboardingShell,
} from "@/components/onboarding/OnboardingShell";

import {
    CustomerOnboardingStatus,
    useCustomerOnboardingPage,
} from "@/hooks/onboarding/useCustomerOnboardingPage";

export default function CustomerOnboardingPage() {

    const router =
        useRouter();

    const onboarding =
        useCustomerOnboardingPage();

    ////////////////////////////////////////////////////////////
    // COMPLETE REGISTRATION
    ////////////////////////////////////////////////////////////

    useEffect(() => {

        if (
            onboarding.status ===
            "existing"
        ) {
            router.replace(
                "/portal",
            );
        }

    }, [
        onboarding.status,
        router,
    ]);

    ////////////////////////////////////////////////////////////
    // RENDER
    ////////////////////////////////////////////////////////////

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

                        <div className="mt-8 space-y-4">

                            <CustomerOnboardingState
                                status={
                                    onboarding.status
                                }

                                smartAccount={
                                    onboarding.customer
                                        ?.smartAccount
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

                            )}

                        </div>

                    </div>

                </Container>

            </Page>

        </OnboardingShell>
    );
}