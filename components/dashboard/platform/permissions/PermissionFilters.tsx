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

export function PermissionFilters() {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="active">
                        Active
                    </SelectItem>

                    <SelectItem value="pending">
                        Pending
                    </SelectItem>

                    <SelectItem value="revoked">
                        Revoked
                    </SelectItem>

                    <SelectItem value="expired">
                        Expired
                    </SelectItem>

                </SelectContent>
            </Select>

            <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Scope" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All scopes
                    </SelectItem>

                    <SelectItem value="charge">
                        Charge
                    </SelectItem>

                    <SelectItem value="refund">
                        Refund
                    </SelectItem>

                    <SelectItem value="pause">
                        Pause
                    </SelectItem>

                    <SelectItem value="cancel">
                        Cancel
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