"use client";

import { Badge } from "@/components/ui/badge";

import type {
    MerchantSubscriptionStatus,
} from "@/types/merchant/subscription";

export function SubscriptionStatusBadge({
    status,
}: {
    status: MerchantSubscriptionStatus;
}) {
    switch (status) {
        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    Active
                </Badge>
            );

        case "PAUSED":
            return (
                <Badge variant="outline">
                    Paused
                </Badge>
            );

        case "CANCELLED":
            return (
                <Badge variant="destructive">
                    Cancelled
                </Badge>
            );

        case "PENDING":
            return (
                <Badge>
                    Pending
                </Badge>
            );

        default:
            return (
                <Badge variant="outline">
                    Unknown
                </Badge>
            );
    }
}