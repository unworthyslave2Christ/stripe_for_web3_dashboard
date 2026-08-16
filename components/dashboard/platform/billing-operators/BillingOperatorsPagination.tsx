import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function BillingOperatorsPagination() {
    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-muted-foreground">
                Showing 1–5 of 5 operators
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