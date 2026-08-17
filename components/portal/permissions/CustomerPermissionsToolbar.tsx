"use client";

import {
    Search,
} from "lucide-react";

import {
    Input,
} from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function CustomerPermissionsToolbar() {
    return (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="relative w-full sm:max-w-xs">

                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Search permissions..."
                    className="pl-9"
                />

            </div>

            <Select defaultValue="all">

                <SelectTrigger className="w-full sm:w-[170px]">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="active">
                        Active
                    </SelectItem>

                    <SelectItem value="paused">
                        Paused
                    </SelectItem>

                    <SelectItem value="revoked">
                        Revoked
                    </SelectItem>

                </SelectContent>

            </Select>

        </div>
    );
}