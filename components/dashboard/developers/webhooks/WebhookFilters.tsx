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

export function WebhookFilters() {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select defaultValue="all">
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Environment" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All environments
                    </SelectItem>

                    <SelectItem value="test">
                        Test
                    </SelectItem>

                    <SelectItem value="live">
                        Live
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select defaultValue="all">
                <SelectTrigger className="w-[135px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="active">
                        Active
                    </SelectItem>

                    <SelectItem value="disabled">
                        Disabled
                    </SelectItem>

                    <SelectItem value="failing">
                        Failing
                    </SelectItem>
                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="sm"
            >
                <SlidersHorizontal />
                Events
            </Button>

        </div>
    );
}