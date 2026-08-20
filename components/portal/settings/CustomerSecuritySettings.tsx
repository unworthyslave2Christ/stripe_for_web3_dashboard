"use client";

import {
    LockKeyhole,
    ShieldCheck,
    WalletCards,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {
    Label,
} from "@/components/ui/label";

import {
    Switch,
} from "@/components/ui/switch";

export function CustomerSecuritySettings({
    ownerWallet,
    confirmSensitiveActions,
    onConfirmSensitiveActionsChange,
    demo,
}: {
    ownerWallet:
        | string
        | undefined;

    confirmSensitiveActions:
        boolean;

    onConfirmSensitiveActionsChange:
        (
            value: boolean,
        ) => void;

    demo: boolean;
}) {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Security
                </CardTitle>

                <CardDescription>
                    Review the security controls associated with your customer account.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-5">

                <div className="rounded-lg border bg-muted/20 p-4">

                    <div className="flex gap-3">

                        <WalletCards className="mt-0.5 size-4 text-muted-foreground" />

                        <div>

                            <p className="text-sm font-medium">
                                Owner wallet
                            </p>

                            <p className="mt-1 break-all font-mono text-xs leading-5 text-muted-foreground">
                                {ownerWallet ??
                                    "Wallet unavailable"}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                This wallet controls ownership of the Smart Account.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="rounded-lg border bg-muted/20 p-4">

                    <div className="flex gap-3">

                        <ShieldCheck className="mt-0.5 size-4 text-muted-foreground" />

                        <div>

                            <p className="text-sm font-medium">
                                Smart Account authorization
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Active subscription permissions are displayed
                                and managed separately on the Permissions page.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex items-start justify-between gap-6 rounded-lg border p-4">

                    <div className="flex gap-3">

                        <LockKeyhole className="mt-0.5 size-4 text-muted-foreground" />

                        <div>

                            <Label
                                htmlFor="confirm-sensitive-actions"
                                className="text-sm font-medium"
                            >
                                Confirm sensitive actions
                            </Label>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Require an additional confirmation step
                                before sensitive customer actions.
                            </p>

                        </div>

                    </div>

                    <Switch
                        id="confirm-sensitive-actions"
                        checked={
                            confirmSensitiveActions
                        }
                        onCheckedChange={
                            onConfirmSensitiveActionsChange
                        }
                    />

                </div>

                {demo && (
                    <p className="text-xs text-muted-foreground">
                        Sensitive-action preference is currently local test-mode state.
                    </p>
                )}

            </CardContent>

        </Card>
    );
}