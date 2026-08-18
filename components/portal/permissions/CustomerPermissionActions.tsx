"use client";

import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function CustomerPermissionActions({
    permissionId,
}: {
    permissionId: string;
}) {
    return (
        <Button
            variant="outline"
            size="sm"
            aria-label={`Actions for ${permissionId}`}
        >
            Manage
            <MoreHorizontal />
        </Button>
    );
}