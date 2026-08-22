import {
    Download,
    Plus,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

interface PermissionsActionsProps {
    canExport: boolean;

    canRefresh: boolean;

    canCreate: boolean;

    onRefresh: () => Promise<unknown>;

    exporting?: boolean;

    refreshing?: boolean;

    creating?: boolean;
}

export function PermissionsActions({
    canExport,
    canRefresh,
    canCreate,
    onRefresh,
    exporting = false,
    refreshing = false,
    creating = false,
}: PermissionsActionsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Button
                variant="outline"
                size="sm"
                disabled={
                    !canExport ||
                    exporting
                }
            >
                <Download />
                {exporting
                    ? "Exporting..."
                    : "Export"}
            </Button>

            <Button
                variant="outline"
                size="sm"
                disabled={
                    !canRefresh ||
                    refreshing
                }
                onClick={() => {
                    void onRefresh();
                }}
            >
                <RefreshCw />
                {refreshing
                    ? "Refreshing..."
                    : "Refresh"}
            </Button>

            <Button
                size="sm"
                disabled={
                    !canCreate ||
                    creating
                }
            >
                <Plus />
                {creating
                    ? "Creating..."
                    : "Create policy"}
            </Button>

        </div>
    );
}