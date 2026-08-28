"use client";

import { Download, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface PlanActionsProps {
    refreshing: boolean;
    onRefresh: () => void;
}

export function PlanActions({
    refreshing,
    onRefresh,
}: PlanActionsProps) {
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

                {refreshing
                    ? "Refreshing"
                    : "Refresh"}
            </Button>

            <Button
                size="sm"
                render={
                    <Link href="/dashboard/merchant/plans/create">
                        <Plus />
                        Create plan
                    </Link>
                }
            />
        </div>
    );
}