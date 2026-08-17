"use client";

import {
    Bell,
    Mail,
    ShieldCheck,
} from "lucide-react";

import {
    Switch,
} from "@/components/ui/switch";

import {
    Label,
} from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerNotificationSettings() {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Notification defaults
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Control broad account-level notification behavior. Detailed event preferences are available on the Notifications page.
                </p>

            </CardHeader>

            <CardContent className="space-y-5">

                <NotificationSetting
                    id="customer-email-notifications"
                    icon={Mail}
                    title="Email notifications"
                    description="Allow important customer notifications to be delivered by email."
                    defaultChecked
                />

                <NotificationSetting
                    id="customer-in-app-notifications"
                    icon={Bell}
                    title="In-app notifications"
                    description="Show important notifications inside the customer portal."
                    defaultChecked
                />

                <NotificationSetting
                    id="customer-security-notifications"
                    icon={ShieldCheck}
                    title="Security notifications"
                    description="Always receive important Smart Account and authorization notices."
                    defaultChecked
                />

            </CardContent>

        </Card>
    );
}

function NotificationSetting({
    id,
    icon: Icon,
    title,
    description,
    defaultChecked,
}: {
    id: string;
    icon: typeof Mail;
    title: string;
    description: string;
    defaultChecked: boolean;
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
                defaultChecked={
                    defaultChecked
                }
            />

        </div>
    );
}