import {
    Badge,
} from "@/components/ui/badge";

import type {
    BillingOperatorType as OperatorType,
} from "./billing-operator.types";

export function BillingOperatorType({
    type,
}: {
    type: OperatorType;
}) {
    return (
        <Badge variant="outline">
            {type === "HUMAN"
                ? "Human"
                : "Service"}
        </Badge>
    );
}