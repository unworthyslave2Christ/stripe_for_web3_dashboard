"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PlansPagination() {
    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-muted-foreground">
                Showing 1–4 of 8 plans
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
                >
                    2
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                >
                    <ChevronRight />
                </Button>

            </div>

        </div>
    );
}