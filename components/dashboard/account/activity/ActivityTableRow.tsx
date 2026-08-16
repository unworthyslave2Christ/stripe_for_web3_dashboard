import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ActivityActor } from "./ActivityActor";
import { ActivityEntity } from "./ActivityEntity";
import { ActivityEvent } from "./ActivityEvent";
import { ActivityMetadata } from "./ActivityMetadata";
import { ActivitySeverityBadge } from "./ActivitySeverityBadge";
import { ActivityStatusBadge } from "./ActivityStatusBadge";
import { ActivityTypeBadge } from "./ActivityTypeBadge";

import type {
    ActivityRecord,
} from "./activity.types";

export function ActivityTableRow({
    activity,
}: {
    activity: ActivityRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">

                <ActivityEvent
                    activity={activity}
                />

            </td>

            <td className="px-4 py-4">

                <ActivityEntity
                    entityType={
                        activity.entityType
                    }
                    entityId={
                        activity.entityId
                    }
                    entityName={
                        activity.entityName
                    }
                />

            </td>

            <td className="px-4 py-4">

                <ActivityActor
                    actorType={
                        activity.actorType
                    }
                    actorName={
                        activity.actorName
                    }
                />

            </td>

            <td className="px-4 py-4">

                <ActivityTypeBadge
                    type={
                        activity.eventType
                    }
                />

            </td>

            <td className="px-4 py-4">

                <ActivitySeverityBadge
                    severity={
                        activity.severity
                    }
                />

            </td>

            <td className="px-4 py-4">

                <ActivityStatusBadge
                    status={
                        activity.status
                    }
                />

            </td>

            <td className="px-4 py-4">

                <ActivityMetadata
                    metadata={
                        activity.metadata
                    }
                />

            </td>

            <td className="px-4 py-4 text-right">

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label="Activity actions"
                >
                    <MoreHorizontal />
                </Button>

            </td>

        </tr>
    );
}