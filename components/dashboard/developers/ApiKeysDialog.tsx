"use client";

import {
    KeyRound,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Button,
} from "@/components/ui/button";

export function ApiKeysDialog({
    open,
    onOpenChange,
    available = false,
}: {
    open: boolean;

    onOpenChange:
        (
            open: boolean,
        ) => void;

    available?: boolean;
}) {
    return (
        <Dialog
            open={open}
            onOpenChange={
                onOpenChange
            }
        >
            <DialogContent>

                <DialogHeader>

                    <DialogTitle>
                        Create API key
                    </DialogTitle>

                    <DialogDescription>
                        Create a server-side credential for your merchant integration.
                    </DialogDescription>

                </DialogHeader>

                {!available ? (
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">

                        <p className="text-sm font-medium">
                            Not available yet
                        </p>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            API-key creation is waiting for the corresponding SDK/API operation. No secret is generated in the dashboard until the backend implementation exists.
                        </p>

                    </div>
                ) : (
                    <div className="rounded-lg border bg-muted/30 p-4">
                        <p className="text-sm text-muted-foreground">
                            API-key creation form goes here once the API-key creation operation is exposed.
                        </p>
                    </div>
                )}

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Close
                    </Button>

                    <Button
                        disabled={!available}
                    >
                        <KeyRound />
                        Create key
                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}