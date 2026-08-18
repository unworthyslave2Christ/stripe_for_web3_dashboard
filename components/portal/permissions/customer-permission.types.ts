export type CustomerPermissionStatus =
    | "ACTIVE"
    | "PAUSED"
    | "REVOKED";

export type CustomerPermissionScope =
    | "SUBSCRIPTION_BILLING"
    | "REFUND"
    | "SUBSCRIPTION_MANAGEMENT"
    | "ACCOUNT_OPERATION";

export interface CustomerPermissionRecord {
    id: string;

    permissionId: string;

    name: string;

    description: string;

    status: CustomerPermissionStatus;

    scope: CustomerPermissionScope[];

    createdAt: string;

    updatedAt: string;

    subscriptionIds: number[];

    subscriptionNames: string[];

    smartAccount: string;
}