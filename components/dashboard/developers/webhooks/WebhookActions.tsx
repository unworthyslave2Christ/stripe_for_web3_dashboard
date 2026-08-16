"use client";

import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function WebhookActions({
    webhookId,
}: {
    webhookId: string;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Actions for ${webhookId}`}
        >
            <MoreHorizontal />
        </Button>
    );
}