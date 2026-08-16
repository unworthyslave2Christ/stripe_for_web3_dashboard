"use client";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function CustomerFilters() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All customers
                    </SelectItem>

                    <SelectItem value="active">
                        Active
                    </SelectItem>

                    <SelectItem value="inactive">
                        Inactive
                    </SelectItem>

                    <SelectItem value="suspended">
                        Suspended
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