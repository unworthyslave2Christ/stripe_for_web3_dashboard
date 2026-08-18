"use client";

import {
    Monitor,
    Moon,
    Sun,
} from "lucide-react";

import {
    useTheme,
} from "next-themes";

import {
    Label,
} from "@/components/ui/label";

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerPortalPreferences() {
    const {
        theme,
        setTheme,
    } = useTheme();

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Portal preferences
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Customize how the customer portal appears to you.
                </p>

            </CardHeader>

            <CardContent className="space-y-6">

                <div>

                    <Label className="text-sm font-medium">
                        Appearance
                    </Label>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Choose the theme used throughout the portal.
                    </p>

                    <RadioGroup
                        value={
                            theme
                        }
                        onValueChange={
                            setTheme
                        }
                        className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3"
                    >

                        <ThemeOption
                            value="system"
                            label="System"
                            description="Follow your device"
                            icon={Monitor}
                        />

                        <ThemeOption
                            value="light"
                            label="Light"
                            description="Light appearance"
                            icon={Sun}
                        />

                        <ThemeOption
                            value="dark"
                            label="Dark"
                            description="Dark appearance"
                            icon={Moon}
                        />

                    </RadioGroup>

                </div>

            </CardContent>

        </Card>
    );
}

function ThemeOption({
    value,
    label,
    description,
    icon: Icon,
}: {
    value: string;
    label: string;
    description: string;
    icon: typeof Monitor;
}) {
    return (
        <Label
            htmlFor={`theme-${value}`}
            className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/30"
        >

            <RadioGroupItem
                value={value}
                id={`theme-${value}`}
                className="mt-0.5"
            />

            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">

                <Icon className="size-4 text-muted-foreground" />

            </div>

            <div>

                <p className="text-sm font-medium">
                    {label}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                    {description}
                </p>

            </div>

        </Label>
    );
}