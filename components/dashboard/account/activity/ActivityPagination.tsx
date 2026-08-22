"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

interface ActivityPaginationProps {
    total: number;
    pageSize?: number;
}

export function ActivityPagination({
    total,
    pageSize = 25,
}: ActivityPaginationProps) {
    const shown =
        Math.min(
            total,
            pageSize,
        );

    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
                Showing 1–
                {shown} of{" "}
                {total.toLocaleString()}{" "}
                events
            </p>

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled
                >
                    <ChevronLeft />
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                    className="size-8"
                >
                    1
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    className="size-8"
                    disabled={
                        total <= pageSize
                    }
                >
                    2
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={
                        total <= pageSize
                    }
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    );
}