import {
    AlertTriangle,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function DeveloperNotice() {
    return (
        <Card className="border-primary/20 bg-primary/5">

            <CardContent className="flex gap-3 p-4">

                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />

                <div>

                    <p className="text-sm font-medium">
                        Keep API keys secure
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Never expose live API keys in browser code, public repositories,
                        client-side applications, or logs. Use your server-side environment
                        for merchant API requests.
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}