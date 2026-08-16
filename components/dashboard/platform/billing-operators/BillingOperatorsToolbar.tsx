import {
    Stack,
} from "@/components/layout/Stack";

import {
    BillingOperatorFilters,
} from "./BillingOperatorFilters";

import {
    BillingOperatorsActions,
} from "./BillingOperatorsActions";

import {
    BillingOperatorsSearch,
} from "./BillingOperatorsSearch";

export function BillingOperatorsToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <BillingOperatorsSearch />

                    <BillingOperatorsActions />

                </div>

                <BillingOperatorFilters />

            </Stack>

        </div>
    );
}