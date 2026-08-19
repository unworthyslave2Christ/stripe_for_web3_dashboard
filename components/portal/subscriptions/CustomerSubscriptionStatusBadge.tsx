import {
    CheckCircle2,
    Clock3,
    PauseCircle,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerSubscriptionStatus,
} from "@/types/customer-subscription";

export function CustomerSubscriptionStatusBadge({
    status,
}: {
    status:
        CustomerSubscriptionStatus;
}) {
    switch (status) {

        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    <CheckCircle2 />
                    Active
                </Badge>
            );

        case "PAUSED":
            return (
                <Badge variant="outline">
                    <PauseCircle />
                    Paused
                </Badge>
            );

        case "PENDING":
            return (
                <Badge>
                    <Clock3 />
                    Pending
                </Badge>
            );

        case "CANCELLED":
            return (
                <Badge variant="destructive">
                    Cancelled
                </Badge>
            );
    }
}