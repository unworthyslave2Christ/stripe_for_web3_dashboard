"use client";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    PermissionsActions,
} from "./PermissionsActions";

import {
    PermissionsSearch,
} from "./PermissionsSearch";

import {
    PermissionFilters,
} from "./PermissionFilters";

import type {
    PermissionScope,
    PermissionStatus,
} from "@/types/merchant/permission.types";

interface PermissionsToolbarProps {
    search: string;

    onSearchChange: (
        value: string,
    ) => void;

    status:
        | "all"
        | PermissionStatus;

    scope:
        | "all"
        | PermissionScope;

    onStatusChange: (
        value:
            | "all"
            | PermissionStatus,
    ) => void;

    onScopeChange: (
        value:
            | "all"
            | PermissionScope,
    ) => void;

    available: boolean;

    onRefresh: () => Promise<unknown>;

    refreshAvailable: boolean;

    createAvailable: boolean;
}

export function PermissionsToolbar({
    search,
    onSearchChange,
    status,
    scope,
    onStatusChange,
    onScopeChange,
    available,
    onRefresh,
    refreshAvailable,
    createAvailable,
}: PermissionsToolbarProps) {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <PermissionsSearch
                        value={search}
                        onChange={
                            onSearchChange
                        }
                        disabled={
                            !available
                        }
                    />

                    <PermissionsActions
                        canExport={
                            available
                        }
                        canRefresh={
                            refreshAvailable
                        }
                        canCreate={
                            createAvailable
                        }
                        onRefresh={
                            onRefresh
                        }
                    />

                </div>

                <PermissionFilters
                    status={status}
                    scope={scope}
                    onStatusChange={
                        onStatusChange
                    }
                    onScopeChange={
                        onScopeChange
                    }
                    disabled={
                        !available
                    }
                />

            </Stack>

        </div>
    );
}