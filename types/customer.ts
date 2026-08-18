export interface CustomerRecord {
    id: string;

    displayName: string;

    email: string;

    ownerWallet: string;

    smartAccount: string;

    status: string;
}

export interface CustomerRegisterResult {
    customer:
        | CustomerRecord
        | null;
}