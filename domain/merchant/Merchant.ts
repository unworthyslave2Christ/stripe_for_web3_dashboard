export interface Merchant {
    id: number;

    name: string;

    metadataUri: string;

    status:
        | "ACTIVE"
        | "PAUSED"
        | "DISABLED";
}