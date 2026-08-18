"use client";

import {
    Bell,
    CalendarClock,
    CreditCard,
    ShieldCheck,
} from "lucide-react";

import {
    Switch,
} from "@/components/ui/switch";

import {
    Label,
} from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerNotificationPreferences() {
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
                    icon={CreditCard}
                    title="Billing"
                    description="Important events related to your recurring charges."
                    items={[
                        {
                            id: "billing-upcoming",
                            title: "Upcoming billing",
                            description:
                                "Notify me before a scheduled subscription charge.",
                            defaultChecked: true,
                        },
                        {
                            id: "billing-succeeded",
                            title: "Successful billing",
                            description:
                                "Notify me when a recurring charge succeeds.",
                            defaultChecked: false,
                        },
                        {
                            id: "billing-failed",
                            title: "Failed billing",
                            description:
                                "Notify me when a recurring charge fails.",
                            defaultChecked: true,
                        },
                    ]}
                />

                <NotificationPreferenceGroup
                    icon={CalendarClock}
                    title="Subscriptions"
                    description="Important lifecycle changes involving your subscriptions."
                    items={[
                        {
                            id: "subscription-created",
                            title: "Subscription created",
                            description:
                                "Notify me when a new subscription becomes active.",
                            defaultChecked: true,
                        },
                        {
                            id: "subscription-paused",
                            title: "Subscription paused",
                            description:
                                "Notify me when a subscription is paused.",
                            defaultChecked: true,
                        },
                        {
                            id: "subscription-cancelled",
                            title: "Subscription cancelled",
                            description:
                                "Notify me when a subscription is cancelled.",
                            defaultChecked: true,
                        },
                    ]}
                />

                <NotificationPreferenceGroup
                    icon={ShieldCheck}
                    title="Smart Account"
                    description="Important security and authorization events."
                    items={[
                        {
                            id: "smart-account-event",
                            title: "Smart Account activity",
                            description:
                                "Notify me about important account or permission events.",
                            defaultChecked: true,
                        },
                    ]}
                />

                <NotificationPreferenceGroup
                    icon={Bell}
                    title="General"
                    description="Other important customer notifications."
                    items={[
                        {
                            id: "general-notifications",
                            title: "Important product notifications",
                            description:
                                "Receive important messages related to your Stripe for Web3 account.",
                            defaultChecked: true,
                        },
                    ]}
                />

            </CardContent>

        </Card>
    );
}

function NotificationPreferenceGroup({
    icon: Icon,
    title,
    description,
    items,
}: {
    icon: typeof CreditCard;
    title: string;
    description: string;
    items: Array<{
        id: string;
        title: string;
        description: string;
        defaultChecked: boolean;
    }>;
}) {
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

            <div className="space-y-3 pl-11">

                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-start justify-between gap-6 rounded-lg border p-3"
                    >

                        <div>

                            <Label
                                htmlFor={item.id}
                                className="text-sm font-medium"
                            >
                                {item.title}
                            </Label>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                {item.description}
                            </p>

                        </div>

                        <Switch
                            id={item.id}
                            defaultChecked={
                                item.defaultChecked
                            }
                        />

                    </div>
                ))}

            </div>

        </div>
    );
}