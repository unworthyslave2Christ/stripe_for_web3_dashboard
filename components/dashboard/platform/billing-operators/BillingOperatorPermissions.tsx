import {
    Badge,
} from "@/components/ui/badge";

import type {
    BillingOperatorPermission,
} from "./billing-operator.types";

export function BillingOperatorPermissions({
    permissions,
}: {
    permissions: BillingOperatorPermission[];
}) {
    if (permissions.length === 0) {
        return (
            <span className="text-xs text-muted-foreground">
                No permissions
            </span>
        );
    }

    return (
        <div className="flex flex-wrap gap-1">

            {permissions
                .slice(0, 2)
                .map((permission) => (
                    <Badge
                        key={permission}
                        variant="secondary"
                        className="text-[10px]"
                    >
                        {formatPermission(
                            permission,
                        )}
                    </Badge>
                ))}

            {permissions.length > 2 && (
                <Badge
                    variant="outline"
                    className="text-[10px]"
                >
                    +{permissions.length - 2}
                </Badge>
            )}

        </div>
    );
}

function formatPermission(
    permission: BillingOperatorPermission,
) {
    return permission
        .toLowerCase()
        .replace(
            /^./,
            (character) =>
                character.toUpperCase(),
        );
}