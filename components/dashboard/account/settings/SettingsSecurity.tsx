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

export function SettingsSecurity({
    sensitiveConfirmation,
    editable,
    onSensitiveConfirmationChange,
}: {
    sensitiveConfirmation: boolean;
    editable: boolean;
    onSensitiveConfirmationChange: (
        value: boolean,
    ) => void;
}) {
    return (
        <SettingsSection
            title="Security"
            description="Control confirmation behavior for sensitive merchant actions."
        >
            <div className="space-y-6">
                <div className="flex items-start justify-between gap-6">
                    <div className="space-y-1">
                        <Label
                            htmlFor="sensitive-confirmation"
                            className="text-sm font-medium"
                        >
                            Confirm sensitive actions
                        </Label>

                        <p className="text-xs leading-5 text-muted-foreground">
                            Require an explicit confirmation
                            step before destructive or
                            authorization-sensitive actions.
                        </p>
                    </div>

                    <Switch
                        id="sensitive-confirmation"
                        checked={
                            sensitiveConfirmation
                        }
                        disabled={!editable}
                        onCheckedChange={
                            onSensitiveConfirmationChange
                        }
                    />
                </div>

                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <p className="text-sm font-medium">
                        Security reminder
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        API keys and webhook signing
                        secrets should never be committed
                        to source control or exposed to
                        browser clients.
                    </p>
                </div>
            </div>
        </SettingsSection>
    );
}