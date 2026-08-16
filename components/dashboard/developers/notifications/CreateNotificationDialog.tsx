"use client";

import {
    Bell,
    Check,
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function CreateNotificationDialog({
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

    function closeDialog() {
        setCreated(false);
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
                                Create notification
                            </DialogTitle>

                            <DialogDescription>
                                Create a notification policy for your merchant.
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

                                <Select defaultValue="billing_failed">

                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="billing_failed">
                                            Billing fails
                                        </SelectItem>

                                        <SelectItem value="billing_succeeded">
                                            Billing succeeds
                                        </SelectItem>

                                        <SelectItem value="subscription_created">
                                            Subscription created
                                        </SelectItem>

                                        <SelectItem value="subscription_cancelled">
                                            Subscription cancelled
                                        </SelectItem>

                                        <SelectItem value="subscription_renewal">
                                            Subscription renewal
                                        </SelectItem>

                                    </SelectContent>

                                </Select>

                            </div>

                            <div className="space-y-2">

                                <Label>
                                    Channel
                                </Label>

                                <Select defaultValue="email">

                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="email">
                                            Email
                                        </SelectItem>

                                        <SelectItem value="webhook">
                                            Webhook
                                        </SelectItem>

                                        <SelectItem value="in-app">
                                            In-app
                                        </SelectItem>

                                    </SelectContent>

                                </Select>

                            </div>

                            <div className="rounded-lg border bg-muted/30 p-4">

                                <p className="text-sm font-medium">
                                    Audience
                                </p>

                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    Audience selection and notification templates
                                    will be configured in the full notification builder.
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
                                        The policy will begin generating notifications
                                        when its configured trigger occurs.
                                    </p>

                                </div>

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