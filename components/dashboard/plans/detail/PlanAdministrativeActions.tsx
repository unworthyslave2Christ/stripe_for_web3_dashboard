"use client";

import {
    Archive,
    CirclePause,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function PlanAdministrativeActions({
    planId,
}: {
    planId: number;
}) {
    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Administrative actions
                </CardTitle>

                <CardDescription>
                    Lifecycle actions affect the availability of this plan.
                </CardDescription>

            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">

                <Button variant="outline">
                    <CirclePause />
                    Pause plan
                </Button>

                <Button variant="outline">
                    <Archive />
                    Archive plan
                </Button>

                <p className="basis-full text-xs text-muted-foreground">
                    Plan ID: {planId}
                </p>

            </CardContent>

        </Card>
    );
}