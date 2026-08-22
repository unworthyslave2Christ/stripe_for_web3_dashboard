import {
    Card,
    CardContent,
} from "@/components/ui/card";

import type {
    ActivityRecord,
} from "./activity.types";

import {
    ActivityTableRow,
} from "./ActivityTableRow";

export function ActivityTable({
    activities,
}: {
    activities: ActivityRecord[];
}) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1400px]">
                        <thead>
                            <tr className="border-b bg-muted/30">
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Event
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Entity
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Actor
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Type
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Severity
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Metadata
                                </th>

                                <th className="px-4 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {activities.map(
                                (
                                    activity,
                                ) => (
                                    <ActivityTableRow
                                        key={
                                            activity.id
                                        }
                                        activity={
                                            activity
                                        }
                                    />
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}