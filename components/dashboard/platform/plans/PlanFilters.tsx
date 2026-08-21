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

import type {
    BillingInterval,
    PlanStatus,
} from "./plan.types";

export function PlanFilters({
    status,
    interval,
    onStatusChange,
    onIntervalChange,
}: {
    status:
        | "ALL"
        | PlanStatus;

    interval:
        | "ALL"
        | BillingInterval;

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
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select
                value={status}
                onValueChange={(
                    value,
                ) =>
                    onStatusChange(
                        value as
                            | "ALL"
                            | PlanStatus,
                    )
                }
            >
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="ALL">
                        All plans
                    </SelectItem>

                    <SelectItem value="ACTIVE">
                        Active
                    </SelectItem>

                    <SelectItem value="PAUSED">
                        Paused
                    </SelectItem>

                    <SelectItem value="ARCHIVED">
                        Archived
                    </SelectItem>

                </SelectContent>

            </Select>

            <Select
                value={interval}
                onValueChange={(
                    value,
                ) =>
                    onIntervalChange(
                        value as
                            | "ALL"
                            | BillingInterval,
                    )
                }
            >

                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Interval" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="ALL">
                        All intervals
                    </SelectItem>

                    <SelectItem value="MONTH">
                        Monthly
                    </SelectItem>

                    <SelectItem value="YEAR">
                        Yearly
                    </SelectItem>

                    <SelectItem value="WEEK">
                        Weekly
                    </SelectItem>

                    <SelectItem value="DAY">
                        Daily
                    </SelectItem>

                </SelectContent>

            </Select>

            <Button
                variant="outline"
                size="sm"
                disabled
            >
                <SlidersHorizontal />
                More filters
            </Button>

        </div>
    );
}