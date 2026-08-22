import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    PermissionTableRow,
} from "./PermissionTableRow";

import type {
    PermissionRecord,
} from "@/types/merchant/permission.types";

interface PermissionsTableProps {
    permissions: PermissionRecord[];

    actionsAvailable: boolean;
}

export function PermissionsTable({
    permissions,
    actionsAvailable,
}: PermissionsTableProps) {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1100px]">

                        <thead>
                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Permission
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Operator
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Scope
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Created
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Expires
                                </th>

                                <th className="px-4 py-3" />

                            </tr>
                        </thead>

                        <tbody>

                            {permissions.map(
                                (permission) => (
                                    <PermissionTableRow
                                        key={
                                            permission.id
                                        }
                                        permission={
                                            permission
                                        }
                                        actionsAvailable={
                                            actionsAvailable
                                        }
                                    />
                                ),
                            )}

                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    );
}