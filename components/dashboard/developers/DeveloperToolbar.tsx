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

export function DeveloperToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <DeveloperSearch />

                    <DeveloperActions />

                </div>

                <DeveloperFilters />

            </Stack>

        </div>
    );
}