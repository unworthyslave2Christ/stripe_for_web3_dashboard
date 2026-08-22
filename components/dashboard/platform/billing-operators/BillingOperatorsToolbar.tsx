import {
    Stack,
} from "@/components/layout/Stack";

import {
    BillingOperatorsActions,
} from "./BillingOperatorsActions";

import {
    BillingOperatorFilters,
} from "./BillingOperatorFilters";

import {
    BillingOperatorsSearch,
} from "./BillingOperatorsSearch";

export function BillingOperatorsToolbar({
    ready,
}: {
    ready: boolean;
}) {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <BillingOperatorsSearch
                        disabled={!ready}
                    />

                    <BillingOperatorsActions
                        ready={ready}
                    />

                </div>

                <BillingOperatorFilters
                    disabled={!ready}
                />

            </Stack>

        </div>
    );
}