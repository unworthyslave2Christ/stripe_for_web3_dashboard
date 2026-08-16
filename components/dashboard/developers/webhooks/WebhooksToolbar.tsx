import {
    Stack,
} from "@/components/layout/Stack";

import {
    WebhookFilters,
} from "./WebhookFilters";

import {
    WebhooksActions,
} from "./WebhooksActions";

import {
    WebhooksSearch,
} from "./WebhooksSearch";

export function WebhooksToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <WebhooksSearch />

                    <WebhooksActions />

                </div>

                <WebhookFilters />

            </Stack>

        </div>
    );
}