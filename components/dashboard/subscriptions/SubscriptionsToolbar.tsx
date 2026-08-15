import {
    Stack,
} from "@/components/layout/Stack";

import {
    SubscriptionFilters,
} from "./SubscriptionFilters";

import {
    SubscriptionSearch,
} from "./SubscriptionSearch";

import {
    SubscriptionsActions,
} from "./SubscriptionsActions";

export function SubscriptionsToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <SubscriptionSearch />

                    <SubscriptionsActions />

                </div>

                <SubscriptionFilters />

            </Stack>

        </div>
    );
}