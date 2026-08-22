import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

interface PermissionsPaginationProps {
    page: number;

    total: number;

    pageSize: number;

    hasPreviousPage: boolean;

    hasNextPage: boolean;
}

export function PermissionsPagination({
    page,
    total,
    pageSize,
    hasPreviousPage,
    hasNextPage,
}: PermissionsPaginationProps) {
    if (total === 0) {
        return (
            <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                    No permission policies are currently available.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-muted-foreground">
                Showing{" "}
                {(page - 1) * pageSize + 1}
                –
                {Math.min(
                    page * pageSize,
                    total,
                )}{" "}
                of {total}
            </p>

            <div className="flex items-center gap-1">

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={
                        !hasPreviousPage
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
                        !hasNextPage
                    }
                >
                    <ChevronRight />
                </Button>

            </div>

        </div>
    );
}