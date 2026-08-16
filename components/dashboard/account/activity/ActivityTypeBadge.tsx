import { Badge } from "@/components/ui/badge";

import type {
    ActivityEventType,
} from "./activity.types";

interface ActivityTypeBadgeProps {
    type: ActivityEventType;
}

export function ActivityTypeBadge({
    type,
}: ActivityTypeBadgeProps) {
    return (
        <Badge
            variant="outline"
            className="font-mono text-[10px]"
        >
            {formatEventType(type)}
        </Badge>
    );
}

function formatEventType(
    type: ActivityEventType,
) {
    return type
        .toLowerCase()
        .replaceAll("_", " ");
}