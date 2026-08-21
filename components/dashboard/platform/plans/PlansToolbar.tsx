import {
    Stack,
} from "@/components/layout/Stack";

import {
    PlansSearch,
} from "./PlansSearch";

import {
    PlanActions,
} from "./PlanActions";

import {
    PlanFilters,
} from "./PlanFilters";

import type {
    BillingInterval,
    PlanStatus,
} from "./plan.types";

export function PlansToolbar({
    search,
    status,
    interval,
    refreshing,
    onSearchChange,
    onStatusChange,
    onIntervalChange,
    onRefresh,
}: {
    search: string;

    status:
        | "ALL"
        | PlanStatus;

    interval:
        | "ALL"
        | BillingInterval;

    refreshing: boolean;

    onSearchChange: (
        value: string,
    ) => void;

    onStatusChange: (
        value:
            | "ALL"
            | PlanStatus,
    ) => void;

    onIntervalChange: (
        value:
            | "ALL"
            | BillingInterval,
    ) => void;

    onRefresh: () => void;
}) {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <PlansSearch
                        value={search}
                        onChange={
                            onSearchChange
                        }
                    />

                    <PlanActions
                        refreshing={
                            refreshing
                        }
                        onRefresh={
                            onRefresh
                        }
                    />

                </div>

                <PlanFilters
                    status={status}
                    interval={interval}
                    onStatusChange={
                        onStatusChange
                    }
                    onIntervalChange={
                        onIntervalChange
                    }
                />

            </Stack>

        </div>
    );
}