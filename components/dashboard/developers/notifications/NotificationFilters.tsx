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

import type {
    NotificationChannel,
    NotificationStatus,
} from "./notification.types";

export function NotificationFilters({
    status,
    channel,
    onStatusChange,
    onChannelChange,
}: {
    status:
        | "all"
        | NotificationStatus;

    channel:
        | "all"
        | NotificationChannel;

    onStatusChange: (
        value:
            | "all"
            | NotificationStatus,
    ) => void;

    onChannelChange: (
        value:
            | "all"
            | NotificationChannel,
    ) => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Select
                value={status}
                onValueChange={(value) =>
                    onStatusChange(
                        value as
                            | "all"
                            | NotificationStatus,
                    )
                }
            >
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="ACTIVE">
                        Active
                    </SelectItem>

                    <SelectItem value="PAUSED">
                        Paused
                    </SelectItem>

                    <SelectItem value="DRAFT">
                        Draft
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={channel}
                onValueChange={(value) =>
                    onChannelChange(
                        value as
                            | "all"
                            | NotificationChannel,
                    )
                }
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Channel" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All channels
                    </SelectItem>

                    <SelectItem value="EMAIL">
                        Email
                    </SelectItem>

                    <SelectItem value="WEBHOOK">
                        Webhook
                    </SelectItem>

                    <SelectItem value="IN_APP">
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