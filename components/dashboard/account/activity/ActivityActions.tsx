"use client";

import {
    Download,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

interface ActivityActionsProps {
    onRefresh: () => void;

    refreshing: boolean;

    refreshAvailable: boolean;
}

export function ActivityActions({
    onRefresh,
    refreshing,
    refreshAvailable,
}: ActivityActionsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Button
                variant="outline"
                size="sm"
            >
                <Download />
                Export
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    onRefresh();
                }}
                disabled={
                    refreshing ||
                    !refreshAvailable
                }
            >
                <RefreshCw
                    className={
                        refreshing
                            ? "animate-spin"
                            : undefined
                    }
                />
                {refreshing
                    ? "Refreshing"
                    : "Refresh"}
            </Button>
        </div>
    );
}