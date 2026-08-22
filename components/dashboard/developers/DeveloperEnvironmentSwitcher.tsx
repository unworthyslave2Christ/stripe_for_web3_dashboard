"use client";

import {
    Check,
    ChevronDown,
    FlaskConical,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Badge,
} from "@/components/ui/badge";

export function DeveloperEnvironmentSwitcher({
    value,
    onChange,
    disabled = false,
}: {
    value:
        | "TEST"
        | "LIVE";

    onChange:
        (
            value:
                | "TEST"
                | "LIVE",
        ) => void;

    disabled?: boolean;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <span className="text-sm font-medium">
                Environment
            </span>

            <Button
                variant="outline"
                disabled={disabled}
                className="justify-between gap-3"
                onClick={() =>
                    onChange(
                        value === "TEST"
                            ? "LIVE"
                            : "TEST",
                    )
                }
            >
                <span className="flex items-center gap-2">
                    <FlaskConical className="size-4 text-muted-foreground" />

                    {value === "TEST"
                        ? "Test"
                        : "Live"}
                </span>

                <ChevronDown className="size-4 text-muted-foreground" />
            </Button>

            <Badge variant="outline">
                <Check />
                {value === "TEST"
                    ? "Safe environment"
                    : "Production environment"}
            </Badge>

        </div>
    );
}