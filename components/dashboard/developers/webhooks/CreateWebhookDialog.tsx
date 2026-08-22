"use client";

import {
    useState,
} from "react";

import {
    Webhook,
} from "lucide-react";

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
    available,
    loading,
    error,
    onCreate,
}: {
    open: boolean;

    onOpenChange: (
        open: boolean,
    ) => void;

    available: boolean;

    loading: boolean;

    error: Error | null;

    onCreate: (
        input: {
            name: string;

            endpointUrl: string;

            environment:
                | "TEST"
                | "LIVE";

            events: string[];
        },
    ) => Promise<unknown>;
}) {
    const [
        name,
        setName,
    ] = useState("");

    const [
        endpointUrl,
        setEndpointUrl,
    ] = useState("");

    const [
        localError,
        setLocalError,
    ] = useState<string | null>(null);

    function reset() {
        setName("");
        setEndpointUrl("");
        setLocalError(null);
    }

    async function submit() {
        setLocalError(null);

        if (!name.trim()) {
            setLocalError(
                "Enter an endpoint name.",
            );

            return;
        }

        if (!endpointUrl.trim()) {
            setLocalError(
                "Enter the endpoint URL.",
            );

            return;
        }

        try {
            await onCreate({
                name:
                    name.trim(),

                endpointUrl:
                    endpointUrl.trim(),

                environment:
                    "LIVE",

                events: [],
            });

            reset();
            onOpenChange(false);
        } catch {
            // Parent hook owns the canonical error.
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                    reset();
                }

                onOpenChange(
                    nextOpen,
                );
            }}
        >
            <DialogContent className="sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle>
                        Create webhook endpoint
                    </DialogTitle>

                    <DialogDescription>
                        Configure where Stripe for Web3 should send merchant events.
                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-5 py-2">

                    <div className="space-y-2">

                        <Label htmlFor="webhook-name">
                            Endpoint name
                        </Label>

                        <Input
                            id="webhook-name"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value,
                                )
                            }
                            placeholder="Production backend"
                            disabled={
                                loading ||
                                !available
                            }
                        />

                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="webhook-url">
                            Endpoint URL
                        </Label>

                        <Input
                            id="webhook-url"
                            value={endpointUrl}
                            onChange={(event) =>
                                setEndpointUrl(
                                    event.target.value,
                                )
                            }
                            placeholder="https://api.example.com/webhooks"
                            disabled={
                                loading ||
                                !available
                            }
                        />

                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">

                        <p className="text-sm font-medium">
                            Live environment
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Endpoint creation is currently not exposed by the merchant SDK.
                            The form is ready for the backend operation when it becomes available.
                        </p>

                    </div>

                    {(localError || error) && (
                        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                            {localError ??
                                error?.message}
                        </div>
                    )}

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={
                            !available ||
                            loading
                        }
                        onClick={submit}
                    >
                        <Webhook />
                        Create endpoint
                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}