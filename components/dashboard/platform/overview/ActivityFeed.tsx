import {
    CheckCircle2,
    Info,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ActivityFeed({
    items,
    demo,
}: {
    items:
        Array<{
            id:
                string;

            title:
                string;

            description:
                string;

            time:
                string;

            kind:
                "success"
                | "info";
        }>;

    demo:
        boolean;
}) {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Recent activity
                </CardTitle>
            </CardHeader>

            <CardContent>

                {demo && (
                    <p className="mb-4 text-xs text-muted-foreground">
                        Activity preview is currently using test data.
                    </p>
                )}

                {!demo && (
                    <div className="rounded-lg border bg-muted/20 p-4">

                        <p className="text-sm font-medium">
                            Activity feed
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Live merchant activity will appear here once the
                            activity API/resource is connected.
                        </p>

                    </div>
                )}

                {demo && (
                    <div className="space-y-5">

                        {items.map(
                            (
                                item,
                            ) => {
                                const Icon =
                                    item.kind ===
                                    "success"
                                        ? CheckCircle2
                                        : Info;

                                return (
                                    <div
                                        key={
                                            item.id
                                        }
                                        className="flex gap-3"
                                    >

                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">

                                            <Icon className="size-4 text-muted-foreground" />

                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <p className="text-sm font-medium">
                                                {
                                                    item.title
                                                }
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {
                                                    item.description
                                                }
                                            </p>

                                            <p className="mt-1 text-[11px] text-muted-foreground">
                                                {
                                                    item.time
                                                }
                                            </p>

                                        </div>

                                    </div>
                                );
                            },
                        )}

                    </div>
                )}

            </CardContent>

        </Card>
    );
}