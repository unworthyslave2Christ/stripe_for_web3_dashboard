"use client";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    NotificationsSearch,
} from "./NotificationsSearch";

import {
    NotificationFilters,
} from "./NotificationFilters";

import {
    NotificationsActions,
} from "./NotificationsActions";

import type {
    NotificationChannel,
    NotificationStatus,
} from "./notification.types";

export interface NotificationsToolbarProps {
    search: string;

    onSearchChange: (
        value: string,
    ) => void;

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

    onRefresh: () => void;

    refreshing: boolean;

    refreshAvailable: boolean;
}

export function NotificationsToolbar({
    search,
    onSearchChange,
    status,
    channel,
    onStatusChange,
    onChannelChange,
    onRefresh,
    refreshing,
    refreshAvailable,
}: NotificationsToolbarProps) {
    return (
        <div className="rounded-xl border bg-card p-4">
            <Stack gap={4}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <NotificationsSearch
                        value={search}
                        onChange={
                            onSearchChange
                        }
                    />

                    <NotificationsActions
                        onRefresh={
                            onRefresh
                        }
                        refreshing={
                            refreshing
                        }
                        refreshAvailable={
                            refreshAvailable
                        }
                    />
                </div>

                <NotificationFilters
                    status={
                        status
                    }
                    channel={
                        channel
                    }
                    onStatusChange={
                        onStatusChange
                    }
                    onChannelChange={
                        onChannelChange
                    }
                />
            </Stack>
        </div>
    );
}