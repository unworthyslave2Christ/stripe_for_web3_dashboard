"use client";

import {
    SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function ActivityFilters() {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Entity" />
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

            <Select defaultValue="all">
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Severity" />
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

            <Select defaultValue="30d">
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Period" />
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