import {
    Stack,
} from "@/components/layout/Stack";

import {
    PermissionFilters,
} from "./PermissionFilters";

import {
    PermissionsActions,
} from "./PermissionsActions";

import {
    PermissionsSearch,
} from "./PermissionsSearch";

export function PermissionsToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <PermissionsSearch />

                    <PermissionsActions />

                </div>

                <PermissionFilters />

            </Stack>

        </div>
    );
}