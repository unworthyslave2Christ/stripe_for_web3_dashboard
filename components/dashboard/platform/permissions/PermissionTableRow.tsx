import {
    PermissionActions,
} from "./PermissionActions";

import {
    PermissionIdentity,
} from "./PermissionIdentity";

import {
    PermissionOperator,
} from "./PermissionOperator";

import {
    PermissionScope,
} from "./PermissionScope";

import {
    PermissionStatusBadge,
} from "./PermissionStatusBadge";

import type {
    PermissionRecord,
} from "./permission.types";

export function PermissionTableRow({
    permission,
}: {
    permission: PermissionRecord;
}) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/40 last:border-0">

            <td className="px-4 py-4">
                <PermissionIdentity
                    permission={permission}
                />
            </td>

            <td className="px-4 py-4">
                <PermissionOperator
                    permission={permission}
                />
            </td>

            <td className="px-4 py-4">
                <PermissionScope
                    scopes={permission.scope}
                />
            </td>

            <td className="px-4 py-4">
                <PermissionStatusBadge
                    status={permission.status}
                />
            </td>

            <td className="px-4 py-4 text-sm text-muted-foreground">
                {permission.createdAt}
            </td>

            <td className="px-4 py-4 text-sm text-muted-foreground">
                {permission.expiresAt || "No expiry"}
            </td>

            <td className="px-4 py-4 text-right">

                <PermissionActions
                    permissionId={
                        permission.permissionId
                    }
                />

            </td>

        </tr>
    );
}