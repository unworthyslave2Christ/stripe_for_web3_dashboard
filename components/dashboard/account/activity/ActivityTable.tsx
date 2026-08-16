import { Card, CardContent } from "@/components/ui/card";

import {
    ActivityTableRow,
} from "./ActivityTableRow";

import type {
    ActivityRecord,
} from "./activity.types";

const activities: ActivityRecord[] = [
    {
        id: "activity_001",
        eventId: "evt_8F42A1",
        eventType: "BILLING_SUCCEEDED",
        entityType: "BILLING",
        entityId: "billing_8F42A1",
        entityName: "Pro subscription billing",
        actorType: "SYSTEM",
        actorId: "system",
        actorName: "Stripe for Web3",
        severity: "SUCCESS",
        status: "COMPLETED",
        summary: "Billing succeeded",
        description:
            "Recurring billing completed successfully for the Pro subscription.",
        createdAt: "2 minutes ago",
        metadata: {
            amount: "19 USD",
            subscription: "10021",
            token: "USDC",
        },
    },
    {
        id: "activity_002",
        eventId: "evt_7D28B4",
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
            "A customer created an Enterprise subscription.",
        createdAt: "8 minutes ago",
        metadata: {
            plan: "Enterprise",
            customer: "cus_4B21C8",
        },
    },
    {
        id: "activity_003",
        eventId: "evt_72BC9A",
        eventType: "BILLING_FAILED",
        entityType: "BILLING",
        entityId: "billing_72BC9A",
        entityName: "Pro subscription billing",
        actorType: "SYSTEM",
        actorId: "system",
        actorName: "Stripe for Web3",
        severity: "ERROR",
        status: "FAILED",
        summary: "Billing failed",
        description:
            "Recurring billing could not be completed for the customer.",
        createdAt: "18 minutes ago",
        metadata: {
            reason: "Insufficient balance",
            subscription: "10024",
        },
    },
    {
        id: "activity_004",
        eventId: "evt_52F1A8",
        eventType: "PERMISSION_UPDATED",
        entityType: "PERMISSION",
        entityId: "perm_002",
        entityName: "Finance Refund",
        actorType: "OPERATOR",
        actorId: "op_admin_primary",
        actorName: "Primary Administrator",
        severity: "INFO",
        status: "COMPLETED",
        summary: "Permission updated",
        description:
            "The Finance Refund policy was modified by an authorized administrator.",
        createdAt: "32 minutes ago",
        metadata: {
            scope: "REFUND",
        },
    },
    {
        id: "activity_005",
        eventId: "evt_19A7D2",
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
            "A webhook endpoint returned an unsuccessful response.",
        createdAt: "1 hour ago",
        metadata: {
            endpoint:
                "https://legacy.acmeflow.com/events",
            attempts: "3",
        },
    },
];

export function ActivityTable() {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1400px]">

                        <thead>

                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Event
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Entity
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Actor
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Type
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Severity
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Metadata
                                </th>

                                <th className="px-4 py-3" />

                            </tr>

                        </thead>

                        <tbody>

                            {activities.map(
                                (activity) => (
                                    <ActivityTableRow
                                        key={
                                            activity.id
                                        }
                                        activity={
                                            activity
                                        }
                                    />
                                ),
                            )}

                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}