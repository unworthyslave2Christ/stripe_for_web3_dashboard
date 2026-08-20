"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerNotificationsPagination({
    page,
    totalPages,
    totalCount,
    pageSize,
    onPageChange,
}: {
    page: number;

    totalPages: number;

    totalCount: number;

    pageSize: number;

    onPageChange:
        (
            page: number,
        ) => void;
}) {
    const start =
        totalCount ===
        0
            ? 0
            : (
                (
                    page -
                    1
                ) *
                    pageSize
            ) + 1;

    const end =
        Math.min(
            page *
                pageSize,
            totalCount,
        );

    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-muted-foreground">
                Showing {start} to {end} of {totalCount} notifications
            </p>

            <div className="flex items-center gap-1">

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={
                        page <= 1
                    }
                    onClick={() =>
                        onPageChange(
                            page -
                                1,
                        )
                    }
                >
                    <ChevronLeft />
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                    className="size-8"
                >
                    {page}
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={
                        page >=
                        totalPages
                    }
                    onClick={() =>
                        onPageChange(
                            page +
                                1,
                        )
                    }
                >
                    <ChevronRight />
                </Button>

            </div>

        </div>
    );
}