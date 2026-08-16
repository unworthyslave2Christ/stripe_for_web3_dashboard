export type PermissionStatus =
    | "ACTIVE"
    | "PENDING"
    | "REVOKED"
    | "EXPIRED";

export type PermissionScope =
    | "CHARGE"
    | "REFUND"
    | "PAUSE"
    | "RESUME"
    | "CANCEL"
    | "RECONCILE";

export interface PermissionRecord {
    id: string;

    permissionId: string;

    name: string;

    description: string;

    operatorId: string;

    operatorName: string;

    scope: PermissionScope[];

    status: PermissionStatus;

    createdAt: string;

    expiresAt: string | null;

    lastUsedAt: string | null;
}