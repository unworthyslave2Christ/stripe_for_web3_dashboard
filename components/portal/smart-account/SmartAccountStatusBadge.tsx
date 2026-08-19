import {
    CheckCircle2,
    Clock3,
    ShieldAlert,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import type {
    SmartAccountStatus,
} from "@/types/smart-account";

export function SmartAccountStatusBadge({
    status,
}: {
    status:
        | SmartAccountStatus
        | "NOT_CREATED";
}) {
    switch (status) {

        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    <CheckCircle2 />
                    Active
                </Badge>
            );

        case "PENDING":
            return (
                <Badge>
                    <Clock3 />
                    Pending
                </Badge>
            );

        case "SUSPENDED":
            return (
                <Badge variant="destructive">
                    <ShieldAlert />
                    Suspended
                </Badge>
            );

        case "NOT_CREATED":
            return (
                <Badge variant="outline">
                    Not created
                </Badge>
            );
    }
}