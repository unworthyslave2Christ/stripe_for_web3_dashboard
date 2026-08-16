import type { LucideIcon } from "lucide-react";

export type CustomerStatus =
    | "ACTIVE"
    | "INACTIVE"
    | "SUSPENDED";

export type CustomerRecord = {
    id: string;

    name: string;

    customerId: string;

    walletAddress: string;

    smartAccount: string;

    status: CustomerStatus;

    activeSubscriptions: number;

    totalSubscriptions: number;

    lifetimeRevenue: string;

    createdAt: string;

    lastActivity: string;
};