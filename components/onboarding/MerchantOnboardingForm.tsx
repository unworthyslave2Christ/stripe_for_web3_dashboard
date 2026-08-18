"use client";

import {
    type FormEvent,
    useEffect,
    useState,
} from "react";

import type {
    Address,
} from "viem";

import {
    ArrowRight,
    WalletCards,
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
    Textarea,
} from "@/components/ui/textarea";

import {
    WalletButton,
} from "@/components/wallet/WalletButton";

////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

interface MerchantOnboardingFormProps {
    address:
        | string
        | undefined;

    authenticated: boolean;

    onSubmit: (
        input: {
            name: string;

            payoutWallet: Address;

            metadataURI: string;
        },
    ) => Promise<unknown>;

    loading: boolean;

    error:
        | Error
        | null;
}

////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////

export function MerchantOnboardingForm({
    address,
    authenticated,
    onSubmit,
    loading,
    error,
}: MerchantOnboardingFormProps) {

    const [
        name,
        setName,
    ] = useState("");

    const [
        payoutWallet,
        setPayoutWallet,
    ] = useState("");

    const [
        metadataURI,
        setMetadataURI,
    ] = useState("");

    const [
        validationError,
        setValidationError,
    ] =
        useState<string | null>(
            null,
        );

    ////////////////////////////////////////////////////////////
    // DEFAULT PAYOUT WALLET
    ////////////////////////////////////////////////////////////

    useEffect(() => {

        if (
            address &&
            !payoutWallet
        ) {
            setPayoutWallet(
                address,
            );
        }

    }, [
        address,
        payoutWallet,
    ]);

    ////////////////////////////////////////////////////////////
    // SUBMIT
    ////////////////////////////////////////////////////////////

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setValidationError(null);

        if (!name.trim()) {
            setValidationError(
                "Please enter your merchant or brand name.",
            );

            return;
        }

        if (!payoutWallet.trim()) {
            setValidationError(
                "Please enter a payout wallet.",
            );

            return;
        }

        if (!metadataURI.trim()) {
            setValidationError(
                "Please enter the merchant metadata URI.",
            );

            return;
        }

        try {

            await onSubmit({
                name,

                payoutWallet:
                    payoutWallet as Address,

                metadataURI,
            });

        } catch {
            // Workflow hook owns the error.
        }
    }

    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="space-y-6"
        >

            {/* NAME */}

            <div className="space-y-2">

                <Label htmlFor="merchant-name">
                    Merchant name
                </Label>

                <Input
                    id="merchant-name"
                    value={name}
                    onChange={(event) =>
                        setName(
                            event.target.value,
                        )
                    }
                    placeholder="ACMEFLOW"
                    autoComplete="organization"
                    disabled={loading}
                />

                <p className="text-xs text-muted-foreground">
                    Your company or brand name shown throughout Stripe for Web3.
                </p>

            </div>

            {/* PAYOUT WALLET */}

            <div className="space-y-2">

                <Label htmlFor="merchant-payout-wallet">
                    Payout wallet
                </Label>

                <Input
                    id="merchant-payout-wallet"
                    value={payoutWallet}
                    onChange={(event) =>
                        setPayoutWallet(
                            event.target.value,
                        )
                    }
                    placeholder="0x..."
                    className="font-mono text-xs"
                    disabled={loading}
                />

                <p className="text-xs leading-5 text-muted-foreground">
                    This wallet receives merchant payouts. Your connected
                    wallet is used as the default.
                </p>

            </div>

            {/* METADATA */}

            <div className="space-y-2">

                <Label htmlFor="merchant-metadata">
                    Metadata URI
                </Label>

                <Textarea
                    id="merchant-metadata"
                    value={metadataURI}
                    onChange={(event) =>
                        setMetadataURI(
                            event.target.value,
                        )
                    }
                    placeholder="ipfs://..."
                    className="min-h-24 font-mono text-xs"
                    disabled={loading}
                />

                <p className="text-xs leading-5 text-muted-foreground">
                    URI referencing the metadata associated with this merchant.
                </p>

            </div>

            {/* WALLET */}

            <div className="rounded-xl border bg-muted/20 p-4">

                <div className="flex items-start gap-3">

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">

                        <WalletCards className="size-4 text-muted-foreground" />

                    </div>

                    <div>

                        <p className="text-sm font-medium">
                            Merchant owner wallet
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Connect the wallet that will authorize merchant operations.
                        </p>

                    </div>

                </div>

                <div className="mt-4">

                    <WalletButton
                        label="Merchant wallet"
                    />

                </div>

            </div>

            {/* ERRORS */}

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

            {/* SUBMIT */}

            <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                    loading ||
                    !authenticated
                }
            >
                {loading
                    ? "Creating merchant..."
                    : "Create merchant"}

                {!loading && (
                    <ArrowRight />
                )}
            </Button>

        </form>
    );
}