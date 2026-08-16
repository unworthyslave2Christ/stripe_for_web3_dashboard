import { Stack } from "@/components/layout/Stack";

import { ActivityActions } from "./ActivityActions";
import { ActivityFilters } from "./ActivityFilters";
import { ActivitySearch } from "./ActivitySearch";

export function ActivityToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <ActivitySearch />

                    <ActivityActions />

                </div>

                <ActivityFilters />

            </Stack>

        </div>
    );
}