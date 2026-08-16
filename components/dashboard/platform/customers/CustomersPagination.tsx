"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function CustomersPagination() {
    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
                Showing 1–5 of 2,431 customers
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
                    variant="ghost"
                    size="sm"
                    className="size-8"
                >
                    3
                </Button>

                <span className="px-1 text-sm text-muted-foreground">
                    …
                </span>

                <Button
                    variant="ghost"
                    size="sm"
                    className="size-8"
                >
                    487
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