import type {
    ActivityRecord,
} from "./activity.types";

import { ActivityEventIcon } from "./ActivityEventIcon";

import { ActivityEntity } from "./ActivityEntity";

export function ActivityEventItem({
    activity,
}: {
    activity: ActivityRecord;
}) {
    return (
        <div className="relative flex gap-4 pb-6 last:pb-0">

            <div className="relative z-10">
                <ActivityEventIcon
                    entityType={
                        activity.entityType
                    }
                    severity={
                        activity.severity
                    }
                />
            </div>

            <div className="min-w-0 flex-1 rounded-xl border bg-card p-4">

                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">

                    <div className="min-w-0">

                        <p className="text-sm font-medium">
                            {activity.summary}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {activity.description}
                        </p>

                    </div>

                    <span className="shrink-0 text-xs text-muted-foreground">
                        {activity.createdAt}
                    </span>

                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">

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

                </div>

            </div>

            <div className="absolute left-4 top-8 h-[calc(100%-16px)] w-px bg-border last:hidden" />

        </div>
    );
}