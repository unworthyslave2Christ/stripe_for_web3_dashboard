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
} from "@/types/merchant/permission.types";

function formatDate(
    value: Date | null,
) {
    if (!value) {
        return "No expiry";
    }

    return value.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        },
    );
}

export function PermissionTableRow({
    permission,
    actionsAvailable,
}: {
    permission: PermissionRecord;

    actionsAvailable: boolean;
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
                {formatDate(
                    permission.createdAt,
                )}
            </td>

            <td className="px-4 py-4 text-sm text-muted-foreground">
                {formatDate(
                    permission.expiresAt,
                )}
            </td>

            <td className="px-4 py-4 text-right">
                <PermissionActions
                    permissionId={
                        permission.permissionId
                    }
                    available={
                        actionsAvailable
                    }
                />
            </td>

        </tr>
    );
}