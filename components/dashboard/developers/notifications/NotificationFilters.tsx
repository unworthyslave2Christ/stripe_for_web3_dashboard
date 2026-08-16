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

export function NotificationFilters() {
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

                    <SelectItem value="active">
                        Active
                    </SelectItem>

                    <SelectItem value="paused">
                        Paused
                    </SelectItem>

                    <SelectItem value="draft">
                        Draft
                    </SelectItem>

                </SelectContent>
            </Select>

            <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Channel" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All channels
                    </SelectItem>

                    <SelectItem value="email">
                        Email
                    </SelectItem>

                    <SelectItem value="webhook">
                        Webhook
                    </SelectItem>

                    <SelectItem value="in-app">
                        In-app
                    </SelectItem>

                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="sm"
            >
                <SlidersHorizontal />
                Trigger
            </Button>

        </div>
    );
}