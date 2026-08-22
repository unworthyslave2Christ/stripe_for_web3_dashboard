import {
    AlertTriangle,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function DeveloperNotice({
    available,
}: {
    available: boolean;
}) {
    return (
        <Card
            className={
                available
                    ? "border-primary/20 bg-primary/5"
                    : "border-amber-500/20 bg-amber-500/5"
            }
        >
            <CardContent className="flex gap-3 p-4">

                <AlertTriangle className="mt-0.5 size-4 shrink-0" />

                <div>

                    <p className="text-sm font-medium">
                        {available
                            ? "Keep API keys secure"
                            : "API key management is not connected yet"}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {available
                            ? "Never expose live API keys in browser code, public repositories, client-side applications, or logs. Use your server-side environment for merchant API requests."
                            : "The merchant API-key resource is not exposed by the current SDK/API surface. The dashboard is ready for the integration, but key creation, listing, rotation, revocation, and secret reveal remain unavailable until those operations are implemented."}
                    </p>

                </div>

            </CardContent>
        </Card>
    );
}