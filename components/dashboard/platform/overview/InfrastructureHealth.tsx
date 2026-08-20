import {
    Activity,
    CheckCircle2,
    Clock3,
    Database,
    Server,
} from "lucide-react";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const testServices = [
    {
        name:
            "Billing API",

        state:
            "Operational",

        metric:
            "124 ms",

        icon:
            Server,
    },
    {
        name:
            "Blockchain RPC",

        state:
            "Operational",

        metric:
            "186 ms",

        icon:
            Activity,
    },
    {
        name:
            "Database",

        state:
            "Operational",

        metric:
            "42 ms",

        icon:
            Database,
    },
    {
        name:
            "Billing worker",

        state:
            "Operational",

        metric:
            "99.98%",

        icon:
            Clock3,
    },
];

export function InfrastructureHealth({
    demo,
}: {
    demo:
        boolean;
}) {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Infrastructure
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                {demo ? (
                    testServices.map(
                        (
                            service,
                        ) => {
                            const Icon =
                                service.icon;

                            return (
                                <div
                                    key={
                                        service.name
                                    }
                                    className="flex items-center gap-3"
                                >

                                    <div className="flex size-8 items-center justify-center rounded-md bg-muted">

                                        <Icon className="size-4 text-muted-foreground" />

                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="truncate text-sm font-medium">
                                            {
                                                service.name
                                            }
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {
                                                service.metric
                                            }
                                        </p>

                                    </div>

                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        <CheckCircle2 className="size-3 text-emerald-500" />
                                        {
                                            service.state
                                        }
                                    </Badge>

                                </div>
                            );
                        },
                    )
                ) : (
                    <div className="rounded-lg border bg-muted/20 p-4">

                        <p className="text-sm font-medium">
                            Infrastructure monitoring
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            Live infrastructure telemetry will appear here once the
                            monitoring API is connected.
                        </p>

                    </div>
                )}

            </CardContent>

        </Card>
    );
}