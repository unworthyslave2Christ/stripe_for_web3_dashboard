import {
    Database,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export function CustomersUnavailableState() {
    return (
        <Card>

            <CardContent className="flex min-h-[280px] flex-col items-center justify-center p-8 text-center">

                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <Database className="size-5 text-muted-foreground" />
                </div>

                <h2 className="mt-4 text-lg font-semibold">
                    Customer collection is not exposed yet
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                    The canonical CustomerRecord is already available
                    through the SDK, but the merchant-wide customer-list
                    API has not yet been exposed. This page will connect
                    to that operation during the local CI/CD integration
                    stage.
                </p>

            </CardContent>

        </Card>
    );
}