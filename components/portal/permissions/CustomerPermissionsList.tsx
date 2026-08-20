import type {
    CustomerPermissionRecord,
} from "@/types/customer-permission";

import {
    CustomerPermissionListItem,
} from "./CustomerPermissionListItem";

export function CustomerPermissionsList({
    permissions,
}: {
    permissions:
        CustomerPermissionRecord[];
}) {
    if (
        permissions.length ===
        0
    ) {
        return (
            <div className="rounded-xl border border-dashed bg-card p-8 text-center">

                <p className="text-sm font-medium">
                    No permissions found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    Try changing your search or status filter.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-3">

            {permissions.map(
                (
                    permission,
                ) => (
                    <CustomerPermissionListItem
                        key={
                            permission.id
                        }
                        permission={
                            permission
                        }
                    />
                ),
            )}

        </div>
    );
}