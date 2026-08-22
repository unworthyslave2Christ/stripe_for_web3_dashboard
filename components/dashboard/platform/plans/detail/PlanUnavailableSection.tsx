import {
    BarChart3,
    CircleDollarSign,
    Users,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function PlanUnavailableSection({
    title,
    description,
    icon: Icon = BarChart3,
}: {
    title: string;
    description: string;
    icon?: typeof BarChart3;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="rounded-lg border border-dashed bg-muted/20 p-6">
                    <p className="text-sm font-medium">
                        Data source not exposed yet
                    </p>

                    <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}