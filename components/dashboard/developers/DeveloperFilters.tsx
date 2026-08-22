"use client";

import {
    SlidersHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type EnvironmentFilter =
    | "all"
    | "test"
    | "live";

type StatusFilter =
    | "all"
    | "active"
    | "revoked"
    | "expired";

export function DeveloperFilters({
    environment,
    status,
    onEnvironmentChange,
    onStatusChange,
    disabled = false,
}: {
    environment:
        EnvironmentFilter;

    status:
        StatusFilter;

    onEnvironmentChange:
        (
            value:
                EnvironmentFilter,
        ) => void;

    onStatusChange:
        (
            value:
                StatusFilter,
        ) => void;

    disabled?: boolean;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select
                value={environment}
                onValueChange={(value) => {
                    if (
                        value === "all" ||
                        value === "test" ||
                        value === "live"
                    ) {
                        onEnvironmentChange(
                            value,
                        );
                    }
                }}
                disabled={disabled}
            >
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Environment" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All environments
                    </SelectItem>

                    <SelectItem value="test">
                        Test
                    </SelectItem>

                    <SelectItem value="live">
                        Live
                    </SelectItem>

                </SelectContent>
            </Select>

            <Select
                value={status}
                onValueChange={(value) => {
                    if (
                        value === "all" ||
                        value === "active" ||
                        value === "revoked" ||
                        value === "expired"
                    ) {
                        onStatusChange(
                            value,
                        );
                    }
                }}
                disabled={disabled}
            >
                <SelectTrigger className="w-[135px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="active">
                        Active
                    </SelectItem>

                    <SelectItem value="revoked">
                        Revoked
                    </SelectItem>

                    <SelectItem value="expired">
                        Expired
                    </SelectItem>

                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="sm"
                disabled={disabled}
            >
                <SlidersHorizontal />
                Scope
            </Button>

        </div>
    );
}