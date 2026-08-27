"use client";

import {
    SettingsSection,
} from "./SettingsSection";

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

export function SettingsBilling({
    value,
    editable,
    onChange,
}: {
    value: "test" | "live";
    editable: boolean;
    onChange: (
        value: "test" | "live",
    ) => void;
}) {
    return (
        <SettingsSection
            title="Billing preferences"
            description="Configure default billing behavior for your merchant."
        >
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>
                        Default billing environment
                    </Label>

                    <Select
                        value={value}
                        onValueChange={(next) => {
                            if (
                                next ===
                                    "test" ||
                                next === "live"
                            ) {
                                onChange(next);
                            }
                        }}
                        disabled={!editable}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="test">
                                Test
                            </SelectItem>

                            <SelectItem value="live">
                                Live
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <p className="text-xs text-muted-foreground">
                        This does not change existing
                        subscriptions or credentials.
                    </p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="text-sm font-medium">
                        Billing ownership
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Subscription-specific billing
                        behavior remains controlled by
                        individual plans and subscriptions.
                    </p>
                </div>
            </div>
        </SettingsSection>
    );
}