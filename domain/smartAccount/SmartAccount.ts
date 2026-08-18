export interface SmartAccount {
    address: string;

    ownerWallet: string;

    network: string;

    status:
        | "ACTIVE"
        | "PENDING"
        | "SUSPENDED";
}