"use client";

import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerSubscriptionActions({
    subscriptionId,
}: {
    subscriptionId: number;
}) {
    return (
        <Button
            variant="outline"
            size="sm"
            aria-label={`Actions for subscription ${subscriptionId}`}
        >
            Manage
            <MoreHorizontal />
        </Button>
    );
}