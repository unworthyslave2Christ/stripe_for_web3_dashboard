"use client";

import {
    AlertTriangle,
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

export function DangerZone() {
    return (
        <Card
            id="danger"
            className="border-destructive/30"
        >

            <CardHeader>

                <CardTitle className="text-destructive">
                    Danger zone
                </CardTitle>

                <CardDescription>
                    Actions here can affect the availability of your merchant.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-4">

                <div className="flex flex-col gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex gap-3">

                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />

                        <div>

                            <p className="text-sm font-medium">
                                Disable merchant
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Disable the merchant's active operations.
                                Existing historical data remains available.
                            </p>

                        </div>

                    </div>

                    <Button
                        variant="destructive"
                        size="sm"
                    >
                        Disable merchant
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}