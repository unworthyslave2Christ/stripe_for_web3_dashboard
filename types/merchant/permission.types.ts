////////////////////////////////////////////////////////////
// PERMISSION STATUS
////////////////////////////////////////////////////////////

export type PermissionStatus =
    | "ACTIVE"
    | "PENDING"
    | "REVOKED"
    | "EXPIRED";

////////////////////////////////////////////////////////////
// PERMISSION SCOPE
////////////////////////////////////////////////////////////

export type PermissionScope =
    | "CHARGE"
    | "REFUND"
    | "PAUSE"
    | "RESUME"
    | "CANCEL"
    | "RECONCILE";

////////////////////////////////////////////////////////////
// CANONICAL PERMISSION RECORD
////////////////////////////////////////////////////////////

export interface PermissionRecord {
    id: string;

    permissionId: string;

    name: string;

    description: string;

    operatorId: string;

    operatorName: string;

    scope: PermissionScope[];

    status: PermissionStatus;

    createdAt: Date;

    expiresAt: Date | null;

    lastUsedAt: Date | null;
}