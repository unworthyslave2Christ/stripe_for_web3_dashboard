import {
    Badge,
} from "@/components/ui/badge";

import type {
    CustomerTransactionStatus,
} from "./customer-transaction.types";

export function CustomerTransactionStatusBadge({
    status,
}: {
    status: CustomerTransactionStatus;
}) {
    switch (status) {
        case "SUCCESS":
            return (
                <Badge variant="secondary">
                    Successful
                </Badge>
            );

        case "PENDING":
            return (
                <Badge>
                    Pending
                </Badge>
            );

        case "FAILED":
            return (
                <Badge variant="destructive">
                    Failed
                </Badge>
            );
    }
}