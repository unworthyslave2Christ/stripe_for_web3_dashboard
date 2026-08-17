import {
    Badge,
} from "@/components/ui/badge";

import {
    KeyRound,
} from "lucide-react";

export function CustomerPermissionsHeader() {
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

                <KeyRound className="size-5 text-muted-foreground" />

                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Permissions
                </h1>

            </div>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Review the permissions associated with your Smart Account and understand what each authorization allows.
            </p>

        </div>
    );
}