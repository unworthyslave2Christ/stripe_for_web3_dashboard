import {
    Stack,
} from "@/components/layout/Stack";

import {
    PlanActions,
} from "./PlanActions";

import {
    PlanFilters,
} from "./PlanFilters";

import {
    PlansSearch,
} from "./PlansSearch";

export function PlansToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">
            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <PlansSearch />

                    <PlanActions />

                </div>

                <PlanFilters />

            </Stack>
        </div>
    );
}