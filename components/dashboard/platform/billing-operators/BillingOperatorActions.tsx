import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function BillingOperatorActions({
    operatorId,
    disabled = false,
}: {
    operatorId: string;
    disabled?: boolean;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Actions for ${operatorId}`}
            disabled={disabled}
        >
            <MoreHorizontal />
        </Button>
    );
}