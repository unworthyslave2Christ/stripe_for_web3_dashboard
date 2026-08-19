export type SmartAccountStatus =
    | "ACTIVE"
    | "PENDING"
    | "SUSPENDED";

export type PermissionStatus =
    | "ACTIVE"
    | "PAUSED"
    | "REVOKED";

export interface SmartAccountViewModel {
    address:
        | string
        | undefined;

    ownerWallet:
        | string
        | undefined;

    status:
        | SmartAccountStatus
        | "NOT_CREATED";

    network:
        | string
        | undefined;

    networkId:
        | number
        | undefined;

    createdAt:
        | string
        | undefined;

    activePermissions:
        | number
        | undefined;

    billingAuthorization:
        | PermissionStatus
        | "UNKNOWN";

    supportedAssets:
        string[];

    explorerUrl:
        | string
        | undefined;
}