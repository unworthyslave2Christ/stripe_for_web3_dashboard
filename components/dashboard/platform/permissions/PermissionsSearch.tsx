"use client";

import {
    Search,
} from "lucide-react";

import {
    Input,
} from "@/components/ui/input";

export function PermissionsSearch() {
    return (
        <div className="relative w-full sm:w-80">

            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
                placeholder="Search permissions..."
                className="pl-9"
            />

        </div>
    );
}