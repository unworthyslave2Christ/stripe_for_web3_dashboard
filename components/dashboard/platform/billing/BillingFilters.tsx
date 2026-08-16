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

export function BillingFilters() {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select defaultValue="all">
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="succeeded">
                        Succeeded
                    </SelectItem>

                    <SelectItem value="pending">
                        Pending
                    </SelectItem>

                    <SelectItem value="failed">
                        Failed
                    </SelectItem>

                    <SelectItem value="refunded">
                        Refunded
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select defaultValue="month">
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Period" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="today">
                        Today
                    </SelectItem>

                    <SelectItem value="week">
                        This week
                    </SelectItem>

                    <SelectItem value="month">
                        This month
                    </SelectItem>

                    <SelectItem value="year">
                        This year
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