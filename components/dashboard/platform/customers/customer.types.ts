import type { LucideIcon } from "lucide-react";
import { Address } from "viem";

export type CustomerStatus =
    | "ACTIVE"
    | "INACTIVE"
    | "SUSPENDED";

export type CustomerRecord = {
    id: string;

    name: string;

    displayName?: string;

    email?: string;

    customerId: string;

    walletAddress: Address;

    smartAccount: Address;

    status: CustomerStatus;

    activeSubscriptions: number;

    totalSubscriptions: number;

    lifetimeRevenue: string;

    createdAt: string;

    ownerWallet?: Address;
    
    updatedAt?: Date;

    lastActivity: string;

};