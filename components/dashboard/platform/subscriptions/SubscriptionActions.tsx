"use client";

import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function SubscriptionActions({
    subscriptionId,
}: {
    subscriptionId: number;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Actions for subscription ${subscriptionId}`}
        >
            <MoreHorizontal />
        </Button>
    );
}