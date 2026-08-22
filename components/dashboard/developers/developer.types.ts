// components/dashboard/developers/developer.types.ts

export type DeveloperEnvironment =
    | "TEST"
    | "LIVE";

export type ApiKeyStatus =
    | "ACTIVE"
    | "REVOKED"
    | "EXPIRED";

export type ApiKeyScope =
    | "READ_CUSTOMERS"
    | "READ_PLANS"
    | "READ_SUBSCRIPTIONS"
    | "READ_BILLING"
    | "WRITE_BILLING"
    | "WRITE_SUBSCRIPTIONS"
    | "MANAGE_WEBHOOKS";

export interface ApiKeyRecord {
    id: string;

    keyId: string;

    name: string;

    prefix: string;

    environment:
        DeveloperEnvironment;

    status:
        ApiKeyStatus;

    scopes:
        ApiKeyScope[];

    createdAt: string;

    lastUsedAt:
        | string
        | null;

    expiresAt:
        | string
        | null;

    createdBy: string;
}

export interface ApiKeyListState {
    available: boolean;

    keys: ApiKeyRecord[];

    loading: boolean;

    refreshing: boolean;

    error:
        | Error
        | null;
}

export interface ApiKeyActionAvailability {
    create: boolean;

    revoke: boolean;

    rotate: boolean;

    reveal: boolean;

    export: boolean;
}