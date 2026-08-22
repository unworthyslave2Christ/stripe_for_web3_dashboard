"use client";

import {
    Download,
    RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function SubscriptionsActions({
    refreshing,
    onRefresh,
}: {
    refreshing: boolean;

    onRefresh: () => void;
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
                onClick={onRefresh}
                disabled={refreshing}
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