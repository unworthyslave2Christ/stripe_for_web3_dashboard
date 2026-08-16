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

export function PlanFilters() {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All plans
                    </SelectItem>

                    <SelectItem value="active">
                        Active
                    </SelectItem>

                    <SelectItem value="paused">
                        Paused
                    </SelectItem>

                    <SelectItem value="archived">
                        Archived
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Interval" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All intervals
                    </SelectItem>

                    <SelectItem value="month">
                        Monthly
                    </SelectItem>

                    <SelectItem value="year">
                        Yearly
                    </SelectItem>

                    <SelectItem value="week">
                        Weekly
                    </SelectItem>
                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="sm"
            >
                <SlidersHorizontal />
                More filters
            </Button>

        </div>
    );
}