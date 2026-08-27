"use client";

import {
    useState,
} from "react";

import {
    Copy,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input";

import {
    Textarea,
} from "@/components/ui/textarea";

import {
    Label,
} from "@/components/ui/label";

import {
    SettingsSection,
} from "./SettingsSection";

interface MerchantIdentitySettingsProps {
    merchantId:
        | number
        | string;

    name: string;

    metadataUri: string;

    editable: boolean;

    onChange: (
        patch: {
            name?: string;
            metadataUri?: string;
        },
    ) => void;

    onSave: () => void;

    saving: boolean;
}

export function MerchantIdentitySettings({
    merchantId,
    name,
    metadataUri,
    editable,
    onChange,
    onSave,
    saving,
}: MerchantIdentitySettingsProps) {
    const [
        copied,
        setCopied,
    ] = useState(false);

    async function copyMerchantId() {
        await navigator.clipboard.writeText(
            String(merchantId),
        );

        setCopied(true);

        window.setTimeout(
            () => {
                setCopied(false);
            },
            1200,
        );
    }

    return (
        <SettingsSection
            title="Merchant identity"
            description="Configure the public identity information associated with your merchant."
        >
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="merchant-name">
                        Merchant name
                    </Label>

                    <Input
                        id="merchant-name"
                        value={name}
                        disabled={!editable}
                        onChange={(event) =>
                            onChange({
                                name:
                                    event.target
                                        .value,
                            })
                        }
                        placeholder="Your brand name"
                    />

                    <p className="text-xs text-muted-foreground">
                        This is the merchant or brand
                        name displayed throughout
                        Stripe for Web3.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="metadata-uri">
                        Metadata URI
                    </Label>

                    <Textarea
                        id="metadata-uri"
                        value={metadataUri}
                        disabled={!editable}
                        onChange={(event) =>
                            onChange({
                                metadataUri:
                                    event.target
                                        .value,
                            })
                        }
                        placeholder="ipfs://..."
                        className="min-h-20 font-mono text-xs"
                    />

                    <p className="text-xs text-muted-foreground">
                        URI pointing to the merchant
                        metadata associated with this
                        merchant.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>
                        Merchant ID
                    </Label>

                    <div className="flex gap-2">
                        <Input
                            value={String(
                                merchantId,
                            )}
                            readOnly
                            className="font-mono"
                        />

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={
                                copyMerchantId
                            }
                            aria-label="Copy merchant ID"
                        >
                            <Copy />
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Your canonical merchant
                        identifier.
                    </p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="text-sm font-medium">
                        Persistence status
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Merchant update operations are
                        not yet exposed by the SDK.
                        Changes can be prepared locally,
                        but cannot yet be persisted.
                    </p>
                </div>

                <div className="flex justify-end">
                    <Button
                        disabled={
                            !editable ||
                            saving
                        }
                        onClick={onSave}
                    >
                        {saving
                            ? "Saving..."
                            : "Save changes"}
                    </Button>
                </div>
            </div>
        </SettingsSection>
    );
}