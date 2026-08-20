import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerStatus,
} from "./customer.types";

export function CustomerStatusBadge({
    status,
}: {
    status: CustomerStatus;
}) {
    switch (status) {
        case "ACTIVE":
            return (
                <Badge variant="secondary">
                    Active
                </Badge>
            );

        case "SUSPENDED":
            return (
                <Badge variant="destructive">
                    Suspended
                </Badge>
            );
    }
}