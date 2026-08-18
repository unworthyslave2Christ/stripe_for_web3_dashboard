"use client";

import {
    type FormEvent,
    useState,
} from "react";

import {
    ArrowRight,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input";

import {
    Label,
} from "@/components/ui/label";

import {
    WalletButton,
} from "@/components/wallet/WalletButton";

interface CustomerOnboardingFormProps {
    onSubmit: (
        input: {
            displayName: string;

            email: string;
        },
    ) => Promise<unknown>;

    loading: boolean;

    disabled?: boolean;

    error:
        | Error
        | null;
}

export function CustomerOnboardingForm({
    onSubmit,
    loading,
    disabled = false,
    error,
}: CustomerOnboardingFormProps) {

    const [
        displayName,
        setDisplayName,
    ] = useState("");

    const [
        email,
        setEmail,
    ] = useState("");

    const [
        validationError,
        setValidationError,
    ] =
        useState<string | null>(
            null,
        );

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setValidationError(
            null,
        );

        if (!displayName.trim()) {
            setValidationError(
                "Please enter your name.",
            );

            return;
        }

        if (!email.trim()) {
            setValidationError(
                "Please enter your email address.",
            );

            return;
        }

        await onSubmit({
            displayName,

            email,
        });
    }

    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="space-y-6"
        >

            <div className="space-y-2">

                <Label htmlFor="customer-name">
                    Name
                </Label>

                <Input
                    id="customer-name"
                    value={displayName}
                    onChange={(event) =>
                        setDisplayName(
                            event.target.value,
                        )
                    }
                    placeholder="Your name"
                    autoComplete="name"
                    disabled={
                        loading ||
                        disabled
                    }
                />

            </div>

            <div className="space-y-2">

                <Label htmlFor="customer-email">
                    Email
                </Label>

                <Input
                    id="customer-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value,
                        )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={
                        loading ||
                        disabled
                    }
                />

                <p className="text-xs text-muted-foreground">
                    Used for customer notifications and account communication.
                </p>

            </div>

            {validationError && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                    {validationError}
                </div>
            )}

            {error && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                    {error.message}
                </div>
            )}

            <WalletButton
                label="Customer wallet"
            />

            <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                    loading ||
                    disabled
                }
            >
                {loading
                    ? "Creating your Smart Account..."
                    : "Create customer account"}

                {!loading && (
                    <ArrowRight />
                )}
            </Button>

        </form>
    );
}