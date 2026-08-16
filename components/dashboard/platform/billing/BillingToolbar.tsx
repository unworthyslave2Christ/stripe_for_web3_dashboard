import {
    Stack,
} from "@/components/layout/Stack";

import {
    BillingActions,
} from "./BillingActions";

import {
    BillingFilters,
} from "./BillingFilters";

import {
    BillingSearch,
} from "./BillingSearch";

export function BillingToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <BillingSearch />

                    <BillingActions />

                </div>

                <BillingFilters />

            </Stack>

        </div>
    );
}