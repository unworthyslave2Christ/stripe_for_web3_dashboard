"use client";

import {
    Copy,
} from "lucide-react";

import {
    useState,
} from "react";

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
    SettingsSection,
} from "./SettingsSection";

interface MerchantIdentitySettingsProps {
    merchantId: number;

    initialName: string;

    initialMetadataUri: string;
}

export function MerchantIdentitySettings({
    merchantId,
    initialName,
    initialMetadataUri,
}: MerchantIdentitySettingsProps) {
    const [
        name,
        setName,
    ] = useState(initialName);

    const [
        metadataUri,
        setMetadataUri,
    ] = useState(
        initialMetadataUri,
    );

    async function copyMerchantId() {
        await navigator.clipboard.writeText(
            String(merchantId),
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
                        onChange={(event) =>
                            setName(
                                event.target.value,
                            )
                        }
                        placeholder="Your brand name"
                    />

                    <p className="text-xs text-muted-foreground">
                        This is the merchant or brand name displayed throughout Stripe for Web3.
                    </p>

                </div>

                <div className="space-y-2">

                    <Label htmlFor="metadata-uri">
                        Metadata URI
                    </Label>

                    <Textarea
                        id="metadata-uri"
                        value={metadataUri}
                        onChange={(event) =>
                            setMetadataUri(
                                event.target.value,
                            )
                        }
                        placeholder="ipfs://..."
                        className="min-h-20 font-mono text-xs"
                    />

                    <p className="text-xs text-muted-foreground">
                        URI pointing to the merchant metadata associated with this merchant.
                    </p>

                </div>

                <div className="space-y-2">

                    <Label>
                        Merchant ID
                    </Label>

                    <div className="flex gap-2">

                        <Input
                            value={
                                String(
                                    merchantId,
                                )
                            }
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
                        Your protocol-level merchant identifier.
                    </p>

                </div>

            </div>

        </SettingsSection>
    );
}