import type {
    BillingOperatorRecord,
} from "./billing-operator.types";

import {
    BillingOperatorIdentity,
} from "./BillingOperatorIdentity";

import {
    BillingOperatorType,
} from "./BillingOperatorType";

import {
    BillingOperatorPermissions,
} from "./BillingOperatorPermissions";

import {
    BillingOperatorStatusBadge,
} from "./BillingOperatorStatusBadge";

import {
    BillingOperatorActivity,
} from "./BillingOperatorActivity";

import {
    BillingOperatorActions,
} from "./BillingOperatorActions";

export function BillingOperatorTableRow({
    operator,
}: {
    operator: BillingOperatorRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">
                <BillingOperatorIdentity
                    operator={operator}
                />
            </td>

            <td className="px-4 py-4">
                <BillingOperatorType
                    type={operator.type}
                />
            </td>

            <td className="px-4 py-4">
                <BillingOperatorPermissions
                    permissions={
                        operator.permissions
                    }
                />
            </td>

            <td className="px-4 py-4">
                <BillingOperatorStatusBadge
                    status={operator.status}
                />
            </td>

            <td className="px-4 py-4">
                <BillingOperatorActivity
                    lastActivity={
                        operator.lastActivity
                    }
                />
            </td>

            <td className="px-4 py-4 text-right">
                <BillingOperatorActions
                    operatorId={
                        operator.operatorId
                    }
                />
            </td>

        </tr>
    );
}