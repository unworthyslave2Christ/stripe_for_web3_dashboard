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

export function CustomerSubscriptionsToolbar({
    search,
    onSearchChange,
    status,
    onStatusChange,
}: {
    search: string;

    onSearchChange:
        (
            value: string,
        ) => void;

    status:
        | "all"
        | "active"
        | "paused"
        | "pending"
        | "cancelled";

    onStatusChange:
        (
            value:
                | "all"
                | "active"
                | "paused"
                | "pending"
                | "cancelled",
        ) => void;
}) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="relative w-full sm:max-w-xs">

                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    value={
                        search
                    }
                    onChange={(
                        event,
                    ) =>
                        onSearchChange(
                            event.target.value,
                        )
                    }
                    placeholder="Search subscriptions..."
                    className="pl-9"
                />

            </div>

            <Select
                value={
                    status
                }
                onValueChange={(
                    value,
                ) =>
                    onStatusChange(
                        value as
                            | "all"
                            | "active"
                            | "paused"
                            | "pending"
                            | "cancelled",
                    )
                }
            >

                <SelectTrigger className="w-full sm:w-[160px]">
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

                    <SelectItem value="pending">
                        Pending
                    </SelectItem>

                    <SelectItem value="cancelled">
                        Cancelled
                    </SelectItem>

                </SelectContent>

            </Select>

        </div>
    );
}