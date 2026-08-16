"use client";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Check,
    ChevronDown,
    FlaskConical,
    Radio,
} from "lucide-react";

export function DeveloperEnvironmentSwitcher() {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <span className="text-sm font-medium">
                Environment
            </span>

            <Button
                variant="outline"
                className="justify-between gap-3"
            >
                <span className="flex items-center gap-2">
                    <FlaskConical className="size-4 text-muted-foreground" />

                    Test
                </span>

                <ChevronDown className="size-4 text-muted-foreground" />
            </Button>

            <Badge variant="outline">
                <Check />
                Safe environment
            </Badge>

        </div>
    );
}