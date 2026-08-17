import {
    Badge,
} from "@/components/ui/badge";

import {
    Settings,
} from "lucide-react";

export function CustomerSettingsHeader() {
    return (
        <div>

            <div className="flex items-center gap-2">

                <p className="text-sm font-medium text-muted-foreground">
                    Customer portal
                </p>

                <Badge variant="secondary">
                    Smart Account
                </Badge>

            </div>

            <div className="mt-1 flex items-center gap-2">

                <Settings className="size-5 text-muted-foreground" />

                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Settings
                </h1>

            </div>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Manage your customer profile, Smart Account preferences, notifications, and portal experience.
            </p>

        </div>
    );
}