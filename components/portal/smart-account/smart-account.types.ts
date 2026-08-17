export type SmartAccountStatus =
    | "ACTIVE"
    | "PENDING"
    | "SUSPENDED";

export type PermissionStatus =
    | "ACTIVE"
    | "PAUSED"
    | "REVOKED";

export interface SmartAccountRecord {
    address: string;

    ownerWallet: string;

    status: SmartAccountStatus;

    network: string;

    networkId: number;

    createdAt: string;

    activePermissions: number;

    billingAuthorization: PermissionStatus;

    supportedAssets: string[];
}