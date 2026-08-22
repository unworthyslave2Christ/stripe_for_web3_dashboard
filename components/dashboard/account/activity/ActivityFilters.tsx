"use client";

import {
    SlidersHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type EntityFilter =
    | "all"
    | "customer"
    | "plan"
    | "subscription"
    | "billing"
    | "permission"
    | "developer";

export type SeverityFilter =
    | "all"
    | "info"
    | "success"
    | "warning"
    | "error";

export type PeriodFilter =
    | "today"
    | "7d"
    | "30d"
    | "90d";

export interface ActivityFilterValues {
    entity: EntityFilter;
    severity: SeverityFilter;
    period: PeriodFilter;
}



interface ActivityFiltersProps {
    values: ActivityFilterValues;

    onEntityChange: (
        value: EntityFilter | null,
    ) => void;

    onSeverityChange: (
        value: SeverityFilter | null,
    ) => void;

    onPeriodChange: (
        value: PeriodFilter | null,
    ) => void;
}

export function ActivityFilters({
    values,
    onEntityChange,
    onSeverityChange,
    onPeriodChange,
}: ActivityFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Select
                value={values.entity}
                onValueChange={onEntityChange}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All entities
                    </SelectItem>

                    <SelectItem value="customer">
                        Customers
                    </SelectItem>

                    <SelectItem value="plan">
                        Plans
                    </SelectItem>

                    <SelectItem value="subscription">
                        Subscriptions
                    </SelectItem>

                    <SelectItem value="billing">
                        Billing
                    </SelectItem>

                    <SelectItem value="permission">
                        Permissions
                    </SelectItem>

                    <SelectItem value="developer">
                        Developers
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={values.severity}
                onValueChange={onSeverityChange}
            >
                <SelectTrigger className="w-[145px]">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All severities
                    </SelectItem>

                    <SelectItem value="info">
                        Info
                    </SelectItem>

                    <SelectItem value="success">
                        Success
                    </SelectItem>

                    <SelectItem value="warning">
                        Warning
                    </SelectItem>

                    <SelectItem value="error">
                        Error
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={values.period}
                onValueChange={onPeriodChange}
            >
                <SelectTrigger className="w-[145px]">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="today">
                        Today
                    </SelectItem>

                    <SelectItem value="7d">
                        Last 7 days
                    </SelectItem>

                    <SelectItem value="30d">
                        Last 30 days
                    </SelectItem>

                    <SelectItem value="90d">
                        Last 90 days
                    </SelectItem>
                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="sm"
            >
                <SlidersHorizontal />
                Event type
            </Button>
        </div>
    );
}