"use client";

import {
    Download,
    Plus,
    RefreshCw,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

export function PermissionsActions() {
    return (
        <div className="flex flex-wrap items-center gap-2">

            <Button
                variant="outline"
                size="sm"
            >
                <Download />
                Export
            </Button>

            <Button
                variant="outline"
                size="sm"
            >
                <RefreshCw />
                Refresh
            </Button>

            <Button size="sm">
                <Plus />
                Create policy
            </Button>

        </div>
    );
}