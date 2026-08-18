"use client";

import {
    Search,
} from "lucide-react";

import {
    Input,
} from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function CustomerNotificationsToolbar() {
    return (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="relative w-full sm:max-w-xs">

                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Search notifications..."
                    className="pl-9"
                />

            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

                <Select defaultValue="all">

                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All notification types
                        </SelectItem>

                        <SelectItem value="billing">
                            Billing
                        </SelectItem>

                        <SelectItem value="subscription">
                            Subscriptions
                        </SelectItem>

                        <SelectItem value="smart-account">
                            Smart Account
                        </SelectItem>

                    </SelectContent>

                </Select>

                <Select defaultValue="all">

                    <SelectTrigger className="w-full sm:w-[145px]">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All statuses
                        </SelectItem>

                        <SelectItem value="read">
                            Read
                        </SelectItem>

                        <SelectItem value="delivered">
                            Delivered
                        </SelectItem>

                        <SelectItem value="failed">
                            Failed
                        </SelectItem>

                    </SelectContent>

                </Select>

            </div>

        </div>
    );
}