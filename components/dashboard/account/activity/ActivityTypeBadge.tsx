import {
    Badge,
} from "@/components/ui/badge";

import type {
    ActivityEventType,
} from "./activity.types";

export function ActivityTypeBadge({
    type,
}: {
    type: ActivityEventType;
}) {
    return (
        <Badge
            variant="outline"
            className="font-mono text-[10px]"
        >
            {type
                .toLowerCase()
                .replaceAll(
                    "_",
                    " ",
                )}
        </Badge>
    );
}