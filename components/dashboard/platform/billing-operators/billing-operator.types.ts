export type BillingOperatorStatus =
    | "ACTIVE"
    | "PENDING"
    | "REVOKED"
    | "EXPIRED";

export type BillingOperatorType =
    | "HUMAN"
    | "SERVICE";

export type BillingOperatorPermission =
    | "CHARGE"
    | "REFUND"
    | "PAUSE"
    | "RESUME"
    | "CANCEL"
    | "RECONCILE";

export interface BillingOperatorRecord {
    id: string;

    operatorId: string;

    name: string;

    description: string;

    type: BillingOperatorType;

    address: string;

    status: BillingOperatorStatus;

    permissions: BillingOperatorPermission[];

    createdAt: string;

    lastActivity: string;

    expiresAt: string | null;
}