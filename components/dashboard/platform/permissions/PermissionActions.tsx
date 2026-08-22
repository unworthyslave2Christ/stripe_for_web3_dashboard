import {
    MoreHorizontal,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PermissionActions({
    permissionId,
    available,
}: {
    permissionId: string;

    available: boolean;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-8"
            disabled={!available}
            aria-label={`Actions for ${permissionId}`}
        >
            <MoreHorizontal />
        </Button>
    );
}