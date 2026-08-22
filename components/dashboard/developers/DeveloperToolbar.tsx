"use client";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    DeveloperActions,
} from "./DeveloperActions";

import {
    DeveloperFilters,
} from "./DeveloperFilters";

import {
    DeveloperSearch,
} from "./DeveloperSearch";

export function DeveloperToolbar({
    search,
    onSearchChange,
    environment,
    onEnvironmentChange,
    status,
    onStatusChange,
    refreshAvailable,
    exportAvailable,
    refreshing,
    onRefresh,
    disabled = false,
}: {
    search: string;

    onSearchChange:
        (
            value: string,
        ) => void;

    environment:
        | "all"
        | "test"
        | "live";

    onEnvironmentChange:
        (
            value:
                | "all"
                | "test"
                | "live",
        ) => void;

    status:
        | "all"
        | "active"
        | "revoked"
        | "expired";

    onStatusChange:
        (
            value:
                | "all"
                | "active"
                | "revoked"
                | "expired",
        ) => void;

    refreshAvailable: boolean;

    exportAvailable: boolean;

    refreshing: boolean;

    onRefresh:
        () => void;

    disabled?: boolean;
}) {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <DeveloperSearch
                        value={search}
                        onChange={
                            onSearchChange
                        }
                        disabled={
                            disabled
                        }
                    />

                    <DeveloperActions
                        refreshAvailable={
                            refreshAvailable
                        }
                        exportAvailable={
                            exportAvailable
                        }
                        refreshing={
                            refreshing
                        }
                        onRefresh={
                            onRefresh
                        }
                    />

                </div>

                <DeveloperFilters
                    environment={
                        environment
                    }
                    status={
                        status
                    }
                    onEnvironmentChange={
                        onEnvironmentChange
                    }
                    onStatusChange={
                        onStatusChange
                    }
                    disabled={
                        disabled
                    }
                />

            </Stack>

        </div>
    );
}