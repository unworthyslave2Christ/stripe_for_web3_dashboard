"use client";

import {
    useState,
} from "react";

import {
    Bell,
    Check,
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

interface CreateNotificationDialogProps {
    open: boolean;

    onOpenChange: (
        open: boolean,
    ) => void;

    createAvailable: boolean;

    onCreate?: () => Promise<void>;
}

export function CreateNotificationDialog({
    open,
    onOpenChange,
    createAvailable,
    onCreate,
}: CreateNotificationDialogProps) {
    const [
        created,
        setCreated,
    ] =
        useState(false);

    const [
        submitting,
        setSubmitting,
    ] =
        useState(false);

    async function handleCreate() {
        if (
            !createAvailable ||
            !onCreate
        ) {
            return;
        }

        setSubmitting(true);

        try {
            await onCreate();
            setCreated(true);
        } finally {
            setSubmitting(false);
        }
    }

    function closeDialog() {
        setCreated(false);
        setSubmitting(false);
        onOpenChange(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={
                closeDialog
            }
        >
            <DialogContent className="sm:max-w-lg">
                {!created ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                Create notification
                            </DialogTitle>

                            <DialogDescription>
                                Configure a notification policy for your merchant.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-5 py-2">
                            <div className="space-y-2">
                                <Label htmlFor="notification-name">
                                    Name
                                </Label>

                                <Input
                                    id="notification-name"
                                    placeholder="Failed billing alert"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Trigger
                                </Label>

                                <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                                    Billing fails
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>
                                    Channel
                                </Label>

                                <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                                    Email
                                </div>
                            </div>

                            {!createAvailable && (
                                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                                    <p className="text-sm font-medium">
                                        Creation is not available yet
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        The merchant notification mutation has not yet been exposed by the SDK.
                                    </p>
                                </div>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={
                                    closeDialog
                                }
                            >
                                Cancel
                            </Button>

                            <Button
                                disabled={
                                    !createAvailable ||
                                    submitting
                                }
                                onClick={
                                    handleCreate
                                }
                            >
                                <Bell />
                                Create notification
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                Notification created
                            </DialogTitle>

                            <DialogDescription>
                                The notification policy has been created successfully.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="rounded-lg border bg-muted/30 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Check className="size-4" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium">
                                        Policy is ready
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        The backend has accepted the notification policy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                onClick={
                                    closeDialog
                                }
                            >
                                Done
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}