import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    BillingOperatorTableRow,
} from "./BillingOperatorTableRow";

import type {
    BillingOperatorRecord,
} from "./billing-operator.types";

const operators: BillingOperatorRecord[] = [
    {
        id: "operator_001",
        operatorId: "op_live_billing",
        name: "Billing Service",
        description:
            "Primary recurring billing service.",
        type: "SERVICE",
        address:
            "0x91a7...B812",
        status: "ACTIVE",
        permissions: [
            "CHARGE",
            "PAUSE",
            "RESUME",
            "CANCEL",
        ],
        createdAt: "Jun 01, 2025",
        lastActivity: "2 minutes ago",
        expiresAt: null,
    },
    {
        id: "operator_002",
        operatorId: "op_admin_primary",
        name: "Primary Administrator",
        description:
            "Primary merchant billing administrator.",
        type: "HUMAN",
        address:
            "0x742d...f44e",
        status: "ACTIVE",
        permissions: [
            "CHARGE",
            "REFUND",
            "PAUSE",
            "RESUME",
            "CANCEL",
            "RECONCILE",
        ],
        createdAt: "May 20, 2025",
        lastActivity: "18 minutes ago",
        expiresAt: null,
    },
    {
        id: "operator_003",
        operatorId: "op_reconciliation",
        name: "Reconciliation Service",
        description:
            "Automated settlement reconciliation.",
        type: "SERVICE",
        address:
            "0x52ab...18fd",
        status: "ACTIVE",
        permissions: [
            "RECONCILE",
        ],
        createdAt: "May 12, 2025",
        lastActivity: "31 minutes ago",
        expiresAt: null,
    },
    {
        id: "operator_004",
        operatorId: "op_pending",
        name: "Finance Administrator",
        description:
            "Awaiting billing authorization.",
        type: "HUMAN",
        address:
            "0x83f1...72ad",
        status: "PENDING",
        permissions: [
            "REFUND",
        ],
        createdAt: "Jun 10, 2025",
        lastActivity: "Never",
        expiresAt: null,
    },
    {
        id: "operator_005",
        operatorId: "op_legacy",
        name: "Legacy Billing Service",
        description:
            "Legacy service operator.",
        type: "SERVICE",
        address:
            "0x31ab...82de",
        status: "EXPIRED",
        permissions: [
            "CHARGE",
        ],
        createdAt: "Jan 12, 2025",
        lastActivity: "May 01, 2025",
        expiresAt: "May 30, 2025",
    },
];

export function BillingOperatorsTable() {
    return (
        <Card className="overflow-hidden">

            <CardContent className="p-0">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px]">

                        <thead>

                            <tr className="border-b bg-muted/30">

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Operator
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Type
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Permissions
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                                    Activity
                                </th>

                                <th className="px-4 py-3" />

                            </tr>

                        </thead>

                        <tbody>

                            {operators.map(
                                (operator) => (
                                    <BillingOperatorTableRow
                                        key={
                                            operator.id
                                        }
                                        operator={
                                            operator
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