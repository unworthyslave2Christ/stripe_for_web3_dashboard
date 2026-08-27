"use client";

import {
    SettingsSection,
} from "./SettingsSection";

import {
    Label,
} from "@/components/ui/label";

import {
    Switch,
} from "@/components/ui/switch";

interface NotificationSettingProps {
    id: string;
    title: string;
    description: string;
    checked: boolean;
    editable: boolean;
    onCheckedChange: (
        checked: boolean,
    ) => void;
}

function NotificationSetting({
    id,
    title,
    description,
    checked,
    editable,
    onCheckedChange,
}: NotificationSettingProps) {
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
                checked={checked}
                disabled={!editable}
                onCheckedChange={
                    onCheckedChange
                }
            />
        </div>
    );
}

export function SettingsNotifications({
    billing,
    operational,
    security,
    editable,
    onBillingChange,
    onOperationalChange,
    onSecurityChange,
}: {
    billing: boolean;
    operational: boolean;
    security: boolean;
    editable: boolean;
    onBillingChange: (
        value: boolean,
    ) => void;
    onOperationalChange: (
        value: boolean,
    ) => void;
    onSecurityChange: (
        value: boolean,
    ) => void;
}) {
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
                    checked={billing}
                    editable={editable}
                    onCheckedChange={
                        onBillingChange
                    }
                />

                <NotificationSetting
                    id="operational-notifications"
                    title="Operational alerts"
                    description="Notify administrators when infrastructure, webhooks, or integrations require attention."
                    checked={
                        operational
                    }
                    editable={editable}
                    onCheckedChange={
                        onOperationalChange
                    }
                />

                <NotificationSetting
                    id="security-notifications"
                    title="Security alerts"
                    description="Notify administrators about sensitive account or credential events."
                    checked={security}
                    editable={editable}
                    onCheckedChange={
                        onSecurityChange
                    }
                />
            </div>
        </SettingsSection>
    );
}