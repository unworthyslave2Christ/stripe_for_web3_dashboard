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

export function CustomerTransactionsToolbar() {
    return (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="relative w-full sm:max-w-xs">

                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Search transactions..."
                    className="pl-9"
                />

            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

                <Select defaultValue="all">

                    <SelectTrigger className="w-full sm:w-[175px]">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All transaction types
                        </SelectItem>

                        <SelectItem value="billing">
                            Subscription billing
                        </SelectItem>

                        <SelectItem value="permission">
                            Permission updates
                        </SelectItem>

                        <SelectItem value="account">
                            Account operations
                        </SelectItem>

                        <SelectItem value="refund">
                            Refunds
                        </SelectItem>

                    </SelectContent>

                </Select>

                <Select defaultValue="all">

                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All statuses
                        </SelectItem>

                        <SelectItem value="success">
                            Successful
                        </SelectItem>

                        <SelectItem value="pending">
                            Pending
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