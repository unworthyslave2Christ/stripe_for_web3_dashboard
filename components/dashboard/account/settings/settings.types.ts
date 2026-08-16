export type SettingsSection =
    | "GENERAL"
    | "BILLING"
    | "NOTIFICATIONS"
    | "DEVELOPERS"
    | "SECURITY"
    | "DANGER";

export type MerchantStatus =
    | "ACTIVE"
    | "PAUSED"
    | "DISABLED";

export interface MerchantSettingsRecord {
    merchantId: number;

    name: string;

    metadataUri: string;

    status: MerchantStatus;

    defaultEnvironment: "TEST" | "LIVE";

    billingNotificationsEnabled: boolean;

    operationalNotificationsEnabled: boolean;

    sensitiveActionConfirmation: boolean;
}