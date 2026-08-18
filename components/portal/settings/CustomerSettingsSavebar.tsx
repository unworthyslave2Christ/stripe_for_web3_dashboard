"use client";

import {
    Save,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerSettingsSaveBar() {
    return (
        <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-xl border bg-card/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">

            <div>

                <p className="text-sm font-medium">
                    Changes are ready to save
                </p>

                <p className="text-xs text-muted-foreground">
                    Review your settings before applying them.
                </p>

            </div>

            <div className="flex gap-2">

                <Button
                    variant="ghost"
                    size="sm"
                >
                    Discard
                </Button>

                <Button size="sm">
                    <Save />
                    Save changes
                </Button>

            </div>

        </div>
    );
}