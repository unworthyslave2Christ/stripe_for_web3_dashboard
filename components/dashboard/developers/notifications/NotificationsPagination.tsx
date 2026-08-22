import {
    Button,
} from "@/components/ui/button";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export function NotificationsPagination({
    visible,
    total,
}: {
    visible: number;
    total: number;
}) {
    const hasNext =
        visible < total;

    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
                Showing {visible} of {total} notification policies
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
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={!hasNext}
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    );
}