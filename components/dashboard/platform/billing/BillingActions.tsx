import {
    Download,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function BillingActions({
    ready,
}: {
    ready: boolean;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Button
                variant="outline"
                size="sm"
                disabled={!ready}
            >
                <Download />
                Export
            </Button>

            <Button
                variant="outline"
                size="sm"
                disabled={!ready}
            >
                <RefreshCw />
                Refresh
            </Button>

        </div>
    );
}