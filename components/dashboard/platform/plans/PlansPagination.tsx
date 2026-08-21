import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PlansPagination({
    total,
    page,
    pageSize,
    onPageChange,
}: {
    total: number;

    page: number;

    pageSize: number;

    onPageChange: (
        page: number,
    ) => void;
}) {
    const pageCount =
        Math.max(
            Math.ceil(
                total /
                    pageSize,
            ),
            1,
        );

    const start =
        total === 0
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
            total,
        );

    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-muted-foreground">
                Showing {start}–{end} of {total} plans
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
                            page - 1,
                        )
                    }
                >
                    <ChevronLeft />
                </Button>

                {Array.from({
                    length: pageCount,
                })
                    .slice(0, 5)
                    .map(
                        (_, index) => {
                            const pageNumber =
                                index +
                                1;

                            return (
                                <Button
                                    key={
                                        pageNumber
                                    }
                                    variant={
                                        pageNumber ===
                                        page
                                            ? "secondary"
                                            : "ghost"
                                    }
                                    size="sm"
                                    className="size-8"
                                    onClick={() =>
                                        onPageChange(
                                            pageNumber,
                                        )
                                    }
                                >
                                    {
                                        pageNumber
                                    }
                                </Button>
                            );
                        },
                    )}

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={
                        page >=
                        pageCount
                    }
                    onClick={() =>
                        onPageChange(
                            page + 1,
                        )
                    }
                >
                    <ChevronRight />
                </Button>

            </div>

        </div>
    );
}