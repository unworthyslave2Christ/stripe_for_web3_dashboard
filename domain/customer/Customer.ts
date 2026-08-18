export interface Customer {
    id: string;

    displayName: string;

    email: string;

    ownerWallet: string;

    smartAccount: string;

    status:
        | "ACTIVE"
        | "PENDING"
        | "SUSPENDED";
}