"use client";

import {
    AlertTriangle,
    ArrowLeft,
    CreditCard,
    Loader2,
} from "lucide-react";

import Link from "next/link";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

////////////////////////////////////////////////////////////
// LOADING
////////////////////////////////////////////////////////////

export function SubscriptionDetailLoadingState() {
    return (
        <Card>
            <CardContent className="flex min-h-[360px] items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    Loading subscription...
                </div>
            </CardContent>
        </Card>
    );
}

////////////////////////////////////////////////////////////
// INVALID ID
////////////////////////////////////////////////////////////

export function SubscriptionDetailInvalidState({
    subscriptionId,
}: {
    subscriptionId: string;
}) {
    return (
        <Card>
            <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <CreditCard className="size-5 text-muted-foreground" />
                </div>

                <h2 className="mt-4 text-lg font-semibold">
                    Invalid subscription ID
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    "{subscriptionId}" is not a valid subscription identifier.
                </p>

                <Button
                    render={
                        <Link href="/dashboard/platform/subscriptions">
                            <ArrowLeft />
                            Back to subscriptions
                        </Link>
                    }
                    className="mt-5"
                    variant="outline"
                />
            </CardContent>
        </Card>
    );
}

////////////////////////////////////////////////////////////
// NOT EXPOSED
////////////////////////////////////////////////////////////

export function SubscriptionDetailNotExposedState({
    subscriptionId,
}: {
    subscriptionId: number;
}) {
    return (
        <Card>
            <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <CreditCard className="size-5 text-muted-foreground" />
                </div>

                <h2 className="mt-4 text-lg font-semibold">
                    Subscription details are not exposed yet
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                    The merchant dashboard is connected to the authenticated
                    merchant resource, but the SDK/API operation required to
                    retrieve subscription #{subscriptionId} has not been
                    exposed yet.
                </p>

                <p className="mt-3 max-w-lg text-xs leading-5 text-muted-foreground">
                    No subscription, customer, billing, payment, or activity
                    data is being fabricated on this page.
                </p>

                <Button
                    render={
                        <Link href="/dashboard/platform/subscriptions">
                            <ArrowLeft />
                            Back to subscriptions
                        </Link>
                    }
                    className="mt-5"
                    variant="outline"
                />
            </CardContent>
        </Card>
    );
}

////////////////////////////////////////////////////////////
// NOT FOUND
////////////////////////////////////////////////////////////

export function SubscriptionDetailNotFoundState({
    subscriptionId,
}: {
    subscriptionId: number;
}) {
    return (
        <Card>
            <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <CreditCard className="size-5 text-muted-foreground" />
                </div>

                <h2 className="mt-4 text-lg font-semibold">
                    Subscription not found
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    No subscription record was returned for subscription #
                    {subscriptionId}.
                </p>

                <Button
                    render={
                        <Link href="/dashboard/platform/subscriptions">
                            <ArrowLeft />
                            Back to subscriptions
                        </Link>
                    }
                    className="mt-5"
                    variant="outline"
                />
            </CardContent>
        </Card>
    );
}

////////////////////////////////////////////////////////////
// ERROR
////////////////////////////////////////////////////////////

export function SubscriptionDetailErrorState({
    error,
    onRetry,
}: {
    error: Error;

    onRetry: () => void;
}) {
    return (
        <Card>
            <CardContent className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="size-5 text-destructive" />
                </div>

                <h2 className="mt-4 text-lg font-semibold">
                    Unable to load subscription
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    {error.message}
                </p>

                <Button
                    variant="outline"
                    className="mt-5"
                    onClick={onRetry}
                >
                    Try again
                </Button>
            </CardContent>
        </Card>
    );
}