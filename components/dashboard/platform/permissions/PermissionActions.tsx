"use client";

import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PermissionActions({
    permissionId,
}: {
    permissionId: string;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Actions for ${permissionId}`}
        >
            <MoreHorizontal />
        </Button>
    );
}