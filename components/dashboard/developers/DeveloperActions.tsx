"use client";

import {
    Download,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function DeveloperActions({
    refreshAvailable,
    exportAvailable,
    refreshing,
    onRefresh,
}: {
    refreshAvailable: boolean;

    exportAvailable: boolean;

    refreshing: boolean;

    onRefresh:
        () => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Button
                variant="outline"
                size="sm"
                disabled={!exportAvailable}
            >
                <Download />
                Export
            </Button>

            <Button
                variant="outline"
                size="sm"
                disabled={
                    !refreshAvailable ||
                    refreshing
                }
                onClick={onRefresh}
            >
                <RefreshCw
                    className={
                        refreshing
                            ? "animate-spin"
                            : undefined
                    }
                />
                Refresh
            </Button>

        </div>
    );
}