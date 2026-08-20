"use client";

import {
    Bell,
    CalendarClock,
    CreditCard,
    ShieldCheck,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Label,
} from "@/components/ui/label";

import {
    Switch,
} from "@/components/ui/switch";

import type {
    CustomerNotificationPreference,
} from "@/types/customer-notification";

interface NotificationPreferenceGroupProps {
    icon: typeof CreditCard;

    title: string;

    description: string;

    items:
        CustomerNotificationPreference[];

    onChange:
        (
            id: string,
            enabled: boolean,
        ) => void;
}

export function CustomerNotificationPreferences({
    grouped,
    onChange,
    demo,
}: {
    grouped: {
        BILLING:
            CustomerNotificationPreference[];

        SUBSCRIPTIONS:
            CustomerNotificationPreference[];

        SMART_ACCOUNT:
            CustomerNotificationPreference[];

        GENERAL:
            CustomerNotificationPreference[];
    };

    onChange:
        (
            id: string,
            enabled: boolean,
        ) => void;

    demo: boolean;
}) {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Notification preferences
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Choose the events you want to be notified about.
                </p>

            </CardHeader>

            <CardContent className="space-y-6">

                <NotificationPreferenceGroup
                    icon={
                        CreditCard
                    }
                    title="Billing"
                    description="Important events related to your recurring charges."
                    items={
                        grouped.BILLING
                    }
                    onChange={
                        onChange
                    }
                />

                <NotificationPreferenceGroup
                    icon={
                        CalendarClock
                    }
                    title="Subscriptions"
                    description="Important lifecycle changes involving your subscriptions."
                    items={
                        grouped.SUBSCRIPTIONS
                    }
                    onChange={
                        onChange
                    }
                />

                <NotificationPreferenceGroup
                    icon={
                        ShieldCheck
                    }
                    title="Smart Account"
                    description="Important security and authorization events."
                    items={
                        grouped.SMART_ACCOUNT
                    }
                    onChange={
                        onChange
                    }
                />

                <NotificationPreferenceGroup
                    icon={
                        Bell
                    }
                    title="General"
                    description="Other important customer notifications."
                    items={
                        grouped.GENERAL
                    }
                    onChange={
                        onChange
                    }
                />

                {demo && (
                    <p className="text-xs text-muted-foreground">
                        Preference changes are currently local test-mode state.
                    </p>
                )}

            </CardContent>

        </Card>
    );
}

function NotificationPreferenceGroup({
    icon: Icon,
    title,
    description,
    items,
    onChange,
}: NotificationPreferenceGroupProps) {
    return (
        <div className="space-y-4 border-b pb-6 last:border-0 last:pb-0">

            <div className="flex items-start gap-3">

                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">

                    <Icon className="size-4 text-muted-foreground" />

                </div>

                <div>

                    <p className="text-sm font-medium">
                        {title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {description}
                    </p>

                </div>

            </div>

            <div className="space-y-3 pl-0 sm:pl-11">

                {items.map(
                    (
                        item,
                    ) => (
                        <div
                            key={
                                item.id
                            }
                            className="flex items-start justify-between gap-6 rounded-lg border p-3"
                        >

                            <div>

                                <Label
                                    htmlFor={
                                        item.id
                                    }
                                    className="text-sm font-medium"
                                >
                                    {
                                        item.title
                                    }
                                </Label>

                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    {
                                        item.description
                                    }
                                </p>

                            </div>

                            <Switch
                                id={
                                    item.id
                                }
                                checked={
                                    item.enabled
                                }
                                onCheckedChange={(
                                    checked,
                                ) =>
                                    onChange(
                                        item.id,
                                        checked,
                                    )
                                }
                            />

                        </div>
                    ),
                )}

            </div>

        </div>
    );
}