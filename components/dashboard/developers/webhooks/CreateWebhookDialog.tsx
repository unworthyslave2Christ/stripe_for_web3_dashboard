"use client";

import {
    Check,
    Copy,
    Webhook,
} from "lucide-react";

import {
    useState,
} from "react";

import {
    Button,
} from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Input,
} from "@/components/ui/input";

import {
    Label,
} from "@/components/ui/label";

export function CreateWebhookDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (
        open: boolean,
    ) => void;
}) {
    const [
        created,
        setCreated,
    ] = useState(false);

    const [
        copied,
        setCopied,
    ] = useState(false);

    const signingSecret =
        "whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    async function copySecret() {
        await navigator.clipboard.writeText(
            signingSecret,
        );

        setCopied(true);

        window.setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    function closeDialog() {
        setCreated(false);
        setCopied(false);

        onOpenChange(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={closeDialog}
        >
            <DialogContent className="sm:max-w-lg">

                {!created ? (
                    <>
                        <DialogHeader>

                            <DialogTitle>
                                Create webhook endpoint
                            </DialogTitle>

                            <DialogDescription>
                                Configure where Stripe for Web3 should send your merchant events.
                            </DialogDescription>

                        </DialogHeader>

                        <div className="space-y-5 py-2">

                            <div className="space-y-2">

                                <Label htmlFor="webhook-name">
                                    Endpoint name
                                </Label>

                                <Input
                                    id="webhook-name"
                                    placeholder="Production backend"
                                />

                            </div>

                            <div className="space-y-2">

                                <Label htmlFor="webhook-url">
                                    Endpoint URL
                                </Label>

                                <Input
                                    id="webhook-url"
                                    placeholder="https://api.example.com/webhooks"
                                />

                            </div>

                            <div className="space-y-2">

                                <Label>
                                    Environment
                                </Label>

                                <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                                    Live
                                </div>

                            </div>

                            <div className="rounded-lg border bg-muted/30 p-4">

                                <p className="text-sm font-medium">
                                    Event selection
                                </p>

                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    You can choose the customer, subscription,
                                    billing, and refund events this endpoint receives.
                                </p>

                            </div>

                        </div>

                        <DialogFooter>

                            <Button
                                variant="outline"
                                onClick={closeDialog}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={() =>
                                    setCreated(true)
                                }
                            >
                                <Webhook />
                                Create endpoint
                            </Button>

                        </DialogFooter>
                    </>
                ) : (
                    <>
                        <DialogHeader>

                            <DialogTitle>
                                Webhook endpoint created
                            </DialogTitle>

                            <DialogDescription>
                                Store the signing secret securely. It is shown only once.
                            </DialogDescription>

                        </DialogHeader>

                        <div className="space-y-4">

                            <div className="rounded-lg border bg-muted/30 p-4">

                                <code className="break-all font-mono text-xs leading-6">
                                    {signingSecret}
                                </code>

                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={copySecret}
                            >
                                {copied ? (
                                    <>
                                        <Check />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy />
                                        Copy signing secret
                                    </>
                                )}
                            </Button>

                            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">

                                <p className="text-sm font-medium">
                                    Verify every webhook
                                </p>

                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Your server should verify the webhook signature
                                    using this signing secret before processing events.
                                </p>

                            </div>

                        </div>

                        <DialogFooter>
                            <Button onClick={closeDialog}>
                                Done
                            </Button>
                        </DialogFooter>
                    </>
                )}

            </DialogContent>
        </Dialog>
    );
}