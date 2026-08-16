export type ActivityEntityType =
    | "MERCHANT"
    | "CUSTOMER"
    | "PLAN"
    | "SUBSCRIPTION"
    | "BILLING"
    | "PERMISSION"
    | "OPERATOR"
    | "API_KEY"
    | "WEBHOOK"
    | "NOTIFICATION";

export type ActivityActorType =
    | "MERCHANT"
    | "CUSTOMER"
    | "OPERATOR"
    | "SYSTEM"
    | "API"
    | "WEBHOOK";

export type ActivitySeverity =
    | "INFO"
    | "SUCCESS"
    | "WARNING"
    | "ERROR";

export type ActivityStatus =
    | "COMPLETED"
    | "PENDING"
    | "FAILED";

export type ActivityEventType =
    | "MERCHANT_CREATED"
    | "CUSTOMER_CREATED"
    | "CUSTOMER_UPDATED"
    | "PLAN_CREATED"
    | "PLAN_UPDATED"
    | "PLAN_PAUSED"
    | "PLAN_ARCHIVED"
    | "SUBSCRIPTION_CREATED"
    | "SUBSCRIPTION_PAUSED"
    | "SUBSCRIPTION_RESUMED"
    | "SUBSCRIPTION_CANCELLED"
    | "BILLING_SUCCEEDED"
    | "BILLING_FAILED"
    | "BILLING_REFUNDED"
    | "PERMISSION_CREATED"
    | "PERMISSION_UPDATED"
    | "PERMISSION_REVOKED"
    | "OPERATOR_CREATED"
    | "OPERATOR_REVOKED"
    | "API_KEY_CREATED"
    | "API_KEY_REVOKED"
    | "WEBHOOK_CREATED"
    | "WEBHOOK_FAILED"
    | "NOTIFICATION_SENT"
    | "NOTIFICATION_FAILED";

export interface ActivityRecord {
    id: string;

    eventId: string;

    eventType: ActivityEventType;

    entityType: ActivityEntityType;

    entityId: string;

    entityName: string;

    actorType: ActivityActorType;

    actorId: string;

    actorName: string;

    severity: ActivitySeverity;

    status: ActivityStatus;

    summary: string;

    description: string;

    createdAt: string;

    metadata: Record<string, string>;
}