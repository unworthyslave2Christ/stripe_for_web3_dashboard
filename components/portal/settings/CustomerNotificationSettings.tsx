"use client";

import {
    Bell,
    Mail,
    ShieldCheck,
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

export function CustomerNotificationSettings({
    emailEnabled,
    inAppEnabled,
    securityEnabled,
    onEmailChange,
    onInAppChange,
    onSecurityChange,
    demo,
}: {
    emailEnabled: boolean;

    inAppEnabled: boolean;

    securityEnabled: boolean;

    onEmailChange:
        (value: boolean) => void;

    onInAppChange:
        (value: boolean) => void;

    onSecurityChange:
        (value: boolean) => void;

    demo: boolean;
}) {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Notification defaults
                </CardTitle>

                <CardDescription>
                    Control broad account-level notification behavior.
                    Detailed event preferences are available on the Notifications page.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-5">

                <NotificationSetting
                    id="customer-email-notifications"
                    icon={
                        Mail
                    }
                    title="Email notifications"
                    description="Allow important customer notifications to be delivered by email."
                    checked={
                        emailEnabled
                    }
                    onCheckedChange={
                        onEmailChange
                    }
                />

                <NotificationSetting
                    id="customer-in-app-notifications"
                    icon={
                        Bell
                    }
                    title="In-app notifications"
                    description="Show important notifications inside the customer portal."
                    checked={
                        inAppEnabled
                    }
                    onCheckedChange={
                        onInAppChange
                    }
                />

                <NotificationSetting
                    id="customer-security-notifications"
                    icon={
                        ShieldCheck
                    }
                    title="Security notifications"
                    description="Always receive important Smart Account and authorization notices."
                    checked={
                        securityEnabled
                    }
                    onCheckedChange={
                        onSecurityChange
                    }
                />

                {demo && (
                    <p className="text-xs text-muted-foreground">
                        These settings are currently local test-mode state.
                    </p>
                )}

            </CardContent>

        </Card>
    );
}

function NotificationSetting({
    id,
    icon: Icon,
    title,
    description,
    checked,
    onCheckedChange,
}: {
    id: string;

    icon: typeof Mail;

    title: string;

    description: string;

    checked: boolean;

    onCheckedChange:
        (value: boolean) => void;
}) {
    return (
        <div className="flex items-start justify-between gap-6 rounded-lg border p-4">

            <div className="flex gap-3">

                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">

                    <Icon className="size-4 text-muted-foreground" />

                </div>

                <div>

                    <Label
                        htmlFor={id}
                        className="text-sm font-medium"
                    >
                        {title}
                    </Label>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {description}
                    </p>

                </div>

            </div>

            <Switch
                id={id}
                checked={
                    checked
                }
                onCheckedChange={
                    onCheckedChange
                }
            />

        </div>
    );
}