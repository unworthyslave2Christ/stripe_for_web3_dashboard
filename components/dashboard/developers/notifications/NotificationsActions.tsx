"use client";

import {
    Download,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function NotificationsActions({
    onRefresh,
    refreshing,
    refreshAvailable,
}: {
    onRefresh: () => void;
    refreshing: boolean;
    refreshAvailable: boolean;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                disabled
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
                onClick={
                    onRefresh
                }
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