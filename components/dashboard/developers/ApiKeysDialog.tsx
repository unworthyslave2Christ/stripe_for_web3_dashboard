"use client";

import {
    Check,
    Copy,
    KeyRound,
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

export function ApiKeysDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [created, setCreated] =
        useState(false);

    const [copied, setCopied] =
        useState(false);

    const placeholderSecret =
        "sw_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    async function handleCopy() {
        await navigator.clipboard.writeText(
            placeholderSecret,
        );

        setCopied(true);

        window.setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    function handleClose() {
        setCreated(false);
        setCopied(false);
        onOpenChange(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={handleClose}
        >
            <DialogContent className="sm:max-w-lg">

                {!created ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                Create API key
                            </DialogTitle>

                            <DialogDescription>
                                Create a credential for your server-side integration.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-5 py-2">

                            <div className="space-y-2">
                                <Label htmlFor="api-key-name">
                                    Name
                                </Label>

                                <Input
                                    id="api-key-name"
                                    placeholder="Production backend"
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
                                    Recommended
                                </p>

                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Start with the smallest set of scopes your
                                    integration needs. You can create another key
                                    for additional capabilities.
                                </p>

                            </div>

                        </div>

                        <DialogFooter>

                            <Button
                                variant="outline"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={() =>
                                    setCreated(true)
                                }
                            >
                                <KeyRound />
                                Create key
                            </Button>

                        </DialogFooter>
                    </>
                ) : (
                    <>
                        <DialogHeader>

                            <DialogTitle>
                                API key created
                            </DialogTitle>

                            <DialogDescription>
                                This secret is shown only once. Store it securely before closing this dialog.
                            </DialogDescription>

                        </DialogHeader>

                        <div className="space-y-4">

                            <div className="rounded-lg border bg-muted/30 p-4">

                                <code className="break-all font-mono text-xs leading-6">
                                    {placeholderSecret}
                                </code>

                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleCopy}
                            >
                                {copied ? (
                                    <>
                                        <Check />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy />
                                        Copy secret
                                    </>
                                )}
                            </Button>

                            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm">

                                <p className="font-medium">
                                    Important
                                </p>

                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Do not put this key in browser code,
                                    source control, or public configuration.
                                </p>

                            </div>

                        </div>

                        <DialogFooter>

                            <Button onClick={handleClose}>
                                Done
                            </Button>

                        </DialogFooter>
                    </>
                )}

            </DialogContent>
        </Dialog>
    );
}