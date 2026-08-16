import Link from "next/link";

import {
    KeyRound,
} from "lucide-react";

import type {
    PermissionRecord,
} from "./permission.types";

export function PermissionIdentity({
    permission,
}: {
    permission: PermissionRecord;
}) {
    return (
        <div className="flex min-w-0 items-center gap-3">

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                <KeyRound className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0">

                <Link
                    href={`/dashboard/permissions/${permission.id}`}
                    className="block truncate text-sm font-medium hover:underline"
                >
                    {permission.name}
                </Link>

                <p className="truncate text-xs text-muted-foreground">
                    {permission.permissionId}
                </p>

            </div>

        </div>
    );
}