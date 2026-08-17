import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerNotificationsPagination() {
    return (
        <div className="flex items-center justify-between border-t pt-4">

            <p className="text-sm text-muted-foreground">
                Showing 4 notifications
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
                    disabled
                >
                    <ChevronRight />
                </Button>

            </div>

        </div>
    );
}