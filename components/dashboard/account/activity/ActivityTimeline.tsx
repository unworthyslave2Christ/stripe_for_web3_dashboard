import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ActivityEventItem,
} from "./ActivityEventItem";

import type {
    ActivityRecord,
} from "./activity.types";

const timelineEvents: ActivityRecord[] = [
    {
        id: "timeline_001",
        eventId: "evt_01",
        eventType: "BILLING_SUCCEEDED",
        entityType: "BILLING",
        entityId: "billing_01",
        entityName: "Pro billing",
        actorType: "SYSTEM",
        actorId: "system",
        actorName: "Stripe for Web3",
        severity: "SUCCESS",
        status: "COMPLETED",
        summary: "Billing succeeded",
        description:
            "A recurring payment completed successfully.",
        createdAt: "2 minutes ago",
        metadata: {},
    },
    {
        id: "timeline_002",
        eventId: "evt_02",
        eventType: "SUBSCRIPTION_CREATED",
        entityType: "SUBSCRIPTION",
        entityId: "10022",
        entityName: "Enterprise subscription",
        actorType: "CUSTOMER",
        actorId: "cus_4B21C8",
        actorName: "Chain Finance",
        severity: "SUCCESS",
        status: "COMPLETED",
        summary: "Subscription created",
        description:
            "A customer subscribed to the Enterprise plan.",
        createdAt: "8 minutes ago",
        metadata: {},
    },
    {
        id: "timeline_003",
        eventId: "evt_03",
        eventType: "WEBHOOK_FAILED",
        entityType: "WEBHOOK",
        entityId: "webhook_004",
        entityName: "Legacy endpoint",
        actorType: "SYSTEM",
        actorId: "system",
        actorName: "Stripe for Web3",
        severity: "WARNING",
        status: "FAILED",
        summary: "Webhook delivery failed",
        description:
            "A webhook endpoint failed to respond successfully.",
        createdAt: "1 hour ago",
        metadata: {},
    },
];

export function ActivityTimeline() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Recent timeline
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div>

                    {timelineEvents.map(
                        (activity) => (
                            <ActivityEventItem
                                key={
                                    activity.id
                                }
                                activity={
                                    activity
                                }
                            />
                        ),
                    )}

                </div>

            </CardContent>

        </Card>
    );
}