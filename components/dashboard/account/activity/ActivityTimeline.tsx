import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type {
    ActivityRecord,
} from "./activity.types";

import {
    ActivityEventItem,
} from "./ActivityEventItem";

export function ActivityTimeline({
    activities,
}: {
    activities: ActivityRecord[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Recent timeline
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div>
                    {activities
                        .slice(0, 5)
                        .map(
                            (
                                activity,
                            ) => (
                                <ActivityEventItem
                                    key={
                                        activity.id
                                    }
                                    activity={
                                        activity
                                    }
                                />
                            ),
                        )}
                </div>
            </CardContent>
        </Card>
    );
}