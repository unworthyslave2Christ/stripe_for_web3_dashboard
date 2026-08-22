"use client";

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
    WebhookEnvironment,
    WebhookStatus,
    WebhookEvent,
} from "./webhook.types";

export function WebhookFilters({
    environment,
    status,
    event,
    onEnvironmentChange,
    onStatusChange,
    onEventChange,
}: {
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
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Select
                value={environment}
                onValueChange={(value) => {
                    onEnvironmentChange(
                        value as
                            | "all"
                            | WebhookEnvironment,
                    );
                }}
            >
                <SelectTrigger className="w-[145px]">
                    <SelectValue placeholder="Environment" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All environments
                    </SelectItem>

                    <SelectItem value="TEST">
                        Test
                    </SelectItem>

                    <SelectItem value="LIVE">
                        Live
                    </SelectItem>

                </SelectContent>

            </Select>

            <Select
                value={status}
                onValueChange={(value) => {
                    onStatusChange(
                        value as
                            | "all"
                            | WebhookStatus,
                    );
                }}
            >
                <SelectTrigger className="w-[135px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All statuses
                    </SelectItem>

                    <SelectItem value="ACTIVE">
                        Active
                    </SelectItem>

                    <SelectItem value="DISABLED">
                        Disabled
                    </SelectItem>

                    <SelectItem value="FAILING">
                        Failing
                    </SelectItem>

                </SelectContent>
            </Select>

            <Select
                value={event}
                onValueChange={(value) => {
                    onEventChange(
                        value as
                            | "all"
                            | WebhookEvent,
                    );
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Event" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All events
                    </SelectItem>

                    <SelectItem value="customer.created">
                        Customer created
                    </SelectItem>

                    <SelectItem value="subscription.created">
                        Subscription created
                    </SelectItem>

                    <SelectItem value="subscription.cancelled">
                        Subscription cancelled
                    </SelectItem>

                    <SelectItem value="billing.succeeded">
                        Billing succeeded
                    </SelectItem>

                    <SelectItem value="billing.failed">
                        Billing failed
                    </SelectItem>

                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="sm"
                disabled
            >
                More filters
            </Button>

        </div>
    );
}