import {
    Download,
    Plus,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function BillingOperatorsActions({
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

            <Button
                size="sm"
                disabled={!ready}
            >
                <Plus />
                Add operator
            </Button>

        </div>
    );
}