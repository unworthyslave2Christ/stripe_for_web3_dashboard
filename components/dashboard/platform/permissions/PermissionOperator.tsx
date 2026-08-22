import Link from "next/link";

import type {
    PermissionRecord,
} from "@/types/merchant/permission.types";

export function PermissionOperator({
    permission,
}: {
    permission: PermissionRecord;
}) {
    return (
        <div className="min-w-0">

            <Link
                href={`/dashboard/platform/billing-operators/${permission.operatorId}`}
                className="block truncate text-sm font-medium hover:underline"
            >
                {permission.operatorName}
            </Link>

            <p className="truncate text-xs text-muted-foreground">
                {permission.operatorId}
            </p>

        </div>
    );
}