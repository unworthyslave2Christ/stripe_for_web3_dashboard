"use client";

import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function ApiKeyActions({
    keyId,
    available = false,
}: {
    keyId: string;

    available?: boolean;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-8"
            disabled={!available}
            aria-label={`Actions for ${keyId}`}
        >
            <MoreHorizontal />
        </Button>
    );
}