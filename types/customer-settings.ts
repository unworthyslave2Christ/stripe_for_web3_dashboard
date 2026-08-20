export interface CustomerSettingsProfile {
    displayName: string;

    email: string;
}

export interface CustomerSettingsWallet {
    ownerWallet:
        | string
        | undefined;

    smartAccount:
        | string
        | undefined;

    network:
        | string
        | undefined;
}

export interface CustomerSettingsState {
    emailNotifications: boolean;

    inAppNotifications: boolean;

    securityNotifications: boolean;

    confirmSensitiveActions: boolean;
}