"use client";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    ActivityActions,
} from "@/components/dashboard/account/activity/ActivityActions";

import {
    ActivitySearch,
} from "@/components/dashboard/account/activity/ActivitySearch";

import {
    ActivityFilters,
    type EntityFilter,
    type SeverityFilter,
    type PeriodFilter,
} from "@/components/dashboard/account/activity/ActivityFilters";

export interface ActivityToolbarProps {
    search: string;

    entity: EntityFilter;

    severity: SeverityFilter;

    period: PeriodFilter;

    onSearchChange: (
        value: string,
    ) => void;

    onEntityChange: (
        value: EntityFilter,
    ) => void;

    onSeverityChange: (
        value: SeverityFilter,
    ) => void;

    onPeriodChange: (
        value: PeriodFilter,
    ) => void;

    onRefresh: () => void;

    refreshing: boolean;

    refreshAvailable: boolean;
}

export function ActivityToolbar(
    props: ActivityToolbarProps,
) {
    return (
        <div className="rounded-xl border bg-card p-4">
            <Stack gap={4}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <ActivitySearch
                        value={props.search}
                        onChange={
                            props.onSearchChange
                        }
                    />

                    <ActivityActions
                        onRefresh={
                            props.onRefresh
                        }
                        refreshing={
                            props.refreshing
                        }
                        refreshAvailable={
                            props.refreshAvailable
                        }
                    />
                </div>

                <ActivityFilters
                    values={{
                        entity:
                            props.entity,

                        severity:
                            props.severity,

                        period:
                            props.period,
                    }}

                    onEntityChange={(
                        value,
                    ) => {
                        if (value !== null) {
                            props.onEntityChange(
                                value,
                            );
                        }
                    }}

                    onSeverityChange={(
                        value,
                    ) => {
                        if (value !== null) {
                            props.onSeverityChange(
                                value,
                            );
                        }
                    }}

                    onPeriodChange={(
                        value,
                    ) => {
                        if (value !== null) {
                            props.onPeriodChange(
                                value,
                            );
                        }
                    }}
                />
            </Stack>
        </div>
    );
}