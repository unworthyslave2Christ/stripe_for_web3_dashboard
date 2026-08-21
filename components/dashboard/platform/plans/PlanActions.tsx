import {
    Download,
    Plus,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PlanActions({
    refreshing,
    onRefresh,
}: {
    refreshing: boolean;

    onRefresh: () => void;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Button
                variant="outline"
                size="sm"
                disabled
            >
                <Download />
                Export
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={
                    refreshing
                }
            >
                <RefreshCw
                    className={
                        refreshing
                            ? "animate-spin"
                            : undefined
                    }
                />
                {refreshing
                    ? "Refreshing"
                    : "Refresh"}
            </Button>

            <Button
                size="sm"
                disabled
            >
                <Plus />
                Create plan
            </Button>

        </div>
    );
}