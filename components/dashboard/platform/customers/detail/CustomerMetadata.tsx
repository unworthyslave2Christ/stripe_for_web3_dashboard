import {
    Code2,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function CustomerMetadata() {
    const metadata = {
        source: "customer_portal",
        environment: "production",
        createdBy: "wallet",
    };

    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">
                    <Code2 className="size-4" />
                    Metadata
                </CardTitle>

            </CardHeader>

            <CardContent>

                <pre className="overflow-x-auto rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-6">
                    {JSON.stringify(
                        metadata,
                        null,
                        2
                    )}
                </pre>

            </CardContent>

        </Card>
    );
}