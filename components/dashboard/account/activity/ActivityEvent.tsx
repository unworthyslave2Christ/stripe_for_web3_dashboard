import type {
    ActivityRecord,
} from "./activity.types";

import { ActivityEventIcon } from "./ActivityEventIcon";

export function ActivityEvent({
    activity,
}: {
    activity: ActivityRecord;
}) {
    return (
        <div className="flex min-w-0 items-start gap-3">

            <ActivityEventIcon
                entityType={
                    activity.entityType
                }
                severity={
                    activity.severity
                }
            />

            <div className="min-w-0">

                <p className="text-sm font-medium">
                    {activity.summary}
                </p>

                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {activity.description}
                </p>

            </div>

        </div>
    );
}