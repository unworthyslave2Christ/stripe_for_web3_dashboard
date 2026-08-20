"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    Check,
    Loader2,
    Save,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {
    Input,
} from "@/components/ui/input";

import {
    Label,
} from "@/components/ui/label";

export function CustomerProfileSettings({
    initialDisplayName,
    initialEmail,
    onSave,
}: {
    initialDisplayName:
        string;

    initialEmail:
        string;

    onSave:
        (input: {
            displayName: string;
            email: string;
        }) => Promise<unknown>;
}) {
    const [
        displayName,
        setDisplayName,
    ] = useState(
        initialDisplayName,
    );

    const [
        email,
        setEmail,
    ] = useState(
        initialEmail,
    );

    const [
        saving,
        setSaving,
    ] = useState(false);

    const [
        saved,
        setSaved,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState<string | null>(
        null,
    );

    useEffect(
        () => {
            setDisplayName(
                initialDisplayName,
            );

            setEmail(
                initialEmail,
            );
        },
        [
            initialDisplayName,
            initialEmail,
        ],
    );

    async function handleSave() {
        setError(null);
        setSaved(false);
        setSaving(true);

        try {
            await onSave({
                displayName,
                email,
            });

            setSaved(true);

            window.setTimeout(
                () => {
                    setSaved(false);
                },
                1500,
            );
        } catch (
            cause
        ) {
            setError(
                cause instanceof Error
                    ? cause.message
                    : "Unable to save profile.",
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Profile
                </CardTitle>

                <CardDescription>
                    Manage the customer information associated with your Stripe for Web3 account.
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="space-y-6">

                    <div className="space-y-2">

                        <Label htmlFor="customer-display-name">
                            Display name
                        </Label>

                        <Input
                            id="customer-display-name"
                            value={
                                displayName
                            }
                            onChange={(
                                event,
                            ) =>
                                setDisplayName(
                                    event.target.value,
                                )
                            }
                            placeholder="Your name"
                            disabled={
                                saving
                            }
                        />

                        <p className="text-xs text-muted-foreground">
                            This name identifies you throughout the customer portal.
                        </p>

                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="customer-email">
                            Email
                        </Label>

                        <Input
                            id="customer-email"
                            type="email"
                            value={
                                email
                            }
                            onChange={(
                                event,
                            ) =>
                                setEmail(
                                    event.target.value,
                                )
                            }
                            placeholder="you@example.com"
                            disabled={
                                saving
                            }
                        />

                        <p className="text-xs text-muted-foreground">
                            Used for customer notifications and account-related communication.
                        </p>

                    </div>

                    {error && (
                        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center gap-2">

                        <Button
                            onClick={
                                handleSave
                            }
                            disabled={
                                saving
                            }
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Saving
                                </>
                            ) : saved ? (
                                <>
                                    <Check />
                                    Saved
                                </>
                            ) : (
                                <>
                                    <Save />
                                    Save changes
                                </>
                            )}
                        </Button>

                        <p className="text-xs text-muted-foreground">
                            Profile persistence will use the customer API once the update operation is exposed.
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}