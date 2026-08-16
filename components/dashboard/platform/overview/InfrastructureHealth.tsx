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

const services = [
    {
        name: "Billing API",
        status: "Operational",
        latency: "124 ms",
        icon: Server,
    },
    {
        name: "Blockchain RPC",
        status: "Operational",
        latency: "186 ms",
        icon: Activity,
    },
    {
        name: "Database",
        status: "Operational",
        latency: "42 ms",
        icon: Database,
    },
    {
        name: "Billing worker",
        status: "Operational",
        latency: "99.98%",
        icon: Clock3,
    },
];

export function InfrastructureHealth() {
    return (
        <Card>

            <CardHeader>
                <CardTitle>
                    Infrastructure
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

                {services.map((service) => {

                    const Icon = service.icon;

                    return (
                        <div
                            key={service.name}
                            className="flex items-center gap-3"
                        >
                            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                                <Icon className="size-4 text-muted-foreground" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                    {service.name}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {service.latency}
                                </p>
                            </div>

                            <Badge
                                variant="secondary"
                                className="gap-1"
                            >
                                <CheckCircle2 className="size-3 text-emerald-500" />
                                Operational
                            </Badge>
                        </div>
                    );
                })}

            </CardContent>

        </Card>
    );
}