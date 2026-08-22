import {
    Badge,
} from "@/components/ui/badge";

import type {
    PermissionScope as PermissionScopeType,
} from "@/types/merchant/permission.types";

function formatScope(
    scope: PermissionScopeType,
) {
    return scope
        .toLowerCase()
        .replace(
            /^./,
            (character) =>
                character.toUpperCase(),
        );
}

export function PermissionScope({
    scopes,
}: {
    scopes: PermissionScopeType[];
}) {
    return (
        <div className="flex flex-wrap gap-1">

            {scopes
                .slice(0, 3)
                .map((scope) => (
                    <Badge
                        key={scope}
                        variant="secondary"
                        className="text-[10px]"
                    >
                        {formatScope(scope)}
                    </Badge>
                ))}

            {scopes.length > 3 && (
                <Badge
                    variant="outline"
                    className="text-[10px]"
                >
                    +{scopes.length - 3}
                </Badge>
            )}

        </div>
    );
}