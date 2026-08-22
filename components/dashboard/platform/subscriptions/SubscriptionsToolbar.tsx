"use client";

import { Stack } from "@/components/layout/Stack";

import { SubscriptionSearch } from "./SubscriptionSearch";
import { SubscriptionFilters } from "./SubscriptionFilters";
import { SubscriptionsActions } from "./SubscriptionsActions";

export function SubscriptionsToolbar({
    refreshing,
    onRefresh,
}: {
    refreshing: boolean;

    onRefresh: () => void;
}) {
    return (
        <div className="rounded-xl border bg-card p-4">
            <Stack gap={4}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <SubscriptionSearch />

                    <SubscriptionsActions
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                </div>

                <SubscriptionFilters />
            </Stack>
        </div>
    );
}