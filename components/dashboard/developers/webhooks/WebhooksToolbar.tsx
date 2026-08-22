"use client";

import {
    Stack,
} from "@/components/layout/Stack";

import {
    WebhooksSearch,
} from "./WebhooksSearch";

import {
    WebhooksActions,
} from "./WebhooksActions";

import {
    WebhookFilters,
} from "./WebhookFilters";

import type {
    WebhookEnvironment,
    WebhookEvent,
    WebhookStatus,
} from "./webhook.types";

////////////////////////////////////////////////////////////
// PROPS
////////////////////////////////////////////////////////////

export interface WebhooksToolbarProps {
    search: string;

    onSearchChange: (
        value: string,
    ) => void;

    environment:
        | "all"
        | WebhookEnvironment;

    status:
        | "all"
        | WebhookStatus;

    event:
        | "all"
        | WebhookEvent;

    onEnvironmentChange: (
        value:
            | "all"
            | WebhookEnvironment,
    ) => void;

    onStatusChange: (
        value:
            | "all"
            | WebhookStatus,
    ) => void;

    onEventChange: (
        value:
            | "all"
            | WebhookEvent,
    ) => void;

    onRefresh: () => void;

    refreshing: boolean;

    refreshAvailable: boolean;
}

////////////////////////////////////////////////////////////
// TOOLBAR
////////////////////////////////////////////////////////////

export function WebhooksToolbar({
    search,

    onSearchChange,

    environment,

    status,

    event,

    onEnvironmentChange,

    onStatusChange,

    onEventChange,

    onRefresh,

    refreshing,

    refreshAvailable,
}: WebhooksToolbarProps) {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <WebhooksSearch
                        value={search}
                        onChange={
                            onSearchChange
                        }
                    />

                    <WebhooksActions
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

                <WebhookFilters
                    environment={
                        environment
                    }
                    status={
                        status
                    }
                    event={
                        event
                    }
                    onEnvironmentChange={
                        onEnvironmentChange
                    }
                    onStatusChange={
                        onStatusChange
                    }
                    onEventChange={
                        onEventChange
                    }
                />

            </Stack>

        </div>
    );
}