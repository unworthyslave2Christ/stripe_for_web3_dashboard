import {
    Stack,
} from "@/components/layout/Stack";

import {
    NotificationFilters,
} from "./NotificationFilters";

import {
    NotificationsActions,
} from "./NotificationsActions";

import {
    NotificationsSearch,
} from "./NotificationsSearch";

export function NotificationsToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">

            <Stack gap={4}>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <NotificationsSearch />

                    <NotificationsActions />

                </div>

                <NotificationFilters />

            </Stack>

        </div>
    );
}