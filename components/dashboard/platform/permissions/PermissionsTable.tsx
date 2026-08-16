import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    PermissionTableRow,
} from "./PermissionTableRow";

import type {
    PermissionRecord,
} from "./permission.types";

const permissions: PermissionRecord[] = [
    {
        id: "perm_001",
        permissionId: "policy_billing_primary",
        name: "Primary Billing",
        description:
            "Primary recurring billing authorization.",
        operatorId: "op_live_billing",
        operatorName: "Billing Service",
        scope: [
            "CHARGE",
            "PAUSE",
            "RESUME",
            "CANCEL",
        ],
        status: "ACTIVE",
        createdAt: "Jun 01, 2025",
        expiresAt: null,
        lastUsedAt: "2 minutes ago",
    },
    {
        id: "perm_002",
        permissionId: "policy_finance_refund",
        name: "Finance Refund",
        description:
            "Allows approved finance operators to process refunds.",
        operatorId: "op_admin_primary",
        operatorName: "Primary Administrator",
        scope: [
            "REFUND",
        ],
        status: "ACTIVE",
        createdAt: "May 20, 2025",
        expiresAt: null,
        lastUsedAt: "2 hours ago",
    },
    {
        id: "perm_003",
        permissionId: "policy_reconcile",
        name: "Settlement Reconciliation",
        description:
            "Allows automated reconciliation.",
        operatorId: "op_reconciliation",
        operatorName: "Reconciliation Service",
        scope: [
            "RECONCILE",
        ],
        status: "ACTIVE",
        createdAt: "May 12, 2025",
        expiresAt: null,
        lastUsedAt: "31 minutes ago",
    },
    {
        id: "perm_004",
        permissionId: "policy_pending",
        name: "Finance Review",
        description:
            "Pending finance authorization.",
        operatorId: "op_pending",
        operatorName: "Finance Administrator",
        scope: [
            "REFUND",
        ],
        status: "PENDING",
        createdAt: "Jun 10, 2025",
        expiresAt: "Jun 30, 2025",
        lastUsedAt: null,
    },
    {
        id: "perm_005",
        permissionId: "policy_legacy",
        name: "Legacy Billing",
        description:
            "Legacy billing authorization.",
        operatorId: "op_legacy",
        operatorName: "Legacy Billing Service",
        scope: [
            "CHARGE",
        ],
        status: "EXPIRED",
        createdAt: "Jan 12, 2025",
        expiresAt: "May 30, 2025",
        lastUsedAt: "May 01, 2025",
    },
];

export function PermissionsTable() {
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