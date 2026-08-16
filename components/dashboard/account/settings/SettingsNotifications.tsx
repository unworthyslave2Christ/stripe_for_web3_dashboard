"use client";

import {
    Switch,
} from "@/components/ui/switch";

import {
    Label,
} from "@/components/ui/label";

import {
    SettingsSection,
} from "./SettingsSection";

export function SettingsNotifications() {
    return (
        <SettingsSection
            title="Notifications"
            description="Control default operational notifications for your merchant."
        >

            <div className="space-y-6">

                <NotificationSetting
                    id="billing-notifications"
                    title="Billing alerts"
                    description="Notify administrators when billing failures or unusual billing events occur."
                    defaultChecked
                />

                <NotificationSetting
                    id="operational-notifications"
                    title="Operational alerts"
                    description="Notify administrators when infrastructure, webhooks, or integrations require attention."
                    defaultChecked
                />

                <NotificationSetting
                    id="security-notifications"
                    title="Security alerts"
                    description="Notify administrators about sensitive account or credential events."
                    defaultChecked
                />

            </div>

        </SettingsSection>
    );
}

function NotificationSetting({
    id,
    title,
    description,
    defaultChecked,
}: {
    id: string;
    title: string;
    description: string;
    defaultChecked: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-6 border-b pb-5 last:border-0 last:pb-0">

            <div className="space-y-1">

                <Label
                    htmlFor={id}
                    className="text-sm font-medium"
                >
                    {title}
                </Label>

                <p className="text-xs leading-5 text-muted-foreground">
                    {description}
                </p>

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