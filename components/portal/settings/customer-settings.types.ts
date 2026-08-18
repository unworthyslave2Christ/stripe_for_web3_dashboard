export interface CustomerSettingsRecord {
    displayName: string;

    email: string;

    ownerWallet: string;

    smartAccount: string;

    network: string;

    billingNotifications: boolean;

    subscriptionNotifications: boolean;

    smartAccountNotifications: boolean;

    importantProductNotifications: boolean;

    preferredTheme:
        | "system"
        | "light"
        | "dark";

    sensitiveActionConfirmation: boolean;
}