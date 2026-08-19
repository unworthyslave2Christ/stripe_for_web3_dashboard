import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    SmartAccountActivityItem,
} from "./SmartAccountActivityItem";

export function SmartAccountActivity({
    activity,
    demo,
}: {
    activity: {
        title: string;

        description: string;

        time: string;
    }[];

    demo: boolean;
}) {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Smart Account activity
                </CardTitle>

            </CardHeader>

            <CardContent>

                {activity.length ===
                0 ? (
                    <p className="text-sm text-muted-foreground">
                        No activity is currently available.
                    </p>
                ) : (
                    <>
                        <div className="space-y-0">

                            {activity.map(
                                (
                                    event,
                                    index,
                                ) => (
                                    <SmartAccountActivityItem
                                        key={`${event.title}-${index}`}
                                        {...event}
                                    />
                                ),
                            )}

                        </div>

                        {demo && (
                            <p className="mt-4 text-xs text-muted-foreground">
                                Activity is currently represented using test-mode data.
                            </p>
                        )}
                    </>
                )}

            </CardContent>

        </Card>
    );
}